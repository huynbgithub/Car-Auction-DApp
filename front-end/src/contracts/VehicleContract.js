import abi from '../abi/VehicleContractAbi'
import { gas, gasPrice } from '../utils/Constants'
import { parseBid, parseVehicleData } from '../utils/ParseUtils.js'
import { getHttpWeb3 } from './Web3Utils'

const getVehicleContract = (web3, contractAddress) => {
    try {
        return new web3.eth.Contract(abi, contractAddress)
    } catch (e) {
        console.log(e)
    }
}

export const approveVehicle = async (
    web3,
    contractAddress,
    fromAddress,
) => {
    try {
        const data = getVehicleContract(web3, contractAddress).methods.approveVehicle().encodeABI()

        return await web3.eth.sendTransaction({
            from: fromAddress,
            to: contractAddress,
            gasPrice,
            gas,
            data
        })
    } catch (e) {
        console.log(e)
    }
}

export const getIsApproved = async (
    vehicleAddress
) => {
    try {
        const data = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.isApproved().call()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const setStart = async (
    web3,
    contractAddress,
    fromAddress,
    newValue
) => {
    try {
        const data = getVehicleContract(web3, contractAddress).methods.setStart(newValue).encodeABI()

        return await web3.eth.sendTransaction({
            from: fromAddress,
            to: contractAddress,
            gasPrice,
            gas,
            data
        })
    } catch (e) {
        console.log(e)
    }
}

export const createBid = async (
    web3,
    contractAddress,
    fromAddress,
    quantity,
    bidDate
) => {
    try {
        const data = getVehicleContract(web3, contractAddress).methods.createBid(
            quantity,
            bidDate
        ).encodeABI()

        console.log(data)

        return await web3.eth.sendTransaction({
            from: fromAddress,
            to: contractAddress,
            gasPrice,
            gas,
            data,
            value: quantity
        })
    } catch (e) {
        console.log(e)
    }
}

export const withdrawBid = async (
    web3,
    contractAddress,
    fromAddress
) => {
    try {
        const data = getVehicleContract(web3, contractAddress).methods.withdrawBid(
        ).encodeABI()

        console.log(data)

        return await web3.eth.sendTransaction({
            from: fromAddress,
            to: contractAddress,
            gasPrice,
            gas,
            data
        })
    } catch (e) {
        console.log(e)
    }
}

export const submitAuction = async (
    web3,
    contractAddress,
    fromAddress
) => {
    try {
        const data = getVehicleContract(web3, contractAddress).methods.submitAuction(
        ).encodeABI()

        console.log(data)

        return await web3.eth.sendTransaction({
            from: fromAddress,
            to: contractAddress,
            gasPrice,
            gas,
            data
        })
    } catch (e) {
        console.log(e)
    }
}

export const getVehicleData = async (
    vehicleAddress
) => {
    try {
        const data = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.getData().call()
        return parseVehicleData(data)
    } catch (e) {
        console.log(e)
    }
}

export const getBids = async (
    vehicleAddress
) => {
    try {
        const datas = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.getBids().call()
        return datas.map(data => parseBid(data))
    } catch (e) {
        console.log(e)
    }
}

export const getIsOwner = async (
    vehicleAddress,
    ownerAddress
) => {
    try {
        const data = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.isOwner(ownerAddress).call()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const getOwner = async (
    vehicleAddress
) => {
    try {
        const data = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.owner().call()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const findNearestUnwithdrawedBid = async (
    vehicleAddress
) => {
    try {
        const data = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.findNearestUnwithdrawedBid().call()
        return parseBid(data)
    } catch (e) {
        console.log(e)
    }
}




