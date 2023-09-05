import Web3, { HttpProvider } from 'web3'

export const getHttpWeb3 = () => {
    return new Web3(new HttpProvider(process.env.REACT_APP_HTTP_RPC_URL))
}