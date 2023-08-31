import React, { useContext, useState, useEffect } from 'react';
import { Web3 } from 'web3';
import { createVehicle } from "../utils/contracts/VehicleFactoryContract.js"
import { Web3Context } from '../App.js';
import { storage } from '../firebase.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function PostCar() {
    const { web3 } = useContext(Web3Context)
    const [formData, setFormData] = useState({
        deposit: 0,
        ownerFullName: '',
        ownerAddress: '',
        brand: '',
        vehicleType: '',
        color: '',
        seatCapacity: 0,
        origin: '',
        licensePlate: '',
        engineNumber: '',
        chassisNumber: '',
        modelCode: '',
        capacity: 0,
        firstRegistrationDate: 0,
        startingPrice: 0,
        vehicleImages: []
    });

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        if (type == "file") {
            const newImages = Array.from(files);
            setFormData((prevData) => ({ ...prevData, [name]: newImages }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const storagePromises = formData.vehicleImages.map((image) => {
            const storageRef = ref(storage, `images/${image.name}`);
            return uploadBytes(storageRef, image);
        });

        Promise.all(storagePromises)
            .then((snapshots) => {
                const imageUrls = [];

                snapshots.forEach((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        imageUrls.push(url);

                        if (imageUrls.length === formData.vehicleImages.length) {
                            createVehicle(
                                formData.deposit,
                                {
                                    ownerFullName: formData.ownerFullName,
                                    ownerAddress: formData.ownerAddress,
                                    brand: formData.brand,
                                    vehicleType: formData.vehicleType,
                                    color: formData.color,
                                    seatCapacity: formData.seatCapacity,
                                    origin: formData.origin,
                                    licensePlate: formData.licensePlate,
                                    engineNumber: formData.engineNumber,
                                    chassisNumber: formData.chassisNumber,
                                    modelCode: formData.modelCode,
                                    capacity: formData.capacity,
                                    firstRegistrationDate: formData.firstRegistrationDate
                                },
                                formData.startingPrice,
                                imageUrls,
                                web3
                            )
                                .then(() => {
                                    // Success handling
                                })
                                .catch((error) => console.log(error));
                        }
                    });
                });
            })
            .catch((error) => {
                console.log("Error uploading images:", error);
            });
    };

    const brandOptions = [
        'Toyota',
        'Honda',
        'Ford',
        'Chevrolet',
    ];
    const vehicleTypeOptions = [
        'Sedan',
        'SUV',
        'Truck',
        'Van',
    ];
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Vehicle Information</legend>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="deposit">Deposit</label>
                            <input type="number" class="form-control" id="deposit" name="deposit" value={formData.deposit} onChange={handleChange} />
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="ownerAddress">Owner Address</label>
                            <input type="text" class="form-control" id="ownerAddress" name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="ownerFullName">Owner Full Name</label>
                            <input type="text" class="form-control" id="ownerFullName" name="ownerFullName" value={formData.ownerFullName} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <select className="form-select" id="brand" name="brand" value={formData.brand} onChange={handleChange}>
                                <option value="">Select a brand</option>
                                {brandOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div className="form-group">
                            <label htmlFor="vehicleType">Vehicle Type</label>
                            <select className="form-select" id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
                                <option value="">Select a vehicle type</option>
                                {vehicleTypeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div className="form-group">
                            <label htmlFor="startingPrice">Color</label>
                            <input type="text" className="form-control" name="color" value={formData.color} onChange={handleChange} />
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div className="form-group">
                            <label htmlFor="startingPrice">Origin</label>
                            <input type="text" className="form-control" name="origin" value={formData.origin} onChange={handleChange} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div className="form-group">
                            <label htmlFor="seatCapacity">Number of Seats</label>
                            <input type="number" className="form-control" name="seatCapacity" value={formData.seatCapacity} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div className="form-group">
                            <label htmlFor="licensePlate">License Plate</label>
                            <input type="text" className="form-control" id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleChange} />
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div className="form-group">
                            <label htmlFor="engineNumber">Engine Number</label>
                            <input type="text" className="form-control" id="engineNumber" name="engineNumber" value={formData.engineNumber} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="chassisNumber">Chassis Number</label>
                    <input type="text" className="form-control" id="chassisNumber" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="modelCode">Model Code</label>
                    <input type="text" className="form-control" id="modelCode" name="modelCode" value={formData.modelCode} onChange={handleChange} />
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div className="form-group">
                            <label htmlFor="capacity">Capacity</label>
                            <input type="number" className="form-control" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} />
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div className="form-group">
                            <label htmlFor="startingPrice">Starting Price</label>
                            <input type="text" className="form-control" id="startingPrice" name="startingPrice" value={formData.startingPrice} onChange={handleChange} />
                        </div>
                    </div>
                </div>



                <div class="form-group">
                    <label for="formFile" class="form-label mt-4">Your car's images</label>
                    <input multiple class="form-control" type="file" id="vehicleImages" name="vehicleImages" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
        </form>
    );
}

export default PostCar;
