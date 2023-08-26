import { Controller, Get } from '@nestjs/common'
import { VehicleService } from './vehicle.service'

@Controller('api/vehicle')
export class VehicleController {
    constructor(
        private readonly vehicleService: VehicleService
    ) { }

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
}