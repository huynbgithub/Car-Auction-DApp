import { Address, TransactionHash, Uint } from 'web3'

export type VehicleData = {
    address: Address
    deposit: string
    props: VehicleProperties
    startingPrice: string
    vehicleImages: string[]
}

export type VehicleProperties = {
    ownerFullName: string
    ownerAddress: string
    brand: string
    vehicleType: string
    color: string
    seatCapacity: number
    origin: string
    licensePlate: string
    engineNumber: string
    chassisNumber: string
    modelCode: string
    capacity: number
    firstRegistrationDate: string
}

export type CreateVehicleEventLog = {
    address: Address,
    name: 'CreateVehicle(address ownerAddress, address contractAddress)'
    params: {
        ownerAddress: Address,
        contractAddress: Address
    },
    transactionHash: TransactionHash
}

export type CreateAuctionRoundEventLog = {
    address: Address,
    name: 'CreateAuctionRound(address auctioneerAddress, address vehicleContractAddress, uint32 index, uint quantity)'
    params: {
        auctioneerAddress: Address,
        vehicleContractAddress: Address,
        index: number,
        quantity: Uint
    },
    transactionHash: TransactionHash
}