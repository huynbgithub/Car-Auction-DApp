
import vehicleFactoryContractAbi from "../abi/VehicleFactoryContractAbi"
import Web3 from "web3";

export const getVehicleFactoryContract = (web3) => {
    const eth = web3.eth;
    return new eth.Contract(vehicleFactoryContractAbi, "0x9ab4614dEDF3095E098959Aaa9c8Da89e11fCc51");
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