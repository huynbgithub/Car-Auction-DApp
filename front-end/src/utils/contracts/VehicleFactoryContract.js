
import vehicleFactoryContractAbi from "../abi/VehicleFactoryContractAbi"
import Web3 from "web3";

export const getVehicleFactoryContract = (web3) => {
    return new web3.eth.Contract(vehicleFactoryContractAbi, "0x8a23855d2f143697139dF3f9D6f2d5A4b5a12959");
}

export const createVehicle = async (deposit, props, startingPrice, vehicleImages, web3) => {
    const account = (await web3.eth.getAccounts())[0];
    try {
        return await getVehicleFactoryContract(web3).methods.createVehicle(
            deposit,
            props, 
            startingPrice, 
            vehicleImages
            )
        .send(
            {
                from: account,
                gasPrice: Web3.utils.toWei(25, 'gwei'),
                gas: 3000000,
                data: await getVehicleFactoryContract(web3).methods.createVehicle(
                    deposit,
                     props, 
                     startingPrice, 
                     vehicleImages
                     ).encodeABI()
            }
        );
    } catch (e) {
        console.log(e)
    }
}