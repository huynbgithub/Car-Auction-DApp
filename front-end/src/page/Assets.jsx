import React, { useState, useEffect, useContext, useRef } from "react";
import { getOwnedDeployedVehicleDatas } from '../contracts/VehicleFactoryContract'
import CreateVehicleModal from '../components/CreateVehicleModal'
import { Web3Context } from "../App";
import AssetVehicleCard from '../components/AssetVehicleCard'
import NotificationAlert from '../components/NotificationAlert'

export default function Assets() {

    const { web3 } = useContext(Web3Context);
    const { account } = useContext(Web3Context);

    const [cars, setCars] = useState(null);

    useEffect(() => {
        loadCars();
    }, [cars]);

    async function loadCars() {
        const carsData = await getOwnedDeployedVehicleDatas(web3, account).catch(error => console.log(error));
        setCars(carsData);
    }

    const notificationRef = useRef(null)
    const enableShow = (alert) => (notificationRef.current).setShow(alert)

    return (
        <div className="container-fluid">
            <div className="container-fluid p-5 bg-light text-danger text-center">
                <h1>My Assets</h1>
            </div>
            <div className="mt-3 row">
                <CreateVehicleModal />
                <NotificationAlert
                    ref={notificationRef}
                />
                {cars && cars.map((car, index) => (
                    <div className="col-3 mt-3" key={index}>
                        <AssetVehicleCard data={car} />
                    </div>
                ))}
            </div>
        </div>
    );
};
