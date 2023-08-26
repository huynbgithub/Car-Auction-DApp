import blockchainConfig from '@config/blockchain.config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [ConfigModule.forRoot({
        load: [
            blockchainConfig
        ],
    })],
    controllers: [],
    providers: [
    ],
})
export class AppModule {}
