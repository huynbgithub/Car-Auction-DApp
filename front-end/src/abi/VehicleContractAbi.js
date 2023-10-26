const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_factoryAddress",
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
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "bidder",
                "type": "address"
            }
        ],
        "name": "BidNotFoundException",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "bidderAddress",
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
                "name": "deposit",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "name": "CreateBid",
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
                "indexed": false,
                "internalType": "address",
                "name": "vehicleOwner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "bidPrice",
                "type": "uint256"
            }
        ],
        "name": "SubmitAuction",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "bidderAddress",
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
            }
        ],
        "name": "WithdrawBid",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "approveVehicle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "bidDate",
                "type": "uint256"
            }
        ],
        "name": "createBid",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "factoryAddress",
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
        "inputs": [],
        "name": "findNearestUnwithdrawedBid",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "index",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "bidder",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bidDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isWithdrawed",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Vehicle.Bid",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBids",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "index",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "bidder",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bidDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isWithdrawed",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Vehicle.Bid[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBidsSize",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getData",
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
                "internalType": "struct VehicleData",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStart",
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
        "name": "getStartingPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getVehicleImages",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getVehicleProperties",
        "outputs": [
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
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isApproved",
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
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "state",
                "type": "bool"
            }
        ],
        "name": "setStart",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "submitAuction",
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
        "inputs": [],
        "name": "withdrawBid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export default abi