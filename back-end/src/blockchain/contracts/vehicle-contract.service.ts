import { Injectable } from '@nestjs/common'
import { Web3Service } from '../web3.service'
import vehicleContractAbi from '../../abi/vehicleContractAbi'
import { Address } from 'web3'
import { VehicleData } from '@defined-types/contract.type'
import { formatVehicleData } from '@utils/formatter'

@Injectable()
export class VehicleContractService {
    constructor(
        private readonly web3Service: Web3Service,
    ) { }
    
    private getVehicleContract(contractAddress: Address) {
        const web3 = this.web3Service.getHttpWeb3Instance()
        return new web3.eth.Contract(
            vehicleContractAbi, 
            contractAddress
        )
    }
    
    async getVehicleData(contractAddress: Address): Promise<VehicleData> {
        const result = await this.getVehicleContract(contractAddress).methods.getData().call()
        return formatVehicleData(result)
    }

    // async getVehicleProperties(contractAddress: Address){
    //return (await this.getVehicleContract(contractAddress).methods.getData().call()).
    // }
}