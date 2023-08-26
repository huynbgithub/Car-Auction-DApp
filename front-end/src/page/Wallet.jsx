import React from "react";

export default function Wallet() {

    return (
        <div className="container">
            <div className="container">
                <h6>Wallet Account</h6>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Address</th>
                            <td>{localStorage.getItem("walletAddress")}</td>
                        </tr>
                        <tr>
                            <th>Balance</th>
                            <td>{localStorage.getItem("walletBalance")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
