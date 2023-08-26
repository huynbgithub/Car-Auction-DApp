import { Injectable } from '@nestjs/common'
import { Web3Service } from './web3.service'
import blockchainConfig from '@config/blockchain.config'
import {Web3Account} from 'web3-eth-accounts'

@Injectable()
export class ServerWalletService {
    constructor(
        private readonly web3Service: Web3Service,
    ) { }
    
    getServerAccount(): Web3Account{
        return this.web3Service.getHttpWeb3Instance().eth.accounts.privateKeyToAccount(
            blockchainConfig().privateKey
        )
    }
}