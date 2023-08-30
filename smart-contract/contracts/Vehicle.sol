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
        uint quantity;
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

    event CreateAuctionRound(address auctioneerAddress, address vehicleContractAddress, uint32 index, uint deposit, uint quantity);

    function createAuctionRound(uint quantity, uint auctionRoundDate) public payable valueMustEqualDeposit() {
        AuctionRound memory auctionRound = AuctionRound(msg.sender, msg.value, auctionRoundDate);     
        
        auctionRounds[auctionRoundsSize] = auctionRound;

        if (auctionRoundsSize > 0 && quantity < auctionRounds[auctionRoundsSize - 1].quantity){
            revert("New quantity must be greater than or equal to the previous auction round's quantity.");
        }
        
        emit CreateAuctionRound(msg.sender, address(this), auctionRoundsSize, quantity, msg.value);
        
        auctionRoundsSize++;
    }

    event ReturnFundsToAuctioneer(address auctioneerAddress, address vehicleContractAddress, uint32 index, uint quantity);

    function returnFundsToAuctioneer() public {
        removeAuctionRound(msg.sender);

        emit ReturnFundsToAuctioneer(msg.sender, address(this), auctionRoundsSize, deposit);

        payable(msg.sender).transfer(deposit);
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
        return VehicleData(address(this), deposit, props, startingPrice, vehicleImages);
    }

    event SubmitAuction(address vehicleOwner, address recipient, uint auctionRoundPrice);

    function submitAuction() public onlyOwner(){
        address lastAuctioneer = auctionRounds[auctionRoundsSize - 1].auctioneer;
        transferOwnership(lastAuctioneer);

        if (auctionRoundsSize == 0) revert("No auction rounds to submit.");

        emit SubmitAuction(address(this), lastAuctioneer, auctionRounds[auctionRoundsSize - 1].quantity);

        for (uint32 i = 0; i < auctionRoundsSize; i++){
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
    address vehicleAddress;
    uint deposit;
    VehicleProperties props;
    uint startingPrice;
    string[] vehicleImages;
}