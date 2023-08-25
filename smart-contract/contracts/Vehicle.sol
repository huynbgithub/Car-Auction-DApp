// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

struct VehicleProperties {
    string ownerFullName;
    string ownerAddress;
    string brand;
    string vehicleType;
    string color;
    int16 seatCapacity;
    string origin;
    string licensePlate;
    string engineNumber;
    string chassisNumber;
    string modelCode;
    int32 capacity;
    uint256 firstRegistrationDate;
}

contract Vehicle is Ownable {
    VehicleProperties private props;

    int32 private startingPrice;

    string[] private vehicleImages;

    struct AuctionRound {
        address auctioneer;
        int32 auctionRoundPrice;
        uint32 auctionRoundDate;
    }

    mapping(uint32 => AuctionRound) private auctionRounds;
    uint32 auctionRoundsSize;

    function getAuctionRounds() external view returns (AuctionRound[] memory) {
        AuctionRound[] memory rounds = new AuctionRound[](auctionRoundsSize);

        for (uint32 i = 0; i < auctionRoundsSize; i++) {
            rounds[i] = auctionRounds[i];
        }
        return rounds;
    }

    constructor(
        VehicleProperties memory _props,
        int32 _startingPrice,
        string[] memory _vehicleImages
    ) {
        console.log("New Vehicle Contract has been deployed.");
        props = _props;
        startingPrice = _startingPrice;
        vehicleImages = _vehicleImages;
        auctionRoundsSize = 0;
    }

    function getVehicleProperties()
        external
        view
        returns (VehicleProperties memory)
    {
        return props;
    }

    function getStartingPrice() external view returns (int32) {
        return startingPrice;
    }

    function getVehicleImages() external view returns (string[] memory) {
        return vehicleImages;
    }
}
