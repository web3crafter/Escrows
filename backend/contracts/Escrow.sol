// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
    address public deployer;
    address public arbiter;
    address public beneficiary;

    bool public isApproved;

    uint public releasedAmount;

    event Approved(address indexed arbiter, uint indexed value);
    event Deposited(address indexed depositor, uint indexed value);

    constructor(address _arbiter, address _beneficiary) payable {
        deployer = msg.sender;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        isApproved = false;
    }

    modifier onlyDeployer() {
        require(
            msg.sender == deployer,
            "Only the deployer can perform this action"
        );
        _;
    }

    modifier onlyArbiter() {
        require(
            msg.sender == arbiter,
            "Only the ariter can perform this action"
        );
        _;
    }

    function deposit() external payable onlyDeployer {
        require(isApproved == true, "Contract not open for deposits");
        require(msg.value > 0, "You must deposit some ETH");
        isApproved = false;
        emit Deposited(msg.sender, msg.value);
    }

    function approve() external onlyArbiter {
        releasedAmount = address(this).balance;
        (bool sent, ) = beneficiary.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        isApproved = true;

        emit Approved(msg.sender, releasedAmount);
    }

    receive() external payable {}
}
