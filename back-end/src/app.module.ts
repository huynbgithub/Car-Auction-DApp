import blockchainConfig from '@config/blockchain.config'
import { VehicleModule } from '@http/vehicle/vehicle.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [ConfigModule.forRoot({
        load: [
            blockchainConfig
        ],
    }),
    VehicleModule
    ]})
export class AppModule {}
