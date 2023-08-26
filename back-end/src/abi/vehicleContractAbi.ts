const abi = [
    {
        'inputs': [
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
                        'internalType': 'int16',
                        'name': 'seatCapacity',
                        'type': 'int16'
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
                        'internalType': 'int32',
                        'name': 'capacity',
                        'type': 'int32'
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
                'internalType': 'int32',
                'name': '_startingPrice',
                'type': 'int32'
            },
            {
                'internalType': 'string[]',
                'name': '_vehicleImages',
                'type': 'string[]'
            }
        ],
        'stateMutability': 'nonpayable',
        'type': 'constructor'
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'auctioneer',
                'type': 'address'
            }
        ],
        'name': 'AuctionRoundNotFoundException',
        'type': 'error'
    },
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': 'auctionRoundPrice',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'auctionRoundDate',
                'type': 'uint256'
            },
            {
                'internalType': 'address payable',
                'name': 'recipient',
                'type': 'address'
            }
        ],
        'name': 'createAuctionRound',
        'outputs': [],
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'previousOwner',
                'type': 'address'
            }
        ],
        'name': 'OwnershipRenounced',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'previousOwner',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'newOwner',
                'type': 'address'
            }
        ],
        'name': 'OwnershipTransferred',
        'type': 'event'
    },
    {
        'inputs': [],
        'name': 'renounceOwnership',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': 'auctioneer',
                'type': 'address'
            }
        ],
        'name': 'returnFundsToAuctioneer',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'address',
                'name': '_newOwner',
                'type': 'address'
            }
        ],
        'name': 'transferOwnership',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getAuctionRounds',
        'outputs': [
            {
                'components': [
                    {
                        'internalType': 'address',
                        'name': 'auctioneer',
                        'type': 'address'
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'auctionRoundPrice',
                        'type': 'uint256'
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'auctionRoundDate',
                        'type': 'uint256'
                    }
                ],
                'internalType': 'struct Vehicle.AuctionRound[]',
                'name': '',
                'type': 'tuple[]'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getStartingPrice',
        'outputs': [
            {
                'internalType': 'int32',
                'name': '',
                'type': 'int32'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getVehicleImages',
        'outputs': [
            {
                'internalType': 'string[]',
                'name': '',
                'type': 'string[]'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getVehicleProperties',
        'outputs': [
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
                        'internalType': 'int16',
                        'name': 'seatCapacity',
                        'type': 'int16'
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
                        'internalType': 'int32',
                        'name': 'capacity',
                        'type': 'int32'
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'firstRegistrationDate',
                        'type': 'uint256'
                    }
                ],
                'internalType': 'struct VehicleProperties',
                'name': '',
                'type': 'tuple'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'owner',
        'outputs': [
            {
                'internalType': 'address',
                'name': '',
                'type': 'address'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    }
] as const

export default abi