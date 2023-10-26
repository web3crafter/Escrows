// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract CustomizableEscrow {
    address public deployer;
    address public beneficiary;

    uint public requestAmount;
    uint public totalReleasedAmount;

    mapping(address => bool) public arbiters;
    mapping(address => bool) public managers;
    mapping(address => uint) public deposits;
    mapping(address => uint) public approvals;

    event Deposited(address indexed depositor, uint indexed depositAmount);
    event Requested(
        address indexed addressMakingTheRequest,
        uint indexed requestAmount
    );
    event Approved(address indexed arbiter, uint indexed approvedAmount);
    event Rejected(address indexed arbiter, uint indexed rejectedAmount);
    event AddedManager(address indexed managerAdded);
    event RemovedManager(address indexed managerRemoved);
    event AddedArbiter(
        address indexed arbiterAdded,
        address indexed addressThatAddedArbiter
    );
    event RemovedArbiter(
        address indexed arbiterRemoved,
        address indexed addressThatRemovedArbiter
    );

    constructor(
        address[] memory initialArbiters,
        address[] memory initialManagers,
        address _beneficiary
    ) payable {
        deployer = msg.sender;
        beneficiary = _beneficiary;

        for (uint i; i < initialArbiters.length; i++) {
            arbiters[initialArbiters[i]] = true;
            emit AddedArbiter(initialArbiters[i], msg.sender);
        }
        for (uint i; i < initialManagers.length; i++) {
            managers[initialManagers[i]] = true;
            emit AddedManager(initialManagers[i]);
        }
        if (msg.value > 0) {
            deposits[msg.sender] = msg.value;
            emit Deposited(msg.sender, msg.value);
        }
    }

    function addManager(address managerToAdd) external {
        require(msg.sender == deployer, "Caller not deployer");
        require(!managers[managerToAdd], "Already manager.");
        managers[managerToAdd] = true;
        emit AddedManager(managerToAdd);
    }

    function removeManager(address managerToRemove) external {
        require(msg.sender == deployer, "Caller not deployer");
        require(managers[managerToRemove], "The address is not an manager");
        managers[managerToRemove] = false;
        emit RemovedManager(managerToRemove);
    }

    function addArbiter(address arbiterToAdd) external {
        require(
            msg.sender == deployer || managers[msg.sender],
            "Caller must be Deployer or manager"
        );
        require(!arbiters[arbiterToAdd], "Already arbiter");
        arbiters[arbiterToAdd] = true;
        emit AddedArbiter(arbiterToAdd, msg.sender);
    }

    function removeArbiter(address arbiterToRemove) external {
        require(
            msg.sender == deployer || managers[msg.sender],
            "Caller must be Deployer or manager"
        );
        require(arbiters[arbiterToRemove], "The address is not an arbiter");

        arbiters[arbiterToRemove] = false;
        emit RemovedArbiter(arbiterToRemove, msg.sender);
    }

    function deposit() external payable {
        require(msg.value > 0, "You must deposit som Eth");
        deposits[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function requestReleaseAmount(uint amount) external {
        require(msg.sender == beneficiary, "Caller must be beneficiary");
        requestAmount += amount;
        emit Requested(msg.sender, amount);
    }

    function approveRequestAmount(uint256 amount) external {
        require(arbiters[msg.sender], "Caller not arbiter");
        require(amount <= address(this).balance, "ETH Balance to low");
        require(requestAmount > 0, "No amount of ETH requested");

        (bool sent, ) = beneficiary.call{value: amount}("");
        require(sent, "Failed to send ETH");
        totalReleasedAmount += amount;

        approvals[msg.sender] += amount;
        emit Approved(msg.sender, requestAmount);

        requestAmount -= amount;
    }

    function rejectRequestAmount() external {
        require(
            msg.sender == deployer ||
                arbiters[msg.sender] ||
                managers[msg.sender],
            "Caller must be Deployer, manager or arbiter"
        );
        emit Rejected(msg.sender, requestAmount);
        requestAmount = 0;
    }

    function getContractInfo()
        public
        view
        returns (address, address, uint, uint, uint)
    {
        uint contractBalance = address(this).balance;
        return (
            deployer,
            beneficiary,
            requestAmount,
            totalReleasedAmount,
            contractBalance
        );
    }
}
