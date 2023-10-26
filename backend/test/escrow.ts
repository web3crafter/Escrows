import { ethers } from "hardhat"
import { expect } from "chai"
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"

//TODO: Redo test
describe("Escrow", function () {
  const deployContractAndSetVariables = async () => {
    const [deployer, beneficiary, arbiter] = await ethers.getSigners()

    const deposit = ethers.parseEther("1")

    const Escrow = await ethers.getContractFactory("Escrow")
    const escrow = await Escrow.deploy(arbiter.address, beneficiary.address, {
      value: deposit,
    })
    await escrow.waitForDeployment()

    return {
      deployer,
      arbiter,
      beneficiary,
      deposit,
      escrow,
    }
  }
  describe("Deployment", function () {
    it("should be funded, isApproved should be set to false", async () => {
      const { escrow, deposit, deployer } = await loadFixture(
        deployContractAndSetVariables
      )
      const balance = await ethers.provider.getBalance(escrow)
      const isApproved = await escrow.isApproved()
      expect(balance).to.eq(deposit)
      expect(isApproved).to.eq(false)
    })
  })

  describe("Deposit", function () {
    it("Should not allow deposit when caller is not deployer", async () => {
      const { escrow, arbiter, deposit } = await loadFixture(
        deployContractAndSetVariables
      )
      await expect(escrow.connect(arbiter).deposit({ value: deposit })).to.be
        .reverted
    })

    it("Should not allow deposit when isApproved is false", async () => {
      const { escrow, deployer, deposit } = await loadFixture(
        deployContractAndSetVariables
      )
      await expect(escrow.connect(deployer).deposit({ value: deposit })).to.be
        .reverted
    })

    it("Should allow deposit when isApproved is true", async () => {
      const { escrow, deployer, arbiter, deposit } = await loadFixture(
        deployContractAndSetVariables
      )
      const approveTxn = await escrow.connect(arbiter).approve()
      await approveTxn.wait()

      const balanceBefore = await ethers.provider.getBalance(escrow)

      const depositorBalanceBefore = await ethers.provider.getBalance(deployer)

      const depositedTxn = await escrow
        .connect(deployer)
        .deposit({ value: deposit })
      const depositReceipt = await depositedTxn.wait()

      const depositorBalanceAfter = await ethers.provider.getBalance(deployer)

      const balanceAfter = await ethers.provider.getBalance(escrow)
      expect(balanceBefore + deposit).to.eq(balanceAfter)
      expect(depositorBalanceBefore - deposit - depositReceipt?.fee).to.eq(
        depositorBalanceAfter
      )
    })

    it("Should set isApproved to false and set balance to 1 eth", async () => {
      const { escrow, deployer, deposit, arbiter } = await loadFixture(
        deployContractAndSetVariables
      )
      const approveTxn = await escrow.connect(arbiter).approve()
      await approveTxn.wait()

      const depositTransaction = await escrow
        .connect(deployer)
        .deposit({ value: deposit })
      await depositTransaction.wait()

      const isApprovedAfter = await escrow.isApproved()
      const balanceAfter = await ethers.provider.getBalance(escrow)

      expect(isApprovedAfter).to.eq(false)
      expect(balanceAfter).to.eq(ethers.parseEther("1"))
    })
  })

  describe("Approve", function () {
    it("should revert if caller is not arbiter", async () => {
      const { escrow, beneficiary } = await loadFixture(
        deployContractAndSetVariables
      )
      await expect(escrow.connect(beneficiary).approve()).to.be.reverted
    })

    it("should transfer balance to beneficiary", async () => {
      const { escrow, beneficiary, arbiter, deposit } = await loadFixture(
        deployContractAndSetVariables
      )
      //TODO: fix balance
      const beneficiaryAddressBefore = await ethers.provider.getBalance(
        beneficiary.address
      )
      const approveTxn = await escrow.connect(arbiter).approve()
      await approveTxn.wait()
      //TODO: fix balance
      const beneficiaryAddressAfter = await ethers.provider.getBalance(
        beneficiary.address
      )

      expect(beneficiaryAddressAfter - beneficiaryAddressBefore).to.eq(deposit)
    })

    it("should update sentValue, balance and isApproved", async () => {
      const { escrow, arbiter, deposit } = await loadFixture(
        deployContractAndSetVariables
      )
      const approveTxn = await escrow.connect(arbiter).approve()
      await approveTxn.wait()

      const sentValue = await escrow.releasedAmount()
      const balanceAfter = await ethers.provider.getBalance(escrow)
      const isApprovedAfter = await escrow.isApproved()

      expect(sentValue).to.eq(deposit)
      expect(balanceAfter).to.eq(deposit - sentValue)
      expect(isApprovedAfter).to.eq(true)
    })
  })
})
