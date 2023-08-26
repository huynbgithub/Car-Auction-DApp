import { Module } from '@nestjs/common'
import { VehicleController } from './vehicle.controller'
import { VehicleService } from './vehicle.service'
import { VehicleFactoryContractService } from 'src/blockchain/contracts/vehicle-factory-contract.service'
import { Web3Service } from 'src/blockchain/web3.service'
import { VehicleContractService } from 'src/blockchain/contracts/vehicle-contract.service'

@Module({
    imports: [],
    providers: [
        VehicleService,
        VehicleContractService,
        VehicleFactoryContractService,
        Web3Service
    ],
    controllers: [VehicleController]
})

export class VehicleModule {}