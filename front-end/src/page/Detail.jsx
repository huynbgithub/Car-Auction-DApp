import React from 'react'
import { Link } from "react-router-dom";

function Detail() {
  return (
    <div className="container-fluid">
      <div class="container-fluid p-3 bg-light">
        <h3>Name</h3>
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
              <div className="carousel-item active">
                <img src="https://www.w3schools.com/bootstrap5/la.jpg" alt="Los Angeles" className="d-block" style={{ width: '100%' }} />
              </div>
              <div className="carousel-item">
                <img src="https://www.w3schools.com/bootstrap5/chicago.jpg" alt="Chicago" className="d-block" style={{ width: '100%' }} />
              </div>
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
                  <tr>
                    <th>Info 1</th>
                    <td>info1</td>
                  </tr>
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