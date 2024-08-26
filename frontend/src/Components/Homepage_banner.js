import React from 'react';
import axios from 'axios';
import navHook from './nav';

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: [],
            InputText: undefined,
            suggestion: [],
            isLoggedIn: false,
            userName: '',
            userProfilePic: ''
        };
    }

    componentDidMount() {
        // Check if the user is already logged in, e.g., by checking local storage

        const token = localStorage.getItem('authToken');
        const userName = localStorage.getItem('userName');
        // console.log("componentdidmount success",userName);
        if (token && userName) {
            this.setState({ 
                isLoggedIn: true, 
                userName,
            });
        }
    }

    handleLocationChange = (e) => {
        const locationId = e.target.value;
        sessionStorage.setItem('locationId', locationId);
        axios({
            url: `http://localhost:5500/restaurant/${locationId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants });
            })
            .catch(err => console.log(err));
    }

    handleLoginClick = () => {
        this.props.navigate('/login');
    };

    handleSignupClick = () => {
        this.props.navigate('/signup');
    };

    handleLogoutClick = () => {
        // Clear local storage or any other stored user info
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName')

        // Update state
        this.setState({ isLoggedIn: false, userName: ''});
        this.props.navigate('/');  // Redirect to home page after logout
    };

    handleLoginSuccess = (userName) => {
        // This function should be called after a successful login or signup
        this.setState({ 
            isLoggedIn: true, 
            userName, 
        });
        console.log("handellogin success",userName);
        // localStorage.setItem('authToken', 'your-auth-token'); // Store your token
        localStorage.setItem('userName', userName);
        this.props.navigate('/');  // Redirect to home page
    };

    handInputChange = (event) => {
        const { restaurant } = this.state;
        let InputText = event.target.value;
        let suggestion = [];
        suggestion = restaurant.filter(item => item.name.toLowerCase().includes(InputText.toLowerCase()));
        this.setState({ suggestion, InputText });
    }

    selectRestaurant = (e) => {
        this.props.navigate(`/resDetails?restaurant=${e}`);
    }

    showSuggestion = () => {
        const { suggestion, InputText } = this.state;
        if (suggestion.length === 0 && InputText === undefined) {
            return null;
        }
        if (suggestion.length > 0 && InputText === '') {
            return null;
        }
        if (suggestion.length === 0 && InputText) {
            return <li>NO search Results found!</li>
        }
        return suggestion.map((data, index) => (
            <li className="list-group-item text-start p-1" key={index} onClick={() => this.selectRestaurant(data._id)}>
                <img className="sugImg" src={data.thumb} alt="not found" />
                <span className="text-secondary fs-5">{`${data.name}`}</span><br />
                <span className="sugadd">{`${data.locality}`}</span>
            </li>
        ));
    }

    render() {
        const { locationData } = this.props;
        const { isLoggedIn } = this.state;
        // console.log(userName);
        return (
            <div className="bg-light">
                <div id="header">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                        <div className="container-fluid justify-content-end">
                            <div id="menu" className="d-flex">
                                {isLoggedIn ? (
                                    <>
                                        <img
                                            src="./assets/nightlife.png"
                                            alt="Profile"
                                            className="rounded-circle mt-1"
                                            style={{ width: '30px', height: '30px' }}
                                        />
                                        <span className="text-light ms-2 mt-2 me-4">Tilak Rana</span>
                                        <button
                                            className="btn btn-transparent text-light f-3 ms-2"
                                            type="submit"
                                            onClick={this.handleLogoutClick}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-transparent text-light f-3"
                                            type="submit"
                                            onClick={this.handleLoginClick}
                                        >
                                            Login
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-light ms-2"
                                            onClick={this.handleSignupClick}
                                        >
                                            Create an account
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>

                    <div id="banner">
                        <div className="container text-center">
                            <div className="row justify-content-center align-items-center">
                                <div id="banner-logo" className="bg-light text-center align-items-center rounded-circle mx-auto">
                                    <span id="logo-name" className="text-danger fw-bold">t!</span>
                                </div>
                                <div id="banner-title" className="mt-3">
                                    <h1 id="title" className="text-light">Find the best restaurants, cafés, and bars</h1>
                                </div>
                                <div id="banner-form" className="mt-4">
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-md-4 col-sm-6 mb-3">
                                                <select className="form-select form-select-lg text-secondary rounded-0" onChange={this.handleLocationChange}>
                                                    <option value="0" disabled selected>Please type a location</option>
                                                    {
                                                        locationData.map((item) => {
                                                            return (
                                                                <option value={item.city_id}>{`${item.name}`}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-text bg-light rounded-0"><i className="fa-solid fa-magnifying-glass"></i></span>
                                                    <input type="search" className="form-control text-dark rounded-0 border-0 shadow-none"
                                                        placeholder="Search for restaurants" onChange={this.handInputChange} />
                                                </div>
                                                <div className="bg-light">
                                                    <ul className="list-group bg-light border-0">{this.showSuggestion()}</ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default navHook(Banner);
