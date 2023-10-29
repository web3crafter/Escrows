import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { ethers } from "hardhat"
import { expect } from "chai"

describe("CustomizableEscrow", function () {
  const deployContractAndSetVariables = async () => {
    const [deployer, arbiter, beneficiary, addr1, addr2] =
      await ethers.getSigners()
    const depositAmount = ethers.parseEther("1")

    const initialArbiters = [deployer, arbiter]
    const initialOwners: string[] = []

    const CustomizableEscrow = await ethers.getContractFactory(
      "CustomizableEscrow"
    )
    const customizableEscrow = await CustomizableEscrow.deploy(
      initialArbiters,
      initialOwners,
      beneficiary
    )
    const customizableEscrowWithDeposit = await CustomizableEscrow.deploy(
      initialArbiters,
      initialOwners,
      beneficiary,
      { value: depositAmount }
    )
    await customizableEscrow.waitForDeployment()
    await customizableEscrowWithDeposit.waitForDeployment()

    return {
      customizableEscrow,
      customizableEscrowWithDeposit,
      deployer,
      arbiter,
      beneficiary,
      depositAmount,
      initialArbiters,
      addr1,
      addr2,
    }
  }

  describe("Deployment", function () {
    describe("With deposit", function () {
      it("Should be funded", async () => {
        const { customizableEscrowWithDeposit, depositAmount } =
          await loadFixture(deployContractAndSetVariables)
        const contractBalance = await ethers.provider.getBalance(
          customizableEscrowWithDeposit
        )
        expect(contractBalance).to.eq(depositAmount)
      })

      it("Should add deployer to depositors mapping", async () => {
        const { customizableEscrowWithDeposit, depositAmount, deployer } =
          await loadFixture(deployContractAndSetVariables)

        expect(
          await customizableEscrowWithDeposit.deposits(deployer.address)
        ).to.eq(depositAmount)
      })

      it("Should set beneficiary", async () => {
        const { customizableEscrow, beneficiary } = await loadFixture(
          deployContractAndSetVariables
        )

        const beneficiaryAfterDeployment =
          await customizableEscrow.beneficiary()
        expect(beneficiaryAfterDeployment).to.eq(beneficiary.address)
      })

      it("Should set arbiter to arbiters", async () => {
        const { customizableEscrow, arbiter, deployer, initialArbiters } =
          await loadFixture(deployContractAndSetVariables)

        await Promise.all(
          initialArbiters.map(async (initialArbiter) => {
            const isArbiter = await customizableEscrow.arbiters(
              initialArbiter.address
            )
            expect(isArbiter).to.eq(true)
          })
        )
      })
    })

    describe("Without deposit", function () {
      it("Should not be funded", async () => {
        const { customizableEscrow } = await loadFixture(
          deployContractAndSetVariables
        )
        const contractBalance = await ethers.provider.getBalance(
          customizableEscrow
        )
        expect(contractBalance).to.eq(0)
      })

      it("Should not add deployer to depositors mapping", async () => {
        const { customizableEscrowWithDeposit, depositAmount, deployer } =
          await loadFixture(deployContractAndSetVariables)

        expect(await customizableEscrowWithDeposit.deposits(deployer.address))
          .to.be.reverted
      })

      it("Should set beneficiary", async () => {
        const { customizableEscrow, beneficiary } = await loadFixture(
          deployContractAndSetVariables
        )

        const beneficiaryAfterDeployment =
          await customizableEscrow.beneficiary()
        expect(beneficiaryAfterDeployment).to.eq(beneficiary.address)
      })

      it("Should set arbiter to arbiters", async () => {
        const { customizableEscrow, arbiter, deployer, initialArbiters } =
          await loadFixture(deployContractAndSetVariables)

        await Promise.all(
          initialArbiters.map(async (initialArbiter) => {
            const isArbiter = await customizableEscrow.arbiters(
              initialArbiter.address
            )
            expect(isArbiter).to.eq(true)
          })
        )
      })
    })
  })

  describe("Add and Remove", function () {
    describe("Owner", function () {
      it("Should add and remove owner when caller is deployer", async () => {
        const { customizableEscrow, deployer, arbiter } = await loadFixture(
          deployContractAndSetVariables
        )
        await customizableEscrow.connect(deployer).addManager(arbiter.address)
        expect(await customizableEscrow.managers(arbiter.address)).to.eq(true)
        await customizableEscrow
          .connect(deployer)
          .removeManager(arbiter.address)
        expect(await customizableEscrow.managers(arbiter.address)).to.eq(false)
      })

      it("Should be reverted if caller is not deployer", async () => {
        const { customizableEscrow, arbiter } = await loadFixture(
          deployContractAndSetVariables
        )
        await expect(
          customizableEscrow.connect(arbiter).addManager(arbiter.address)
        ).to.be.revertedWith("Caller not deployer")
        await expect(
          customizableEscrow.connect(arbiter).removeManager(arbiter.address)
        ).to.be.revertedWith("Caller not deployer")
      })
    })

    describe("Arbiter", function () {
      it("Should add and remove arbiter when caller is deployer", async () => {
        const { customizableEscrow, deployer, addr1 } = await loadFixture(
          deployContractAndSetVariables
        )

        // Deployer adding add1 to arbiters
        await customizableEscrow.connect(deployer).addArbiter(addr1.address)
        expect(await customizableEscrow.arbiters(addr1.address)).to.eq(true)

        //Deployer removing add1 from arbiters
        await customizableEscrow.connect(deployer).removeArbiter(addr1.address)
        expect(await customizableEscrow.arbiters(addr1.address)).to.eq(false)
      })

      it("Should add and remove arbiter when caller is owner", async () => {
        const { customizableEscrow, deployer, arbiter, addr1, addr2 } =
          await loadFixture(deployContractAndSetVariables)

        const tempArbiter = arbiter
        //Deployer makes arbiter owner
        await customizableEscrow
          .connect(deployer)
          .addManager(tempArbiter.address)

        //Owner adds addr2 to arbiters
        await customizableEscrow.connect(tempArbiter).addArbiter(addr2.address)
        expect(await customizableEscrow.arbiters(addr2.address)).to.eq(true)

        // arbiter is still owner and can remove addr2 from arbiters
        await customizableEscrow
          .connect(tempArbiter)
          .removeArbiter(addr2.address)
        expect(await customizableEscrow.arbiters(addr2.address)).to.eq(false)
      })

      it("Should be reverted if caller is not deployer or owner", async () => {
        const { customizableEscrow, deployer, arbiter, addr1, addr2 } =
          await loadFixture(deployContractAndSetVariables)

        await expect(
          customizableEscrow.connect(addr1).addArbiter(addr2.address)
        ).to.be.revertedWith("Caller must be Deployer or manager")

        await expect(
          customizableEscrow.connect(addr1).removeArbiter(addr2.address)
        ).to.be.revertedWith("Caller must be Deployer or manager")
      })
    })
  })

  describe("Deposit", function () {
    it("Should be deposited and depositor added to depositors", async () => {
      const { customizableEscrow, addr1, depositAmount } = await loadFixture(
        deployContractAndSetVariables
      )

      await customizableEscrow.connect(addr1).deposit({ value: depositAmount })

      const contractBalance = await ethers.provider.getBalance(
        customizableEscrow
      )
      expect(contractBalance).to.eq(depositAmount)

      expect(await customizableEscrow.deposits(addr1.address)).to.eq(
        depositAmount
      )
    })
  })

  describe("Request", function () {
    it("Should update request amount", async () => {
      const { customizableEscrowWithDeposit, beneficiary, depositAmount } =
        await loadFixture(deployContractAndSetVariables)
      await customizableEscrowWithDeposit
        .connect(beneficiary)
        .requestReleaseAmount(depositAmount)
      expect(await customizableEscrowWithDeposit.requestAmount()).to.eq(
        depositAmount
      )
    })
  })

  describe("Approve", function () {
    it("Should release request amount to beneficiary and reset request amount", async () => {
      const {
        customizableEscrowWithDeposit,
        arbiter,
        depositAmount,
        beneficiary,
      } = await loadFixture(deployContractAndSetVariables)

      await customizableEscrowWithDeposit
        .connect(beneficiary)
        .requestReleaseAmount(depositAmount)

      const requestAmountBefore =
        await customizableEscrowWithDeposit.requestAmount()

      const beneficiaryBalanceBefore = await ethers.provider.getBalance(
        beneficiary.address
      )

      await customizableEscrowWithDeposit
        .connect(arbiter)
        .approveRequestAmount(depositAmount)

      const beneficiaryBalanceAfter = await ethers.provider.getBalance(
        beneficiary.address
      )
      const requestAmountAfter =
        await customizableEscrowWithDeposit.requestAmount()

      expect(beneficiaryBalanceAfter).to.eq(
        beneficiaryBalanceBefore + requestAmountBefore
      )
      expect(requestAmountAfter).to.eq(0)
    })

    it("Should be reverted with reason", async () => {
      const { customizableEscrowWithDeposit, depositAmount, beneficiary } =
        await loadFixture(deployContractAndSetVariables)

      await customizableEscrowWithDeposit
        .connect(beneficiary)
        .requestReleaseAmount(depositAmount)

      await expect(
        customizableEscrowWithDeposit
          .connect(beneficiary)
          .approveRequestAmount(depositAmount)
      ).to.be.revertedWith("Caller not arbiter")
    })

    it("Should update totalReleasedAmount", async () => {
      const {
        customizableEscrowWithDeposit,
        arbiter,
        depositAmount,
        beneficiary,
      } = await loadFixture(deployContractAndSetVariables)

      await customizableEscrowWithDeposit
        .connect(beneficiary)
        .requestReleaseAmount(depositAmount)

      const totalReleasedAmountBefore =
        await customizableEscrowWithDeposit.totalReleasedAmount()

      const requestAmount = await customizableEscrowWithDeposit.requestAmount()

      await customizableEscrowWithDeposit
        .connect(arbiter)
        .approveRequestAmount(depositAmount)

      const totalReleasedAmountAfter =
        await customizableEscrowWithDeposit.totalReleasedAmount()

      expect(totalReleasedAmountAfter).to.eq(
        totalReleasedAmountBefore + requestAmount
      )
    })

    it("Should update approvals mapping", async () => {
      const {
        customizableEscrowWithDeposit,
        arbiter,
        depositAmount,
        beneficiary,
      } = await loadFixture(deployContractAndSetVariables)

      await customizableEscrowWithDeposit
        .connect(beneficiary)
        .requestReleaseAmount(depositAmount)

      const requestAmount = await customizableEscrowWithDeposit.requestAmount()

      await customizableEscrowWithDeposit
        .connect(arbiter)
        .approveRequestAmount(depositAmount)

      expect(await customizableEscrowWithDeposit.approvals(arbiter)).to.eq(
        requestAmount
      )
    })
  })

  describe("Reject", function () {
    it("Should only be able to be called by arbiter, deployer or owner", async () => {
      const { customizableEscrowWithDeposit, depositAmount, beneficiary } =
        await loadFixture(deployContractAndSetVariables)

      await customizableEscrowWithDeposit
        .connect(beneficiary)
        .requestReleaseAmount(depositAmount)

      await expect(
        customizableEscrowWithDeposit.connect(beneficiary).rejectRequestAmount()
      ).to.be.revertedWith("Caller must be Deployer, manager or arbiter")
    })

    it("Should reset requestAmount", async () => {
      const {
        customizableEscrowWithDeposit,
        depositAmount,
        arbiter,
        beneficiary,
      } = await loadFixture(deployContractAndSetVariables)

      await customizableEscrowWithDeposit
        .connect(beneficiary)
        .requestReleaseAmount(depositAmount)

      await customizableEscrowWithDeposit.connect(arbiter).rejectRequestAmount()

      const requestAmount = await customizableEscrowWithDeposit.requestAmount()

      expect(requestAmount).to.eq(0)
    })
  })
})
