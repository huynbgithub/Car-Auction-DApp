import { VehicleData } from '@defined-types/contract.type'

export const formatVehicleData = (data) : VehicleData => {
    return {
        address: data.vehicleAddress.toString(),
        deposit: data.deposit.toString(),
        props: {
            ownerFullName: data.props.ownerFullName.toString(),
            ownerAddress: data.props.ownerAddress.toString(),
            brand: data.props.brand.toString(),
            vehicleType: data.props.vehicleType.toString(),
            color: data.props.color.toString(),
            seatCapacity: Number.parseInt(data.props.seatCapacity.toString()),
            origin: data.props.origin.toString(),
            licensePlate: data.props.licensePlate.toString(),
            engineNumber: data.props.engineNumber.toString(),
            chassisNumber: data.props.chassisNumber.toString(),
            modelCode: data.props.modelCode.toString(),
            capacity: Number.parseInt(data.props.capacity.toString()),
            firstRegistrationDate: data.props.firstRegistrationDate.toString()
        },
        startingPrice: data.startingPrice.toString(),
        vehicleImages: data.vehicleImages
    }
} 