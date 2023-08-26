import blockchainConfig from '@config/blockchain.config'
import { VehicleModule } from '@http/vehicle/vehicle.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { WebsocketModule } from '@websocket/websocket.module'

@Module({
    imports: [ConfigModule.forRoot({
        load: [
            blockchainConfig
        ],
    }),
    VehicleModule,
    WebsocketModule
    ]})
export class AppModule {}
