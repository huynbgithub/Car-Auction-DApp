import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Web3Context } from "../App";

export default function AdminNavbar() {
    const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            navigate(`/home`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
                <h1 className="navbar-brand text-danger">FutureV Car Auction</h1>
                <nav className="navbar navbar-expand-sm justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Car Management</Link>
                        </li>
                    </ul>
                </nav>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};
