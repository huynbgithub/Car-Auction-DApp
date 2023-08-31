import { Injectable } from '@nestjs/common'
import { Web3Service } from '../web3.service'
import blockchainConfig from '@config/blockchain.config'
import vehicleFactoryContractAbi from '../../abi/vehicleFactoryContractAbi'
import { VehicleData } from '@defined-types/contract.type'
import { formatVehicleData } from '@utils/formatter'

@Injectable()
export class VehicleFactoryContractService {
    constructor(
        private readonly web3Service: Web3Service,
    ) { }
    
    private getVehicleFactoryContract() {
        const web3 = this.web3Service.getHttpWeb3Instance()
        return new web3.eth.Contract(
            vehicleFactoryContractAbi, 
            blockchainConfig().vehicleFactoryAddress
        )
    }
    
    async getDeployedVehicles(){
        return await this.getVehicleFactoryContract().methods.getDeployedVehicles().call()
    }

    async getDeployedVehicleDatas(){
        const response = await this.getVehicleFactoryContract().methods.getDeployedVehicleDatas().call()
        const results: VehicleData[] = []

        response.forEach(vehicleData => 
            results.push(
                formatVehicleData(vehicleData)
            )
        )

        return results
    }
}