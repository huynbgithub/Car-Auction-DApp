import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Web3 from "web3";

export default function Navbar() {

    const [web3, setWeb3] = useState(null);
    const [wAddress, setWAddress] = useState(null);
    // const [wBalance, setWBalance] = useState(null);

    const handleConnectWallet = async () => {
        if (
            typeof window !== "undefined" &&
            typeof window.ethereum !== "undefined"
        ) {
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const accounts = await web3Instance.eth.getAccounts();
                setWAddress(accounts[0]);
                let balance = await web3.eth.getBalance(accounts[0]);

                localStorage.setItem("walletAddress", accounts[0]);
                localStorage.setItem("walletBalance", balance);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Not install Metamask! Please install wallet");
        }
    };

    useEffect(() => {
        handleConnectWallet();
    }, []);

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
                    </ul>
                </nav>
                {wAddress ? (
                    <button className="btn btn-secondary">Connected Successfully</button>
                ) : (
                    <button className="btn btn-danger" onClick={handleConnectWallet}>Connect Wallet</button>
                )}
            </div>
        </nav >
    );
};