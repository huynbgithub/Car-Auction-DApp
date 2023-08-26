export default () => ({
    privateKey: process.env.PRIVATE_KEY,
    httpRpcUrl: process.env.HTTP_RPC_URL,
    websocketRpcUrl: process.env.WEBSOCKET_RPC_URL,
    vehicleFactoryAddress: process.env.VEHICLE_FACTORY_ADDRESS
})