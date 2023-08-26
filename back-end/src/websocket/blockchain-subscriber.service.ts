import { Injectable, OnModuleInit } from '@nestjs/common'
import { Web3Service } from '@blockchain/web3.service'
import blockchainConfig from '@config/blockchain.config'
import { CreateAuctionRoundEventLog, CreateVehicleEventLog } from '@defined-types/contract.type'
import { AbiInput } from 'web3'

@Injectable()
export class BlockchainSubscriberService implements OnModuleInit {
    constructor(private readonly web3Service: Web3Service) {}

    onModuleInit() {
        this.setupCreateVehicleEventListeners()
       // this.setupCreateAuctionRoundEventListeners()
    }

    async setupCreateVehicleEventListeners() {
        console.log('Listening to event CreateVehicle(address ownerAddress, address contractAddress)')

        const web3 = this.web3Service.getWebsocketWeb3Instance()

        const subscription = await web3.eth.subscribe('logs', {
            address: [blockchainConfig().vehicleFactoryAddress],
            topics: [blockchainConfig().createVehicleTopic],
        })

        subscription.on('connected', connected => console.dir({connected}, { depth: null}))
        subscription.on('data', data => {
          
            const abiInputs: AbiInput[] = [
                { type: 'address', name: 'ownerAddress' },
                { type: 'address', name: 'contractAddress' }
            ]

            const decodedParameters = web3.eth.abi.decodeParameters(abiInputs, data.data)

            const log: CreateVehicleEventLog = {         
                address: data.address,
                name: 'CreateVehicle(address ownerAddress, address contractAddress)',
                params: {
                    ownerAddress: decodedParameters.ownerAddress as string,
                    contractAddress: decodedParameters.contractAddress as string,
                },
                transactionHash: data.transactionHash
            }

            console.log(log)
        })
        subscription.on('error', error => console.dir(error, {depth: null}))
    }

    async setupCreateAuctionRoundEventListeners() {
        console.log('Listening to event CreateAuctionRound(address auctioneerAddress, address vehicleContractAddress, uint32 index, uint quantity)')

        const web3 = this.web3Service.getWebsocketWeb3Instance()

        const subscription = await web3.eth.subscribe('logs', {
            address: [blockchainConfig().vehicleFactoryAddress],
            topics: [blockchainConfig().createAuctionRoundTopic],
        })

        subscription.on('connected', connected => console.dir({connected}, { depth: null}))
        subscription.on('data', data => {
        
            const abiInputs: AbiInput[] = [
                { type: 'address', name: 'auctioneerAddress' },
                { type: 'address', name: 'vehicleContractAddress' },
                { type: 'uint32', name: 'index'},
                { type: 'uint', name: 'quantity'}
            ]

            const decodedParameters = web3.eth.abi.decodeParameters(abiInputs, data.data)

            const log: CreateAuctionRoundEventLog = {         
                address: data.address,
                name: 'CreateAuctionRound(address auctioneerAddress, address vehicleContractAddress, uint32 index, uint quantity)',
                params: {
                    auctioneerAddress: decodedParameters.auctioneerAddress as string,
                    vehicleContractAddress: decodedParameters.vehicleContractAddress as string,
                    index: decodedParameters.index as number,
                    quantity: decodedParameters.quantity as string
                },
                transactionHash: data.transactionHash
            }

            console.log(log)
        })
        subscription.on('error', error => console.dir(error, {depth: null}))
    }
}