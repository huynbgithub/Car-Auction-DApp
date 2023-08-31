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
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'auctioneerAddress',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'vehicleContractAddress',
                'type': 'address'
            },
            {
                'indexed': false,
                'internalType': 'uint32',
                'name': 'index',
                'type': 'uint32'
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'deposit',
                'type': 'uint256'
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'quantity',
                'type': 'uint256'
            }
        ],
        'name': 'CreateAuctionRound',
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
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'auctioneerAddress',
                'type': 'address'
            },
            {
                'indexed': true,
                'internalType': 'address',
                'name': 'vehicleContractAddress',
                'type': 'address'
            },
            {
                'indexed': false,
                'internalType': 'uint32',
                'name': 'index',
                'type': 'uint32'
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'quantity',
                'type': 'uint256'
            }
        ],
        'name': 'RefundToAuctioneer',
        'type': 'event'
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'vehicleOwner',
                'type': 'address'
            },
            {
                'indexed': false,
                'internalType': 'address',
                'name': 'recipient',
                'type': 'address'
            },
            {
                'indexed': false,
                'internalType': 'uint256',
                'name': 'auctionRoundPrice',
                'type': 'uint256'
            }
        ],
        'name': 'SubmitAuction',
        'type': 'event'
    },
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': 'quantity',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'auctionRoundDate',
                'type': 'uint256'
            }
        ],
        'name': 'createAuctionRound',
        'outputs': [],
        'stateMutability': 'payable',
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
                        'name': 'quantity',
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
        'name': 'getAuctionRoundsSize',
        'outputs': [
            {
                'internalType': 'uint32',
                'name': '',
                'type': 'uint32'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getData',
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
                'internalType': 'struct VehicleData',
                'name': '',
                'type': 'tuple'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'getDeposit',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256'
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
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256'
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
                'internalType': 'uint256',
                'name': '_amount',
                'type': 'uint256'
            }
        ],
        'name': 'setDeposit',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'inputs': [],
        'name': 'submitAuction',
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
    }
] as const

export default abi