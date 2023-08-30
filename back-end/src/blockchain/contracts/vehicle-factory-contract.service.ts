import { Injectable } from '@nestjs/common'
import { Web3Service } from '../web3.service'
import blockchainConfig from '@config/blockchain.config'
import vehicleFactoryContractAbi from '../../abi/vehicleFactoryContractAbi'
import { VehicleData } from '@defined-types/contract.type'

@Injectable()
export class VehicleFactoryContractService {
    constructor(
        private readonly web3Service: Web3Service,
    ) { }
    
    private getVehicleFactoryContract() {
        const web3 = this.web3Service.getHttpWeb3Instance()
        return new web3.eth.Contract(
            vehicleFactoryContractAbi, 
            blockchainConfig().vehicleFactoryAddress
        )
    }
    
    async getDeployedVehicles(){
        return await this.getVehicleFactoryContract().methods.getDeployedVehicles().call()
    }

    async getDeployedVehicleDatas(){
        const response = await this.getVehicleFactoryContract().methods.getDeployedVehicleDatas().call()
        const results: VehicleData[] = []

        response.forEach(vehicleData => 
            results.push(
                {   
                    address: vehicleData.vehicleAddress.toString(),
                    deposit: vehicleData.deposit.toString(),
                    props: {
                        ownerFullName: vehicleData.props.ownerFullName.toString(),
                        ownerAddress: vehicleData.props.ownerAddress.toString(),
                        brand: vehicleData.props.brand.toString(),
                        vehicleType: vehicleData.props.vehicleType.toString(),
                        color: vehicleData.props.color.toString(),
                        seatCapacity: Number.parseInt(vehicleData.props.seatCapacity.toString()),
                        origin: vehicleData.props.origin.toString(),
                        licensePlate: vehicleData.props.licensePlate.toString(),
                        engineNumber: vehicleData.props.engineNumber.toString(),
                        chassisNumber: vehicleData.props.chassisNumber.toString(),
                        modelCode: vehicleData.props.modelCode.toString(),
                        capacity: Number.parseInt(vehicleData.props.capacity.toString()),
                        firstRegistrationDate: vehicleData.props.firstRegistrationDate.toString()
                    },
                    startingPrice: vehicleData.startingPrice.toString(),
                    vehicleImages: vehicleData.vehicleImages
                }
            )
        )

        return results
    }
}