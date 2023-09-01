import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Web3Context } from "../App";

export default function Navbar() {

    const { setWeb3 } = useContext(Web3Context)

    const [isConnected, setIsConnected] = useState(false);

    const detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log("Non-ethereum browser detected. You should install Metamask");
        }
        return provider;
    };

    const onConnect = async () => {
        try {
            const currentProvider = detectCurrentProvider();
            if (currentProvider) {
                await currentProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currentProvider);

                console.log(setWeb3)
                setWeb3(web3)

                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0];
                localStorage.setItem("walletAddress", account);

                let ethBalance = await web3.eth.getBalance(account);
                let balance = web3.utils.fromWei(ethBalance, "ether");
                localStorage.setItem("walletBalance", balance);
                setIsConnected(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onDisconnect = () => {
        localStorage.setItem("walletBalance", null)
        localStorage.setItem("walletAddress", null)
        setIsConnected(false);
    }

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
                <h1 className="navbar-brand text-danger">FutureV Car Auction</h1>
                <nav className="navbar navbar-expand-sm justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/wallet">Wallet</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/postcar">Post Car</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mycar">My Car</Link>
                        </li>
                    </ul>
                </nav>
                {!isConnected && (
                    <button className="btn btn-danger" onClick={onConnect}>Connect Wallet</button>
                )}
                {isConnected && (
                    <button className="btn btn-secondary" onClick={onDisconnect}>Disconnect Wallet</button>
                )}
            </div>
        </nav >
    );
};