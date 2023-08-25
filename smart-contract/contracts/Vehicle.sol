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
        uint auctionRoundPrice;
        uint auctionRoundDate;
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
    function getAuctionRound() internal view returns (uint32, AuctionRound memory){
        for (uint32 i = 0; i < auctionRoundsSize; i++) {
            if (auctionRounds[i].auctioneer == msg.sender) {
                return (i, auctionRounds[i]);
            }
        }
        revert AuctionRoundNotFoundException(msg.sender);
    }

    modifier hasAuctionRound(){
        getAuctionRound();
        _;
    }
    
    function removeAuctionRound(address ) internal  hasAuctionRound(){
        (uint32 index, ) = getAuctionRound();
        
        if (index == auctionRoundsSize - 1){
        } else {
            for (uint32 i = index + 1; i < auctionRoundsSize - 1; i++){
                auctionRounds[i-1] = auctionRounds[i];
            }
        }
            delete auctionRounds[auctionRoundsSize - 1];
            auctionRoundsSize --;
    }

    function transfer(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Klay");
    }

    function createAuctionRound(uint auctionRoundPrice, uint auctionRoundDate, address payable factoryAddress) public payable {
        AuctionRound memory auctionRound = AuctionRound(msg.sender, auctionRoundPrice, auctionRoundDate);
        
        auctionRounds[auctionRoundsSize] = auctionRound;
        auctionRoundsSize++;   

        transfer(factoryAddress);
    }

    function returnFundsToAuctioneer(address auctioneer) public {
        removeAuctionRound(auctioneer);
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
