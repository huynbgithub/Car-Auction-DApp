import { Controller, Get, Param } from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { Address } from 'web3'

@Controller('api/vehicle')
export class VehicleController {
    constructor(
        private readonly vehicleService: VehicleService
    ) { }

    @Get('get-vehicle-data/:address') 
    async handleGetVehicleData(@Param('address') address: Address) {
        return await this.vehicleService.processGetVehicleData(address)
    }

    @Get('get-vehicles')
    async handleGetVehicles(){
        return await this.vehicleService.processGetVehicles()
    }

    @Get('get-vehicle-datas')
    async handleCreateVehicleDatas(){
        return await this.vehicleService.processGetVehicleDatas()
    }

    @Get('get-vehicle-datas')
    async handleGetVehicleDatas(){
        return await this.vehicleService.processGetVehicleDatas()
    }

    @Get('get-auction-rounds/:address')
    async handleGetAuctionRounds(@Param('address') address: Address){
        return await this.vehicleService.processGetAuctionRounds(address)
    }
}
