import React from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import Navbar
import navHook from './navHook';

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: [],
            InputText: '',
            suggestion: [],
            isLoggedIn: false,
            userName: '',
            userProfilePic: '', // URL of the profile picture
            profilePicInputKey: Date.now() // Key to force re-render of the input
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('authToken');
        const userName = localStorage.getItem('userName');
        const userProfilePic = localStorage.getItem('userProfilePic'); // Assuming profile pic is stored

        if (token && userName) {
            this.setState({ 
                isLoggedIn: true, 
                userName,
                userProfilePic: userProfilePic || './assets/default-profile.png' // Use default image if not set
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

    handInputChange = (event) => {
        const { restaurant } = this.state;
        let InputText = event.target.value;
        let suggestion = restaurant.filter(item => item.name.toLowerCase().includes(InputText.toLowerCase()));
        this.setState({ suggestion, InputText });
    }

    selectRestaurant = (e) => {
        this.props.navigate(`/resDetails?restaurant=${e}`);
    }

    showSuggestion = () => {
        const { suggestion, InputText } = this.state;
        if (suggestion.length === 0 && InputText === '') {
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

    handleProfilePicClick = () => {
        this.fileInput.click(); // Trigger file input click
    }

    handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePic', file);

            try {
                const response = await axios.post('http://localhost:5500/uploadProfilePic', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    const profilePicUrl = response.data.profilePicUrl;
                    localStorage.setItem('userProfilePic', profilePicUrl);
                    this.setState({ userProfilePic: profilePicUrl, profilePicInputKey: Date.now() }); // Update profile pic and force re-render
                } else {
                    alert('Failed to upload profile picture.');
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
                alert('An error occurred during the upload.');
            }
        }
    }

    handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userProfilePic');

        this.setState({
            isLoggedIn: false,
            userName: '',
            userProfilePic: './assets/default-profile.png',
            profilePicInputKey: Date.now() // Reset the key to force re-render
        });
    }

    render() {
        const { locationData } = this.props;
        const { isLoggedIn, userName, userProfilePic } = this.state;

        return (
            <div className="bg-light HEADER">
                <Navbar 
                    isLoggedIn={isLoggedIn}
                    userName={userName}
                    userProfilePic={userProfilePic}
                    onLogout={this.handleLogout} // Pass the handleLogout function as a prop
                />

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
                                                {locationData.map((item, index) => (
                                                    <option key={index} value={item.city_id}>{`${item.name}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="input-group input-group-lg">
                                                <span className="input-group-text bg-light rounded-0"><i className="fa-solid fa-magnifying-glass"></i></span>
                                                <input 
                                                    type="search" 
                                                    className="form-control text-dark rounded-0 border-0 shadow-none"
                                                    placeholder="Search for restaurants" 
                                                    onChange={this.handInputChange} 
                                                />
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

                {/* Hidden file input for profile picture upload */}
                <input
                    type="file"
                    ref={(input) => this.fileInput = input}
                    key={this.state.profilePicInputKey}
                    style={{ display: 'none' }}
                    onChange={this.handleProfilePicChange}
                    accept="image/*"
                />
            </div>
        );
    }
}

export default navHook(Banner);
