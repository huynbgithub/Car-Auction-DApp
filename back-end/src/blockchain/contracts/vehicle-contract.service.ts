import { Injectable } from '@nestjs/common'
import { Web3Service } from '../web3.service'
import vehicleContractAbi from '../../abi/vehicleContractAbi'
import { Address } from 'web3'
import { VehicleData } from '@defined-types/contract.type'

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
        return {
            address: result.vehicleAddress.toString(),
            deposit: result.deposit.toString(),
            props: {
                ownerFullName: result.props.ownerFullName.toString(),
                ownerAddress: result.props.ownerAddress.toString(),
                brand: result.props.brand.toString(),
                vehicleType: result.props.vehicleType.toString(),
                color: result.props.color.toString(),
                seatCapacity: Number.parseInt(result.props.seatCapacity.toString()),
                origin: result.props.origin.toString(),
                licensePlate: result.props.licensePlate.toString(),
                engineNumber: result.props.engineNumber.toString(),
                chassisNumber: result.props.chassisNumber.toString(),
                modelCode: result.props.modelCode.toString(),
                capacity: Number.parseInt(result.props.capacity.toString()),
                firstRegistrationDate: result.props.firstRegistrationDate.toString()
            },
            startingPrice: result.startingPrice.toString(),
            vehicleImages: result.vehicleImages
        }
    }

    // async getVehicleProperties(contractAddress: Address){
    //return (await this.getVehicleContract(contractAddress).methods.getData().call()).
    // }
}