// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Vehicle.sol";

contract VehicleFactory {
    Vehicle[] public deployedVehicles;

    event ReceiveCalled(uint amount);

    receive() external  payable {
        emit ReceiveCalled(msg.value);
    }

    modifier hasDeployed() {
        bool isDeployed = false;
        for (uint i = 0; i < deployedVehicles.length; i++) {
            if (address(deployedVehicles[i]) == msg.sender) {
                 isDeployed = true;
            }
        }
        require(isDeployed, "The vehicle contract has not been deployed by this factory.");
        _;
    }

    event CreateVehicle(address indexed ownerAddress, address indexed contractAddress);

    function createVehicle(
        VehicleProperties memory _props,
        uint _startingPrice,
        string[] memory _vehicleImages
) public{
    Vehicle newVehicle = new Vehicle(
        address(this),
        _props,
        _startingPrice,
        _vehicleImages
    );
    deployedVehicles.push(newVehicle);

    newVehicle.transferOwnership(msg.sender);

    emit CreateVehicle(msg.sender, address(newVehicle));
}   

    function getDeployedVehicles() external view returns (Vehicle[] memory) {
        return deployedVehicles;
    }

    function isAdmin(address checkAddress) public view {
        require(checkAddress == owner, "This address is not the owner");
    }

    function getOwnedDeployedVehicles(address ownerAddress) public view returns (Vehicle[] memory) {
        Vehicle[] memory ownedDeployedVehicles = new Vehicle[](deployedVehicles.length);
        uint32 ownedVehicleCount = 0;

    for (uint32 i = 0; i < deployedVehicles.length; i++) {
        if (deployedVehicles[i].owner() == ownerAddress) {
            ownedDeployedVehicles[ownedVehicleCount] = deployedVehicles[i];
            ownedVehicleCount++;
        }
    }
    assembly {
        mstore(ownedDeployedVehicles, ownedVehicleCount)
    }
    return ownedDeployedVehicles;
    }

    function getDeployedVehicleDatas() external view returns (VehicleData[] memory){
        VehicleData[] memory vehicleDatas = new VehicleData[](deployedVehicles.length);

        for (uint i = 0; i < deployedVehicles.length; i++) {
            vehicleDatas[i] = deployedVehicles[i].getData();
        }
        return vehicleDatas;
    }

    function getOwnedDeployedVehicleDatas(address ownerAddress) public view returns (VehicleData[] memory) {
        Vehicle[] memory ownedDeployedVehicles = getOwnedDeployedVehicles(ownerAddress);

        VehicleData[] memory ownedDeployedVehicleDatas = new VehicleData[](ownedDeployedVehicles.length);

        for (uint i = 0; i < ownedDeployedVehicles.length; i++) {
            ownedDeployedVehicleDatas[i] = ownedDeployedVehicles[i].getData();
        }
        return ownedDeployedVehicleDatas;
    }
    
    event RefundToAuctioneer(
        address indexed auctioneerAddress,
        address indexed vehicleContractAddress, 
        uint32 index, 
        uint quantity
        );

    function refundToAuctioneer(address previousAuctioneer, address vehicleContractAddress, uint32 index, uint quantity) public hasDeployed(){
        payable(previousAuctioneer).transfer(quantity);
        
        emit RefundToAuctioneer(
            previousAuctioneer, 
            vehicleContractAddress,
            index, 
            quantity);
        }

     event PayForOwner(
        address indexed oldOwnerAddress,
        address indexed newOwnerAddress,
        address indexed vehicleContractAddress, 
        uint quantity
        );

    function payForOwner(address oldOwnerAddress, address newOwnerAddress, address vehicleContractAddress, uint quantity) public hasDeployed(){
        payable(oldOwnerAddress).transfer(quantity);
        
        emit PayForOwner(
            oldOwnerAddress, 
            newOwnerAddress,
            vehicleContractAddress,
            quantity);
        }

}