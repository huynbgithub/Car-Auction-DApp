export type VehicleData = {
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