const abi = [
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'ownerAddress',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'contractAddress',
                'type': 'address'
            }
        ],
        'name': 'CreateVehicle',
        'type': 'event'
    },
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': '_deposit',
                'type': 'uint256'
            },
            {
                'components': [
                    {
                        'internalType': 'string',
                        'name': 'ownerFullName',
                        'type': 'string'
                    },
                    {
                        'internalType': 'string',
                        'name': 'ownerAddress',
                        'type': 'string'
                    },
                    {
                        'internalType': 'string',
                        'name': 'brand',
                        'type': 'string'
                    },
                    {
                        'internalType': 'string',
                        'name': 'vehicleType',
                        'type': 'string'
                    },
                    {
                        'internalType': 'string',
                        'name': 'color',
                        'type': 'string'
                    },
                    {
                        'internalType': 'uint16',
                        'name': 'seatCapacity',
                        'type': 'uint16'
                    },
                    {
                        'internalType': 'string',
                        'name': 'origin',
                        'type': 'string'
                    },
                    {
                        'internalType': 'string',
                        'name': 'licensePlate',
                        'type': 'string'
                    },
                    {
                        'internalType': 'string',
                        'name': 'engineNumber',
                        'type': 'string'
                    },
                    {
                        'internalType': 'string',
                        'name': 'chassisNumber',
                        'type': 'string'
                    },
                    {
                        'internalType': 'string',
                        'name': 'modelCode',
                        'type': 'string'
                    },
                    {
                        'internalType': 'uint32',
                        'name': 'capacity',
                        'type': 'uint32'
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'firstRegistrationDate',
                        'type': 'uint256'
                    }
                ],
                'internalType': 'struct VehicleProperties',
                'name': '_props',
                'type': 'tuple'
            },
            {
                'internalType': 'uint256',
                'name': '_startingPrice',
                'type': 'uint256'
            },
            {
                'internalType': 'string[]',
                'name': '_vehicleImages',
                'type': 'string[]'
            }
        ],
        'name': 'createVehicle',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            }
        ],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getDeployedVehicleDatas',
        'outputs': [
            {
                'components': [
                    {
                        'internalType': 'address',
                        'name': 'vehicleAddress',
                        'type': 'address'
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'deposit',
                        'type': 'uint256'
                    },
                    {
                        'components': [
                            {
                                'internalType': 'string',
                                'name': 'ownerFullName',
                                'type': 'string'
                            },
                            {
                                'internalType': 'string',
                                'name': 'ownerAddress',
                                'type': 'string'
                            },
                            {
                                'internalType': 'string',
                                'name': 'brand',
                                'type': 'string'
                            },
                            {
                                'internalType': 'string',
                                'name': 'vehicleType',
                                'type': 'string'
                            },
                            {
                                'internalType': 'string',
                                'name': 'color',
                                'type': 'string'
                            },
                            {
                                'internalType': 'uint16',
                                'name': 'seatCapacity',
                                'type': 'uint16'
                            },
                            {
                                'internalType': 'string',
                                'name': 'origin',
                                'type': 'string'
                            },
                            {
                                'internalType': 'string',
                                'name': 'licensePlate',
                                'type': 'string'
                            },
                            {
                                'internalType': 'string',
                                'name': 'engineNumber',
                                'type': 'string'
                            },
                            {
                                'internalType': 'string',
                                'name': 'chassisNumber',
                                'type': 'string'
                            },
                            {
                                'internalType': 'string',
                                'name': 'modelCode',
                                'type': 'string'
                            },
                            {
                                'internalType': 'uint32',
                                'name': 'capacity',
                                'type': 'uint32'
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'firstRegistrationDate',
                                'type': 'uint256'
                            }
                        ],
                        'internalType': 'struct VehicleProperties',
                        'name': 'props',
                        'type': 'tuple'
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'startingPrice',
                        'type': 'uint256'
                    },
                    {
                        'internalType': 'string[]',
                        'name': 'vehicleImages',
                        'type': 'string[]'
                    }
                ],
                'internalType': 'struct VehicleData[]',
                'name': '',
                'type': 'tuple[]'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getDeployedVehicles',
        'outputs': [
            {
                'internalType': 'contract Vehicle[]',
                'name': '',
                'type': 'address[]'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'vehicleAddress',
                'type': 'address'
            }
        ],
        'name': 'isDeployed',
        'outputs': [
            {
                'internalType': 'bool',
                'name': '',
                'type': 'bool'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    }
] as const

export default abi