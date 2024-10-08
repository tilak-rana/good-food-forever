import React from 'react';
import navHook from './navHook';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicInput: null
        };
    }

    handleLoginClick = () => {
        this.props.navigate('/login');
    };

    handleSignupClick = () => {
        this.props.navigate('/signup');
    };

    handleLogoutClick = () => {
        // Clear user data and profile picture input
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userProfilePic');

        this.setState({ 
            profilePicInput: null 
        });

        // Trigger the onLogout prop to update the parent component's state
        this.props.onLogout();

        // Redirect to the home page after logout
        this.props.navigate('/');
    };

    handleProfilePicClick = () => {
        if (this.fileInput) {
            this.fileInput.click();
        }
    };

    handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    profilePicInput: reader.result
                });
                localStorage.setItem('userProfilePic', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    render() {
        const { isLoggedIn, userName, userProfilePic } = this.props;
        const { profilePicInput } = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                <div className="container-fluid justify-content-end">
                    <div id="menu" className="d-flex">
                        {isLoggedIn ? (
                            <>
                                <img
                                    src={profilePicInput || userProfilePic || './assets/default-profile.png'}
                                    alt="Profile"
                                    className="rounded-circle mt-2"
                                    style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                                    onClick={this.handleProfilePicClick}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={(input) => this.fileInput = input}
                                    onChange={this.handleProfilePicChange}
                                    style={{ display: 'none' }}
                                />
                                <span className="text-dark fs-3 ms-2 mt-2 me-4 mb-1 fw-bold">{userName}</span>
                                <button
                                    className="btn btn-success text-light fs-4 ms-2 pd-2"
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
        );
    }
}

export default navHook(Navbar);
