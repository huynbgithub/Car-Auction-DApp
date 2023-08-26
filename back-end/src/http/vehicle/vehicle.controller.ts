import { Injectable } from '@nestjs/common'
import { VehicleFactoryContractService } from 'src/blockchain/contracts/vehicle-factory-contract.service'

@Injectable()
export class VehicleService {
    constructor(
        private readonly vehicleFactoryContractService: VehicleFactoryContractService,
    ) { }

    async processGetVehicles() {
        return this.vehicleFactoryContractService.getDeployedVehicles()
    }
}