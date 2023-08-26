// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract Vehicle is Ownable {

    uint private deposit;

    function setDeposit(uint _amount) public onlyOwner(){
        deposit = _amount;
    }

    function getDeposit() public view returns (uint) {
        return deposit;
    }

    modifier valueMustEqualDeposit() {
        require(msg.value == deposit, "Value must equal deposit");
        _;
    }

    VehicleProperties private props;

    uint private startingPrice;

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
    
    function removeAuctionRound(address ) internal hasAuctionRound() {
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

    function createAuctionRound(uint auctionRoundPrice, uint auctionRoundDate, address payable recipient) public payable valueMustEqualDeposit() {
        AuctionRound memory auctionRound = AuctionRound(msg.sender, auctionRoundPrice, auctionRoundDate);     
        
        auctionRounds[auctionRoundsSize] = auctionRound;
        auctionRoundsSize++;   

        recipient.transfer(msg.value);
    }

    function returnFundsToAuctioneer(address auctioneer, address payable recipient) public payable onlyOwner() valueMustEqualDeposit(){
        removeAuctionRound(auctioneer);

        recipient.transfer(msg.value);
    }

    constructor(
        uint _deposit, 
        VehicleProperties memory _props,
        uint _startingPrice,
        string[] memory _vehicleImages
    ) {
        console.log("New Vehicle Contract has been deployed.");
        deposit = _deposit;
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

    function getStartingPrice() external view returns (uint) {
        return startingPrice;
    }

    function getVehicleImages() external view returns (string[] memory) {
        return vehicleImages;
    }

    function getData() external view returns (VehicleData memory){
        return VehicleData(deposit, props, startingPrice, vehicleImages);
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
    uint deposit;
    VehicleProperties props;
    uint startingPrice;
    string[] vehicleImages;
}