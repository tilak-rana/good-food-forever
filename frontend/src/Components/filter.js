import React from "react";
import '../Styles/filter.css';
import axios from "axios";
import navHook from './nav';


class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            restaurants: [],
            location: undefined,
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1
        }
    }
    componentDidMount() {
        // console.log("Componentdidmount ")
        axios({
            url: 'http://localhost:5500/location',
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {

                // console.log("axios success" ,res.data.loc)
                this.setState({ locations: res.data.loc })
            })
            .catch((err) => console.log(err))

        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {

                // console.log("axios success" ,res.data)
                this.setState({ restaurants: res.data.restaurants })
            })
            .catch((err) => console.log(err))
    }
    handleLocationChange = (event) => {
        const location = event.target.value;
        const { sort, lcost, hcost, page } = this.state;
        const filterobj = {
            location: location,
            lcost,
            hcost,
            sort,
            page
        }
        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterobj
        })
            .then(res => {

                // console.log("axios success" ,res.data)
                this.setState({ restaurants: res.data.restaurants, location })
            })
            .catch((err) => console.log(err))
    }
    handleSortChange = (sort) => {
        const { location, lcost, hcost, page } = this.state;
        const filterobj = {
            location: location,
            lcost,
            hcost,
            sort,
            page
        }
        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterobj
        })
            .then(res => {

                // console.log("axios success" ,res.data)
                this.setState({ restaurants: res.data.restaurants, sort })
            })
            .catch((err) => console.log(err))
    }
    handlePageChange = (page) => {
        const { location, sort, lcost, hcost } = this.state;
        const filterobj = {
            location: location,
            lcost,
            hcost,
            sort,
            page
        }
        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterobj
        })
            .then(res => {

                // console.log("axios success" ,res.data)
                this.setState({ restaurants: res.data.restaurants, page })
            })
            .catch((err) => console.log(err))
    }
    handleCostChange = (lcost, hcost) => {
        const { location, sort, page } = this.state;
        const filterobj = {
            location: location,
            lcost,
            hcost,
            sort,
            page
        }
        axios({
            url: 'http://localhost:5500/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterobj
        })
            .then(res => {

                // console.log("axios success" ,res.data)
                this.setState({ restaurants: res.data.restaurants, lcost, hcost })
            })
            .catch((err) => console.log(err))
    }
    handleNavigate=(e)=>{
            this.props.navigate(`/resDetails?restaurant=${e}`);
    }
    handleLoginClick = () => {
        this.props.navigate('/login');
    };

    handleSignupClick = () => {
        this.props.navigate('/signup');
    };
    render() {

        const { locations, restaurants } = this.state;
        // console.log("render success", restaurants);
        return (
            <div>
                <div id="navbar">
                    <div className="container-fluid bg-danger d-flex justify-content-between align-items-center py-2">
                        <div id="logo">
                            <span id="logo-name" className="text-danger fw-bold">t!</span>
                        </div>
                        <div id="nav" className="d-flex">
                            <button type="button" className="btn btn-light text-danger me-2" onClick={this.handleLoginClick}>Login</button>
                            <button type="button" className="btn btn-light text-danger" onClick={this.handleSignupClick}>Create an account</button>
                        </div>
                    </div>
                </div>
                <div className="container mt-3 mb-4">
                    <h1 className="h4 mb-4">Breakfast Places in Mumbai</h1>

                    {/* <!-- Filter Button for Mobile View --> */}
                    <button id="filter-btn" className="btn btn-light btn-outline-dark">
                        Filters / Sort
                    </button>

                    <div className="row">
                        <div className="col-lg-4 col-md-5 mb-4" id="filters">
                            <div className="card border-0 rounded-0">
                                <div className="card-body">
                                    <h4 className="card-title mb-1">Filters</h4>
                                    <p className="card-subtitle mb-2">Select Location</p>
                                    <select name="location" id="filter-select" className="form-select" onChange={this.handleLocationChange}>
                                        <option value="0" disabled selected >Please type a location</option>

                                        {
                                            locations.map((item) => {
                                                return (
                                                    <option value={item.city_id}>{`${item.name}`}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Cuisine</h4>
                                    <div><input type="checkbox" name="cuisines" /> North Indian</div>
                                    <div><input type="checkbox" name="cuisines" checked /> South Indian</div>
                                    <div><input type="checkbox" name="cuisines" checked /> Chinese</div>
                                    <div><input type="checkbox" name="cuisines" /> Fast Food</div>
                                    <div><input type="checkbox" name="cuisines" /> Street Food</div>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Cost For Two</h4>
                                    <div><input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)} /> Less than ₹500</div>
                                    <div><input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)} /> ₹500 to ₹1000</div>
                                    <div><input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)} /> ₹1000 to ₹1500</div>
                                    <div><input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)} /> ₹1500 to ₹2000</div>
                                    <div><input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 5000)} /> ₹2000+</div>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Sort</h4>
                                    <div><input type="radio" name="sort" onChange={() => this.handleSortChange(1)} /> Price low to high</div>
                                    <div><input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} /> Price high to low</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-7">
                            <div className="row mb-4">
                                {
                                   restaurants.length !== 0 ? 
                                   restaurants.map((each,index) => {
                                        return (
                                            <div className="col-12" key={index} onClick={()=>this.handleNavigate(each._id)}>
                                                <div className="card border-0">
                                                    <div className="row g-0">
                                                        <div className="col-md-3 col-4">
                                                            <img src={each.thumb} className="img-fluid mt-3 ms-3" alt="..." />
                                                        </div>
                                                        <div className="col-md-9 col-8">
                                                            <div className="card-body ms-3 mt-2">
                                                                <h2 className="card-title h5">{each.name}</h2>
                                                                <p className="card-subtitle mb-1 text-muted">{each.city_name}</p>
                                                                <p className="small">{each.address}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-footer bg-light border-0 border-top">
                                                        <div>CUISINES: {each.Cuisine.map((r) => `${r.name}  `)}</div>
                                                        <div>COST FOR TWO: ₹{each.cost}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : 
                                    <div className="text-secondary fs-1">No Restaurants Available...</div>
                                } 
                            </div>

                            <div className="row">
                                <div className="col-12 text-center">
                                    <button className="btn btn-outline-dark mx-1" onClick={() => this.handlePageChange(1)}>1</button>
                                    <button className="btn btn-outline-dark mx-1" onClick={() => this.handlePageChange(2)}>2</button>
                                    <button className="btn btn-outline-dark mx-1" onClick={() => this.handlePageChange(3)}>3</button>
                                    <button className="btn btn-outline-dark mx-1" onClick={() => this.handlePageChange(4)}>4</button>
                                    <button className="btn btn-outline-dark mx-1" onClick={() => this.handlePageChange(5)}>5</button>
                                </div>
                            </div>
                        </div>
                        </div>

                    </div>
                </div>
                );
    }
}

export default navHook(Filter);
