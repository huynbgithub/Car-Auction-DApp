import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { Web3Context } from "../App";

export default function Navbar() {

    const { web3, setWeb3 } = useContext(Web3Context);

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

                await setWeb3(web3)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        onConnect();
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
                        {web3 && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/wallet">Wallet</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/postcar">Post Car</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/mycar">My Car</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                {!web3 && (
                    <button className="btn btn-danger" onClick={onConnect}>Connect Wallet</button>
                )}
                {web3 && (
                    <button className="btn btn-secondary">Wallet Connected Successfully</button>
                )}
            </div>
        </nav >
    );
};