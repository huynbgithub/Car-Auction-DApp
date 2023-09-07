import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";

export default function Admin() {
    const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);

    return (
        <div className="container-fluid">
            <div className="container-fluid p-5 bg-light text-danger text-center">
                <h1>Welcome Admin</h1>
            </div>
        </div>
    );
}
