const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "ownerAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
            }
        ],
        "name": "CreateVehicle",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipRenounced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldOwnerAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwnerAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "vehicleContractAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "name": "PayForOwner",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ReceiveCalled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "auctioneerAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "vehicleContractAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "index",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "name": "RefundToAuctioneer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "ownerFullName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "ownerAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "brand",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "vehicleType",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "color",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "seatCapacity",
                        "type": "uint16"
                    },
                    {
                        "internalType": "string",
                        "name": "origin",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "licensePlate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "engineNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "chassisNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "modelCode",
                        "type": "string"
                    },
                    {
                        "internalType": "uint32",
                        "name": "capacity",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "firstRegistrationDate",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct VehicleProperties",
                "name": "_props",
                "type": "tuple"
            },
            {
                "internalType": "uint256",
                "name": "_startingPrice",
                "type": "uint256"
            },
            {
                "internalType": "string[]",
                "name": "_vehicleImages",
                "type": "string[]"
            }
        ],
        "name": "createVehicle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "deployedVehicles",
        "outputs": [
            {
                "internalType": "contract Vehicle",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDeployedVehicleDatas",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "isStart",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "vehicleAddress",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "ownerFullName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "ownerAddress",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "brand",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "vehicleType",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "color",
                                "type": "string"
                            },
                            {
                                "internalType": "uint16",
                                "name": "seatCapacity",
                                "type": "uint16"
                            },
                            {
                                "internalType": "string",
                                "name": "origin",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "licensePlate",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "engineNumber",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "chassisNumber",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "modelCode",
                                "type": "string"
                            },
                            {
                                "internalType": "uint32",
                                "name": "capacity",
                                "type": "uint32"
                            },
                            {
                                "internalType": "uint256",
                                "name": "firstRegistrationDate",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct VehicleProperties",
                        "name": "props",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startingPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "vehicleImages",
                        "type": "string[]"
                    }
                ],
                "internalType": "struct VehicleData[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDeployedVehicles",
        "outputs": [
            {
                "internalType": "contract Vehicle[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ownerAddress",
                "type": "address"
            }
        ],
        "name": "getOwnedDeployedVehicleDatas",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "isStart",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "vehicleAddress",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "ownerFullName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "ownerAddress",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "brand",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "vehicleType",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "color",
                                "type": "string"
                            },
                            {
                                "internalType": "uint16",
                                "name": "seatCapacity",
                                "type": "uint16"
                            },
                            {
                                "internalType": "string",
                                "name": "origin",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "licensePlate",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "engineNumber",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "chassisNumber",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "modelCode",
                                "type": "string"
                            },
                            {
                                "internalType": "uint32",
                                "name": "capacity",
                                "type": "uint32"
                            },
                            {
                                "internalType": "uint256",
                                "name": "firstRegistrationDate",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct VehicleProperties",
                        "name": "props",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startingPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "vehicleImages",
                        "type": "string[]"
                    }
                ],
                "internalType": "struct VehicleData[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ownerAddress",
                "type": "address"
            }
        ],
        "name": "getOwnedDeployedVehicles",
        "outputs": [
            {
                "internalType": "contract Vehicle[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isCreator",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ownerAddress",
                "type": "address"
            }
        ],
        "name": "isOwner",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "oldOwnerAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "newOwnerAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "vehicleContractAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "name": "payForOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "previousAuctioneer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "vehicleContractAddress",
                "type": "address"
            },
            {
                "internalType": "uint32",
                "name": "index",
                "type": "uint32"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "name": "refundToAuctioneer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

export default abi