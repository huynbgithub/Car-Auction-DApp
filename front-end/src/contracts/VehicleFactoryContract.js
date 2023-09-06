import Web3, { Address, Transaction, TransactionReceipt } from 'web3'
import abi from '../abi/VehicleFactoryContractAbi'
import { gas, gasPrice } from '../utils/Constants'
import { VehicleData, parseVehicleData } from '../utils/ParseUtils.js'
import { getHttpWeb3 } from './Web3Utils'

const getVehicleFactoryContract = (web3) => {
    try {
        return new web3.eth.Contract(abi, process.env.REACT_APP_VEHICLE_FACTORY_CONTRACT_ADDRESS)
    } catch (e) {
        console.log(e)
    }
}

export const createVehicle = async (
    web3,
    fromAddress,
    props,
    startingPrice,
    vehicleImages,
) => {
    try {
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
    } catch (e) {
        console.log(e)
    }
}

export const getOwnedDeployedVehicleDatas = async (
    web3,
    address
) => {
    try {
        const datas = await getVehicleFactoryContract(web3).methods.getOwnedDeployedVehicleDatas(address).call()
        return datas.map(data => parseVehicleData(data))
    } catch (e) {
        console.log(e)
    }
}

export const getDeployedVehicleDatas = async (
) => {
    try {
        const datas = await getVehicleFactoryContract(getHttpWeb3()).methods.getDeployedVehicleDatas().call()
        return datas.map(data => parseVehicleData(data))
    } catch (e) {
        console.log(e)
    }
}