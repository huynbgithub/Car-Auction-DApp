//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

import "./Vehicle.sol";

contract VehicleFactory {
    Vehicle[] public deployedVehicles;

    function createVehicle(
    VehicleProperties memory _props,
    int32 _startingPrice,
    string[] memory _vehicleImages
) public returns (address) {
    Vehicle newVehicle = new Vehicle(
        _props,
        _startingPrice,
        _vehicleImages
    );
    deployedVehicles.push(newVehicle);
    return address(newVehicle);
}

    function getDeployedVehicles() public view returns (Vehicle[] memory) {
        return deployedVehicles;
    }
}