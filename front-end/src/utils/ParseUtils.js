export const parseVehicleData = (data) => {
    return {
        isStart: data.isStart,
        address: data.vehicleAddress.toString(),
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

export const parseAuctionRound = (data) => {
    return {
        index: Number(data.index),
        auctioneer: data.auctioneer.toString(),
        auctionRoundDate: data.auctionRoundDate.toString(),
        quantity: data.quantity.toString(),
        isWithdrawed: data.isWithdrawed
    }
}