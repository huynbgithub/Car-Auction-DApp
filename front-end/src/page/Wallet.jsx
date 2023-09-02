import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";

export default function Wallet() {
    const { web3 } = useContext(Web3Context);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        if (web3) {
            web3.eth.getAccounts()
                .then(accounts => {
                    setAccount(accounts[0]);
                    return accounts[0]; // Return the account address for the next promise
                })
                .then(account => {
                    return web3.eth.getBalance(account);
                })
                .then(ethBalance => {
                    let balance = web3.utils.fromWei(ethBalance, "ether");
                    setBalance(balance);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [web3]);

    return (
        <div className="container">
            <div className="container" style={{ width: 600 }}>
                <h6>Wallet Account</h6>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Address</th>
                            <td>{account}</td>
                        </tr>
                        <tr>
                            <th>Balance</th>
                            <td>KLAY {balance}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
