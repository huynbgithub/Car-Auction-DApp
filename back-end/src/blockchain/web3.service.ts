import blockchainConfig from '@config/blockchain.config'
import { Injectable } from '@nestjs/common'
import Web3 from 'web3'

@Injectable()
export class Web3Service {
    getHttpWeb3Instance(): Web3 {
        return new Web3(
            new Web3.providers.HttpProvider(blockchainConfig().httpRpcUrl)
        )
    }

    getWebsocketWeb3Instance(): Web3{
        return new Web3(
            new Web3.providers.WebsocketProvider(blockchainConfig().websocketRpcUrl)
        )
    }
}