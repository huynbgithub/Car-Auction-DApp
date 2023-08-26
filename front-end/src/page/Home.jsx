import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="container-fluid">
            <div class="container-fluid p-5 bg-light text-danger text-center">
                <h1>Car Auction Website</h1>
                <p>Klayton Blockchain Hackathon</p>
            </div>
            <div className="container mt-3 row">
                <div className="col-3 mt-3">
                    <div className="card" style={{ width: 300 }}>
                        <img className="card-img-top" src alt="Card image" style={{ width: '100%', height: 200 }} />
                        <div className="card-body">
                            <h4 className="card-title">Name</h4>
                            <p className="card-text">Description</p>
                            <Link to="/detail" className="btn btn-success">Detail</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
