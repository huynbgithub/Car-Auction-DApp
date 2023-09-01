import vehicleContractAbi from "../abi/VehicleContractAbi"
import Web3 from "web3";

export const getVehicleContract = (vehicleAddress, web3) => {
  
    return new web3.eth.Contract(vehicleContractAbi, vehicleAddress);
}

export const createAuctionRound = async (quantity, auctionRoundDate, vehicleAddress, web3) => {
    const account = (await web3.eth.getAccounts())[0];
    try {
        return await getVehicleContract(vehicleAddress, web3).methods.createAuctionRound(
            quantity,
            auctionRoundDate
            )
        .send(
            {
                from: account,
                gasPrice: Web3.utils.toWei(25, 'gwei'),
                gas: 3000000,
                data: await getVehicleContract(vehicleAddress,web3).methods.createAuctionRound(
                    quantity,
                    auctionRoundDate, 
                    ).encodeABI()
            }
        );
    } catch (e) {
        console.log(e)
    }
}
