import Web3, { Address, Transaction, TransactionReceipt } from 'web3'
import abi from '../abi/VehicleFactoryContractAbi'
import { gas, gasPrice } from '../utils/Constants'
import { VehicleData, parseVehicleData } from '../utils/ParseUtils.js'

const getVehicleFactoryContract = (web3) => {
    return new web3.eth.Contract(abi, process.env.REACT_APP_VEHICLE_FACTORY_CONTRACT_ADDRESS)
}

export const createVehicle = async (
    web3,
    fromAddress,
    props,
    startingPrice,
    vehicleImages,
) => {
    const data = getVehicleFactoryContract(web3).methods.createVehicle(
        props,
        startingPrice,
        vehicleImages
    ).encodeABI()

    return await web3.eth.sendTransaction({
        from: fromAddress,
        to: process.env.REACT_APP_VEHICLE_FACTORY_CONTRACT_ADDRESS,
        gasPrice,
        gas,
        data
    })
}

export const getOwnedDeployedVehicleDatas = async (
    web3,
    address
) => {
    const datas = await getVehicleFactoryContract(web3).methods.getOwnedDeployedVehicleDatas(address).call()
    return datas.map(data => parseVehicleData(data))
}