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

    struct AuctionRound {
        uint32 index;
        address auctioneer;
        uint256 quantity;
        uint256 auctionRoundDate;
        bool isWithdrawed;
    }

    mapping(uint32 => AuctionRound) private auctionRounds;
    uint32 auctionRoundsSize;

    function getAuctionRounds() public view returns (AuctionRound[] memory) {
        AuctionRound[] memory rounds = new AuctionRound[](auctionRoundsSize);

        for (uint32 i = 0; i < auctionRoundsSize; i++) {
            rounds[i] = auctionRounds[i];
        }
        return rounds;
    }

    error AuctionRoundNotFoundException(address auctioneer);

    function getAuctionRound()
        internal
        view
        returns (uint32, AuctionRound memory)
    {
        for (uint32 i = 0; i < auctionRoundsSize; i++) {
            if (auctionRounds[i].auctioneer == msg.sender) {
                return (i, auctionRounds[i]);
            }
        }
        revert AuctionRoundNotFoundException(msg.sender);
    }

    modifier hasAuctionRound() {
        getAuctionRound();
        _;
    }

    function removeAuctionRound(address) internal hasAuctionRound {
        (uint32 index, ) = getAuctionRound();

        if (index == auctionRoundsSize - 1) {} else {
            for (uint32 i = index + 1; i < auctionRoundsSize - 1; i++) {
                auctionRounds[i - 1] = auctionRounds[i];
            }
        }
        delete auctionRounds[auctionRoundsSize - 1];
        auctionRoundsSize--;
    }

    // event Bid(
    event CreateAuctionRound(
        address indexed auctioneerAddress,
        address indexed vehicleContractAddress,
        uint32 index,
        uint256 deposit,
        uint256 quantity
    );

    function getAuctionRoundsSize() external view returns (uint32) {
        return auctionRoundsSize;
    }

    function findNearestUnwithdrawedAuctionRound()
        public
        view
        returns (AuctionRound memory)
    {
        uint32 currentIndex = auctionRoundsSize;
        while (currentIndex > 0) {
            currentIndex--;
            AuctionRound memory currentRound = auctionRounds[currentIndex];
            if (!currentRound.isWithdrawed) {
                return currentRound;
            }
        }
        return AuctionRound(0, address(0), 0, 0, true);
    }

    // function bid(
    function createAuctionRound(
        uint256 quantity,
        uint256 auctionRoundDate
    ) public payable valueMustEqualQuantity(quantity) hasStart notOwner {
        AuctionRound memory auctionRound = AuctionRound(
            auctionRoundsSize + 1,
            msg.sender,
            quantity,
            auctionRoundDate,
            false
        );

        auctionRounds[auctionRoundsSize] = auctionRound;

        AuctionRound
            memory nearestUnwithdrawedAuctionRound = findNearestUnwithdrawedAuctionRound();

        if (msg.sender.balance < 1000000000000000000) {
            revert(
                string.concat(
                    Strings.toString(msg.sender.balance),
                    string.concat(Strings.toString(quantity))
                )
            );
        }

        require(
            !(nearestUnwithdrawedAuctionRound.isWithdrawed &&
                quantity < startingPrice),
            "The quantity must equal or exceed the starting price."
        );

        require(
            !(!nearestUnwithdrawedAuctionRound.isWithdrawed &&
                quantity <
                auctionRounds[auctionRoundsSize - 1].quantity +
                    100000000000000000),
            "New quantity must be greater than the previous at least 0.1 KLAY."
        );

        payable(factoryAddress).transfer(msg.value);

        // emit Bid(
        emit CreateAuctionRound(
            msg.sender,
            address(this),
            auctionRoundsSize,
            quantity,
            msg.value
        );

        if (!nearestUnwithdrawedAuctionRound.isWithdrawed) {
            VehicleFactory vehicleFactory = VehicleFactory(
                payable(factoryAddress)
            );

            vehicleFactory.refundToAuctioneer(
                nearestUnwithdrawedAuctionRound.auctioneer,
                address(this),
                nearestUnwithdrawedAuctionRound.index,
                nearestUnwithdrawedAuctionRound.quantity
            );

            auctionRounds[nearestUnwithdrawedAuctionRound.index - 1]
                .isWithdrawed = true;
        }

        auctionRoundsSize++;
    }

    event WithdrawAuctionRound(
        address indexed auctioneerAddress,
        address indexed vehicleContractAddress,
        uint32 index
    );

    function withdrawAuctionRound() public hasStart hasAuctionRound notOwner {
        AuctionRound memory lastAuctionRound = auctionRounds[
            auctionRoundsSize - 1
        ];

        require(
            !lastAuctionRound.isWithdrawed,
            "The last auction round has been withdrawed."
        );

        require(
            msg.sender == lastAuctionRound.auctioneer,
            "Sender is not the auctioneer of the last auction round."
        );

        VehicleFactory vehicleFactory = VehicleFactory(payable(factoryAddress));

        vehicleFactory.refundToAuctioneer(
            lastAuctionRound.auctioneer,
            address(this),
            lastAuctionRound.index,
            lastAuctionRound.quantity
        );

        emit WithdrawAuctionRound(msg.sender, address(this), auctionRoundsSize);

        auctionRounds[auctionRoundsSize - 1].isWithdrawed = true;
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
        auctionRoundsSize = 0;
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
        uint256 auctionRoundPrice
    );

    function submitAuction() public onlyOwner {
        AuctionRound
            memory nearestUnwithdrawedAuctionRound = findNearestUnwithdrawedAuctionRound();

        if (nearestUnwithdrawedAuctionRound.isWithdrawed) {
            revert("No auction rounds to submit.");
        }

        VehicleFactory vehicleFactory = VehicleFactory(payable(factoryAddress));

        vehicleFactory.payForOwner(
            owner,
            nearestUnwithdrawedAuctionRound.auctioneer,
            address(this),
            nearestUnwithdrawedAuctionRound.quantity
        );

        isStart = false;

        address lastAuctioneer = nearestUnwithdrawedAuctionRound.auctioneer;

        transferOwnership(lastAuctioneer);

        emit SubmitAuction(
            address(this),
            lastAuctioneer,
            auctionRounds[auctionRoundsSize - 1].quantity
        );

        for (uint32 i = 0; i < auctionRoundsSize; i++) {
            delete auctionRounds[i];
        }

        auctionRoundsSize = 0;
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
