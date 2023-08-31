import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Detail() {
  const { address } = useParams();

  const [car, setCar] = useState({
    address: "",
    deposit: "",
    props: {
      ownerFullName: "",
      ownerAddress: "",
      brand: "",
      vehicleType: "",
      color: "",
      seatCapacity: 0,
      origin: "",
      licensePlate: "",
      engineNumber: "",
      chassisNumber: "",
      modelCode: "",
      capacity: 0,
      firstRegistrationDate: ""
    },
    vehicleImages: [],
    startingPrice: "",
  });


  async function loadCar() {
    console.log("loadCar is running...");

    await axios.get(`http://localhost:3001/api/vehicle/get-vehicle-data/${address}`)
      .then(res => {
        console.log("API Response:", res.data);
        const carData = res.data;
        setCar(carData);
      })
      .catch(error => console.log(error));
  }

  const tableDetail = [
    {
      title: "Contract Address",
      info: car.address,
    },
    {
      title: "Deposit",
      info: car.deposit,
    },
    {
      title: "Owner Full Name",
      info: car.props.ownerFullName,
    },
    {
      title: "Owner Address",
      info: car.props.ownerAddress,
    },
    {
      title: "Brand",
      info: car.props.brand,
    },
    {
      title: "Vehicle Type",
      info: car.props.vehicleType,
    },
    {
      title: "Color",
      info: car.props.color,
    },
    {
      title: "Seat Capacity",
      info: car.props.seatCapacity,
    },
    {
      title: "Origin",
      info: car.props.origin,
    },
    {
      title: "License Plate",
      info: car.props.licensePlate,
    },
    {
      title: "Engine Number",
      info: car.props.engineNumber,
    },
    {
      title: "Chassis Number",
      info: car.props.chassisNumber,
    },
    {
      title: "Model Code",
      info: car.props.modelCode,
    },
    {
      title: "Capacity",
      info: car.props.capacity,
    },
    {
      title: "First Registration Date",
      info: car.props.firstRegistrationDate,
    },
    {
      title: "Starting Price",
      info: car.startingPrice,
    },
  ];

  useEffect(() => {
    loadCar();
  }, []);

  return (
    <div className="container-fluid">
      <div class="container-fluid p-3 bg-light">
        <h3><a target="blank" href={`https://baobab.scope.klaytn.com/account/${car.address}`}>View on Chain</a></h3>
      </div>
      <div className="container mt-3 row">
        <div className="col-6">
          <div id="demo" className="carousel slide" data-bs-ride="carousel">
            {/* Indicators/dots */}
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#demo" data-bs-slide-to={0} className="active" />
              <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
              <button type="button" data-bs-target="#demo" data-bs-slide-to={2} />
            </div>
            {/* The slideshow/carousel */}
            <div className="carousel-inner">
              {car.vehicleImages &&
                car.vehicleImages.map((item, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <img
                      src={item}
                      alt="car"
                      className="d-block"
                      style={{ width: "100%", height: "500px" }}
                    />
                  </div>
                ))}
            </div>
            {/* Left and right controls/icons */}
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" />
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
              <span className="carousel-control-next-icon" />
            </button>
          </div>
        </div>
        <div className="col-6">
          <div className="card" style={{ width: 600 }}>
            <div className="card-body">
              <table className="table table-bordered">
                <tbody>
                  {tableDetail.map((i) => (
                    <tr>
                      <th>{i.title}</th>
                      <td>{i.info}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link to="/detail" className="btn btn-success float-end">Auction Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail