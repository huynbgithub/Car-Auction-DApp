import Web3, { Address, Transaction, TransactionReceipt } from 'web3'
import abi from '../abi/VehicleContractAbi'
import { gas, gasPrice } from '../utils/Constants'
import { AuctionRound, VehicleData, parseAuctionRound, parseVehicleData } from '../utils/ParseUtils.js'
import { getHttpWeb3 } from './Web3Utils'

const getVehicleContract = (web3, contractAddress) => {
    return new web3.eth.Contract(abi, contractAddress)
}

export const setStart = async (
    web3,
    contractAddress,
    fromAddress,
    newValue
) => {
    const data = getVehicleContract(web3, contractAddress).methods.setStart(newValue).encodeABI()

    return await web3.eth.sendTransaction({
        from: fromAddress,
        to: contractAddress,
        gasPrice,
        gas,
        data
    })
}

export const createAuctionRound = async (
    web3,
    contractAddress,
    fromAddress,
    quantity,
    auctionRoundDate
) => {
    const data = getVehicleContract(web3, contractAddress).methods.createAuctionRound(
        quantity,
        auctionRoundDate
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
}

export const withdrawAuctionRound = async (
    web3,
    contractAddress,
    fromAddress
) => {
    const data = getVehicleContract(web3, contractAddress).methods.withdrawAuctionRound(
    ).encodeABI()

    console.log(data)

    return await web3.eth.sendTransaction({
        from: fromAddress,
        to: contractAddress,
        gasPrice,
        gas,
        data
    })
}

export const submitAuction = async (
    web3,
    contractAddress,
    fromAddress
) => {
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
}

export const getVehicleData = async (
    vehicleAddress
) => {
    const data = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.getData().call()
    return parseVehicleData(data)
}

export const getAuctionRounds = async (
    vehicleAddress
) => {
    const datas = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.getAuctionRounds().call()
    return datas.map(data => parseAuctionRound(data))
}

export const getIsOwner = async (
    vehicleAddress,
    ownerAddress
) => {
    const data = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.isOwner(ownerAddress).call()
    return data
}

export const getOwner = async (
    vehicleAddress
) => {
    const data = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.owner().call()
    return data
}

export const findNearestUnwithdrawedAuctionRound = async (
    vehicleAddress
) => {
    const data = await getVehicleContract(getHttpWeb3(), vehicleAddress).methods.findNearestUnwithdrawedAuctionRound().call()
    return parseAuctionRound(data)
}




