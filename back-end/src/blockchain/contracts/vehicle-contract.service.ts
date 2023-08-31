import { Injectable } from '@nestjs/common'
import { Web3Service } from '../web3.service'
import vehicleContractAbi from '../../abi/vehicleContractAbi'
import { Address } from 'web3'
import { AuctionRound, VehicleData } from '@defined-types/contract.type'
import { formatAuctionRound, formatVehicleData } from '@utils/formatter'

@Injectable()
export class VehicleContractService {
    constructor(
        private readonly web3Service: Web3Service,
    ) { }

    private getVehicleContract(contractAddress: Address) {
        const web3 = this.web3Service.getHttpWeb3Instance()
        return new web3.eth.Contract(
            vehicleContractAbi,
            contractAddress
        )
    }

    async getVehicleData(contractAddress: Address): Promise<VehicleData> {
        const result = await this.getVehicleContract(contractAddress).methods.getData().call()
        return formatVehicleData(result)
    }

    async getAuctionRounds(contractAddress: Address): Promise<AuctionRound[]> {
        const response = await this.getVehicleContract(contractAddress).methods.getAuctionRounds().call()

        const results: AuctionRound[] = []
        response.forEach(auctionRound =>
            results.push(
                formatAuctionRound(auctionRound)
            )
        )
        return results
    }

    // async getVehicleProperties(contractAddress: Address){
    //return (await this.getVehicleContract(contractAddress).methods.getData().call()).
    // }
}