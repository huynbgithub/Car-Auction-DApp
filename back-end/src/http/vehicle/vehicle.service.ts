import { Injectable } from '@nestjs/common'
import { VehicleContractService } from 'src/blockchain/contracts/vehicle-contract.service'
import { VehicleFactoryContractService } from 'src/blockchain/contracts/vehicle-factory-contract.service'
import { Address } from 'web3'

@Injectable()
export class VehicleService {
    constructor(
        private readonly vehicleContractService: VehicleContractService,
        private readonly vehicleFactoryContractService: VehicleFactoryContractService,
    ) { }

    async processGetVehicleData(vehicleAddress: Address) {
        //return await this.vehicleContractService.getVehicleProperties('0xC39D41B2b44B9726B80F871d213E366b0c069Ec0')
        return await this.vehicleContractService.getVehicleData(vehicleAddress)
    }

    async processGetVehicles() {
        //return await this.vehicleContractService.getVehicleProperties('0xC39D41B2b44B9726B80F871d213E366b0c069Ec0')
        return await this.vehicleFactoryContractService.getDeployedVehicles()
    }

    async processGetVehicleDatas(){
        //return await this.vehicleContractService.getVehicleProperties('0xC39D41B2b44B9726B80F871d213E366b0c069Ec0')
        return await this.vehicleFactoryContractService.getDeployedVehicleDatas()
    }
}