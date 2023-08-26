import { Injectable } from '@nestjs/common'
import { Web3Service } from '../web3.service'
import blockchainConfig from '@config/blockchain.config'
import vehicleFactoryContractAbi from '../../abi/vehicleFactoryContractAbi'

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
    
    getDeployedVehicles(){
        return this.getVehicleFactoryContract().methods.getDeployedVehicles().call()
    }
}