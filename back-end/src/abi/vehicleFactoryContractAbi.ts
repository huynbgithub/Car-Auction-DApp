const abi = [
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
    }
]  as const

export default abi