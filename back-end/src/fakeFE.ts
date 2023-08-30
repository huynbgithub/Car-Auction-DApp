// import web3, { HttpProvider, Transaction } from 'web3'
// import abi from '../src/abi/vehicleFactoryContractAbi'


// const privateKey = 'fce31876fd120cc8d86f7c5af2c045575da854ed3a5340852bbabb0324c0fb2c'
// const privateKeyBuffer = Buffer.from(privateKey, 'hex')

// const web3Instance = new web3(new HttpProvider('https://api.baobab.klaytn.net:8651'))

// const account = web3Instance.eth.accounts.privateKeyToAccount(privateKeyBuffer)

// const contract = new web3Instance.eth.Contract(abi, '0x9E6fBe9A57Ce988A2a81293195e79D8B43f60D9a')

// web3Instance.eth.getTransactionCount(account.address, 'latest').then(
//     console.log
// )

// const tx: Transaction = {
//     nonce: 14r,
//     to: '0x9E6fBe9A57Ce988A2a81293195e79D8B43f60D9a',
//     gas: 10000000,
//     gasPrice: web3.utils.toWei(50, 'gwei'),
//     data: contract.methods.getDeployedVehicleDatas().call(),
//     value: 1000000000000000000
// }

// web3Instance.eth.accounts.signTransaction(tx, privateKeyBuffer).then(signed => web3Instance.eth.sendSignedTransaction(signed.rawTransaction).then(console.log))