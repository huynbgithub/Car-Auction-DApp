import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";


export default function Home() {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        loadCars();
    }, []);

    function loadCars() {
        console.log("loadCars is running...");

        axios.get(``)
            .then(res => {
                console.log("API Response:", res.data);
                const carsData = res.data;
                setCars(carsData);

            })
            .catch(error => console.log(error));
    }

    return (
        <div className="container-fluid">
            <div class="container-fluid p-5 bg-light text-danger text-center">
                <h1>Car Auction Website</h1>
                <p>Klayton Blockchain Hackathon</p>
            </div>
            <h1></h1>
            <div className="container mt-3 row">
                {cars.map((item) => (
                    <div className="col-3 mt-3" key={item.id}>
                        <div className="card" style={{ width: 300 }}>
                            <img className="card-img-top" src={item.vehicleImages.length > 0 ? item.vehicleImages[0] : ''} alt="Card image" style={{ width: '100%', height: 250 }} />
                            <div className="card-body">
                                <h6 className="card-title">
                                    <a target="blank" href={`https://baobab.scope.klaytn.com/account/${item.address}`}>{item.address}</a>
                                </h6>
                                <p className="card-text">Brand: {item.props.brand}</p>
                                <p className="card-text">Starting Price: ${item.startingPrice}</p>
                                <Link to={`/detail/${item.address}`} className="btn btn-success float-end">Detail</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};