import { Module } from '@nestjs/common'
import { BlockchainSubscriberService } from './blockchain-subscriber.service'
import { Web3Service } from '@blockchain/web3.service'

@Module({
    imports: [],
    providers: [
        Web3Service,
        BlockchainSubscriberService
    ],
    controllers: []
})

export class WebsocketModule {}