// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./VehicleFactory.sol";

contract Vehicle is Ownable {
    address public factoryAddress;

    bool private isStart;

    bool public isApproved;

    function approveVehicle() public {
        VehicleFactory factory = VehicleFactory(payable(factoryAddress));
        factory.isAdmin(msg.sender);
        isApproved = true;
    }

    function isOwner(address checkAddress) public view returns (bool) {
        return (checkAddress == owner);
    }

    function setStart(bool state) public onlyOwner {
        isStart = state;
    }

    function getStart() public view returns (bool) {
        return isStart;
    }

    modifier hasStart() {
        require(isStart, "This vehicle contract has not started the auction");
        _;
    }

    modifier valueMustEqualQuantity(uint quantity) {
        require(msg.value == quantity, "Value must equal quantity");
        _;
    }

    VehicleProperties private props;

    uint256 private startingPrice;

    string[] private vehicleImages;

    struct Bid {
        uint32 index;
        address bidder;
        uint256 quantity;
        uint256 bidDate;
        bool isWithdrawed;
    }

    mapping(uint32 => Bid) private bids;
    uint32 bidsSize;

    function getBids() public view returns (Bid[] memory) {
        Bid[] memory rounds = new Bid[](bidsSize);

        for (uint32 i = 0; i < bidsSize; i++) {
            rounds[i] = bids[i];
        }
        return rounds;
    }

    error BidNotFoundException(address bidder);

    function getBid() internal view returns (uint32, Bid memory) {
        for (uint32 i = 0; i < bidsSize; i++) {
            if (bids[i].bidder == msg.sender) {
                return (i, bids[i]);
            }
        }
        revert BidNotFoundException(msg.sender);
    }

    modifier hasBid() {
        getBid();
        _;
    }

    function removeBid(address) internal hasBid {
        (uint32 index, ) = getBid();

        if (index == bidsSize - 1) {} else {
            for (uint32 i = index + 1; i < bidsSize - 1; i++) {
                bids[i - 1] = bids[i];
            }
        }
        delete bids[bidsSize - 1];
        bidsSize--;
    }

    event CreateBid(
        address indexed bidderAddress,
        address indexed vehicleContractAddress,
        uint32 index,
        uint256 deposit,
        uint256 quantity
    );

    function getBidsSize() external view returns (uint32) {
        return bidsSize;
    }

    function findNearestUnwithdrawedBid() public view returns (Bid memory) {
        uint32 currentIndex = bidsSize;
        while (currentIndex > 0) {
            currentIndex--;
            Bid memory currentRound = bids[currentIndex];
            if (!currentRound.isWithdrawed) {
                return currentRound;
            }
        }
        return Bid(0, address(0), 0, 0, true);
    }

    function createBid(
        uint256 quantity,
        uint256 bidDate
    ) public payable valueMustEqualQuantity(quantity) hasStart notOwner {
        Bid memory bid = Bid(
            bidsSize + 1,
            msg.sender,
            quantity,
            bidDate,
            false
        );

        bids[bidsSize] = bid;

        Bid memory nearestUnwithdrawedBid = findNearestUnwithdrawedBid();

        if (msg.sender.balance < 1000000000000000000) {
            revert(
                string.concat(
                    Strings.toString(msg.sender.balance),
                    string.concat(Strings.toString(quantity))
                )
            );
        }

        require(
            !(nearestUnwithdrawedBid.isWithdrawed && quantity < startingPrice),
            "The quantity must equal or exceed the starting price."
        );

        require(
            !(!nearestUnwithdrawedBid.isWithdrawed &&
                quantity < bids[bidsSize - 1].quantity + 100000000000000000),
            "New quantity must be greater than the previous at least 0.1 KLAY."
        );

        payable(factoryAddress).transfer(msg.value);

        emit CreateBid(
            msg.sender,
            address(this),
            bidsSize,
            quantity,
            msg.value
        );

        if (!nearestUnwithdrawedBid.isWithdrawed) {
            VehicleFactory vehicleFactory = VehicleFactory(
                payable(factoryAddress)
            );

            vehicleFactory.refundToAuctioneer(
                nearestUnwithdrawedBid.bidder,
                address(this),
                nearestUnwithdrawedBid.index,
                nearestUnwithdrawedBid.quantity
            );

            bids[nearestUnwithdrawedBid.index - 1].isWithdrawed = true;
        }

        bidsSize++;
    }

    event WithdrawBid(
        address indexed bidderAddress,
        address indexed vehicleContractAddress,
        uint32 index
    );

    function withdrawBid() public hasStart hasBid notOwner {
        Bid memory lastBid = bids[bidsSize - 1];

        require(!lastBid.isWithdrawed, "The last bid has been withdrawed.");

        require(
            msg.sender == lastBid.bidder,
            "Sender is not the bidder of the last bid."
        );

        VehicleFactory vehicleFactory = VehicleFactory(payable(factoryAddress));

        vehicleFactory.refundToAuctioneer(
            lastBid.bidder,
            address(this),
            lastBid.index,
            lastBid.quantity
        );

        emit WithdrawBid(msg.sender, address(this), bidsSize);

        bids[bidsSize - 1].isWithdrawed = true;
    }

    constructor(
        address _factoryAddress,
        VehicleProperties memory _props,
        uint256 _startingPrice,
        string[] memory _vehicleImages
    ) {
        console.log("New Vehicle Contract has been deployed.");

        factoryAddress = _factoryAddress;
        props = _props;
        startingPrice = _startingPrice;
        vehicleImages = _vehicleImages;
        bidsSize = 0;
        isStart = false;
        isApproved = false;
    }

    function getVehicleProperties()
        external
        view
        returns (VehicleProperties memory)
    {
        return props;
    }

    function getStartingPrice() external view returns (uint256) {
        return startingPrice;
    }

    function getVehicleImages() external view returns (string[] memory) {
        return vehicleImages;
    }

    function getData() external view returns (VehicleData memory) {
        return
            VehicleData(
                isStart,
                address(this),
                props,
                startingPrice,
                vehicleImages
            );
    }

    event SubmitAuction(
        address vehicleOwner,
        address recipient,
        uint256 bidPrice
    );

    function submitAuction() public onlyOwner {
        Bid memory nearestUnwithdrawedBid = findNearestUnwithdrawedBid();

        if (nearestUnwithdrawedBid.isWithdrawed) {
            revert("No bids to submit.");
        }

        VehicleFactory vehicleFactory = VehicleFactory(payable(factoryAddress));

        vehicleFactory.payForOwner(
            owner,
            nearestUnwithdrawedBid.bidder,
            address(this),
            nearestUnwithdrawedBid.quantity
        );

        isStart = false;

        address lastAuctioneer = nearestUnwithdrawedBid.bidder;

        transferOwnership(lastAuctioneer);

        emit SubmitAuction(
            address(this),
            lastAuctioneer,
            bids[bidsSize - 1].quantity
        );

        for (uint32 i = 0; i < bidsSize; i++) {
            delete bids[i];
        }

        bidsSize = 0;
    }
}

struct VehicleProperties {
    string ownerFullName;
    string ownerAddress;
    string brand;
    string vehicleType;
    string color;
    uint16 seatCapacity;
    string origin;
    string licensePlate;
    string engineNumber;
    string chassisNumber;
    string modelCode;
    uint32 capacity;
    uint256 firstRegistrationDate;
}

struct VehicleData {
    bool isStart;
    address vehicleAddress;
    VehicleProperties props;
    uint256 startingPrice;
    string[] vehicleImages;
}
