export default () => ({
    privateKey: process.env.PRIVATE_KEY,
    httpRpcUrl: process.env.HTTP_RPC_URL,
    websocketRpcUrl: process.env.WEBSOCKET_RPC_URL,
    vehicleFactoryAddress: process.env.VEHICLE_FACTORY_ADDRESS,

    createVehicleTopic: process.env.CREATE_VEHICLE_TOPIC,
    createAuctionRoundTopic : process.env.CREATE_AUCTION_ROUND_TOPIC,
    returnFundsToAuctioneerTopic : process.env.RETURN_FUNDS_TO_AUCTIONEER_TOPIC
})