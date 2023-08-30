import React from "react";
import web3, { HttpProvider } from "web3";


export const getWeb3Instance = () => {
    return new web3(new HttpProvider('https://api.baobab.klaytn.net:8651'))
}