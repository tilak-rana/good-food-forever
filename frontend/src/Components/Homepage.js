import React from "react";
import axios from "axios";
import '../Styles/homepage.css';
import Banner from './Homepage_banner';
import QuickSearch from './Homepage_Quicksearch';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            mealtypes: []
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
                this.setState({ location: res.data.loc })
            })
            .catch((err) => console.log(err))

        axios({
            url: 'http://localhost:5500/mealtype',
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {

                // console.log("axios success" ,res.data.mealtype)
                this.setState({ mealtypes: res.data.mealtype })
            })
            .catch((err) => console.log(err))
    }
    render() {
        const { location, mealtypes } = this.state;
        // console.log("frontend ", mealtypes);
        return (
            
            <div >
                <Banner locationData={location} />
                <QuickSearch mealtypeData={mealtypes} />
            </div>
        );
    }
}

export default Home;
