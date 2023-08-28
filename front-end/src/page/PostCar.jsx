import React, { useState } from 'react';

function PostCar() {
    const [formData, setFormData] = useState({
        deposit: '',
        ownerFullName: '',
        ownerAddress: '',
        brand: '',
        vehicleType: '',
        color: '',
        seatCapacity: '',
        origin: '',
        licensePlate: '',
        engineNumber: '',
        chassisNumber: '',
        modelCode: '',
        capacity: '',
        firstRegistrationDate: '',
        startingPrice: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
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
                            <input type="text" class="form-control" id="deposit" name="deposit" value={formData.deposit} onChange={handleChange} />
                        </div>
                    </div>

                    <div class="col-md-6">
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
                    <input class="form-control" type="file" id="formFile" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
        </form>
    );
}

export default PostCar;
