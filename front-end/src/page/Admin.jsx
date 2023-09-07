import React, { useState, useEffect, useContext, useRef } from "react";
import { getDeployedVehicleDatas } from '../contracts/VehicleFactoryContract'
import { Web3Context } from "../App";
import AdminVehicleCard from '../components/AdminVehicleCard'
import NotificationAlert from '../components/NotificationAlert'
import { Dropdown } from 'react-bootstrap';

export default function Admin() {

    const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);

    const [cars, setCars] = useState(null);
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        loadCars();
    }, [cars]);

    async function loadCars() {
        const carsData = await getDeployedVehicleDatas(web3, account).catch(error => console.log(error));
        setCars(carsData);
    }

    const notificationRef = useRef(null)
    const enableShow = (alert) => (notificationRef.current).setShow(alert)

    return (
        <div className="container-fluid">
            <div className="container-fluid p-5 bg-light text-danger text-center">
                <h1>Welcome Admin</h1>
                <p>Car Approval Management</p>
            </div>
            <div className="mt-3 row">
                <NotificationAlert
                    ref={notificationRef}
                />
                <div>
                    <Dropdown className="float-end">
                        <Dropdown.Toggle variant='outline-success' id='dropdown'>
                            <span>Filter Approval Status</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={(event) => {
                                    setFilter(false)
                                }}
                            >
                                Not Approved
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={(event) => {
                                    setFilter(true)
                                }}
                            >
                                Approved
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {cars && cars.map((car, index) => (
                    (car.isApproved == filter &&
                        <div className="col-3 mt-3" key={index}>
                            <AdminVehicleCard data={car} />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
