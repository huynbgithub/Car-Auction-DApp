import web3 from 'web3'

export const exponent = Math.pow(10, 18)
export const reciprocalExponent = 1 / Math.pow(10, 18)

export const gas = 30000000
export const gasPrice = web3.utils.toWei(25, 'gwei')