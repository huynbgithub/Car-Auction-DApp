// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Vehicle.sol";

contract VehicleFactory {
    Vehicle[] private deployedVehicles;

    event CreateVehicle(address ownerAddress, address contractAddress);

    function createVehicle(
    uint _deposit,
    VehicleProperties memory _props,
    uint _startingPrice,
    string[] memory _vehicleImages
) public returns (address) {
    Vehicle newVehicle = new Vehicle(
        _deposit,
        _props,
        _startingPrice,
        _vehicleImages
    );
    deployedVehicles.push(newVehicle);

    emit CreateVehicle(msg.sender, address(newVehicle));
    return address(newVehicle);
}

    function getDeployedVehicles() external view returns (Vehicle[] memory) {
        return deployedVehicles;
    }

    function getDeployedVehicleDatas() external view returns (VehicleData[] memory){
        VehicleData[] memory vehicleDatas = new VehicleData[](deployedVehicles.length);

        for (uint i = 0; i < deployedVehicles.length; i++) {
            vehicleDatas[i] = deployedVehicles[i].getData();
        }
        return vehicleDatas;
    }

}