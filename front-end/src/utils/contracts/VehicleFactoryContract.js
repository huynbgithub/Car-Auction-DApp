
import vehicleFactoryContractAbi from "../abi/VehicleFactoryContractAbi"
import Web3 from "web3";

export const getVehicleFactoryContract = (web3) => {
    const eth = web3.eth;
    return new eth.Contract(vehicleFactoryContractAbi, "0x6e07b062Cf43F9E7cb4e2745e6480fed7698e591");
}

export const createVehicle = async (deposit, props, startingPrice, vehicleImages, web3) => {
    const account = (await web3.eth.getAccounts())[0];
    console.log(account);
    try {
        const result = await getVehicleFactoryContract(web3).methods.createVehicle(deposit, props, startingPrice, vehicleImages).send(

            {
                from: account,
                // gasPrice: Web3.utils.toWei(20, 'gwei'),
                // gas: 3000000
            }
        );
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}