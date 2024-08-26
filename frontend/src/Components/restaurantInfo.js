// src/components/RestaurantInfo.js

import React from 'react';
// import './RestaurantInfo.css'; // Import the CSS file for styling

const RestaurantInfo = (props) => {
    const {name, contact_number,address} = props.data;
    
  return (
    
    <section className="container my-4">
        <div className="row">
            {/* <div className="col-12 col-md-6">
                
            </div> */}
            <div className="col-12 col-md-6 mt-4 mt-md-0">
            {/* <img src="./assets/lunch.png" alt="Gallery Image" className="w-100 rounded"/> */}
                <h2>{name}</h2>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active text-decoration-none" id="nav-overview-tab" data-bs-toggle="tab" data-bs-target="#nav-overview" type="button" role="tab">Overview</button>
                        <button className="nav-link text-decoration-none" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab">Contact</button>
                    </div>
                </nav>
                <div className="tab-content mt-3" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-overview" role="tabpanel">
                        <p>About this place</p>
                        <ul className="list-unstyled">
                            <li><strong>Cuisine:</strong> Bakery, Fast-food</li>
                            <li><strong>Average Cost:</strong> ₹700 for two people (approx.)</li>
                        </ul>
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel">
                        <p className="phone-number"><strong>Phone Number:</strong> +91 {contact_number}</p>
                        <p className="address"><strong>Address:</strong> {address}</p>
                    </div>
                </div>
                <button className="btn btn-danger w-100 mt-3">Place Online Order</button>
            </div>
        </div>
    </section>
  );
};

export default RestaurantInfo;
