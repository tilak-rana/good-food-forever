import React from "react";
import '../Styles/resdetail.css';
import Carousel from './resimgcarousel';
import RestaurantInfo from './restaurantInfo';
import axios from "axios";
import queryString from 'query-string';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        }
    }
    componentDidMount() {
        const qs = queryString.parse(window.location.search);
        // console.log(qs);
        const { restaurant } = qs;

        axios({
            url: `http://localhost:5500/restaurants/${restaurant}`,
            method: 'Get',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {

                // console.log("axios success", res.data.restaurant);
                this.setState({ restaurants: res.data.restaurant })
            })
            .catch((err) => console.log(err))
    }
    render() {
        const { restaurants } = this.state;
        // console.log("render success", restaurants);
        return (
            <div>
                <Carousel />
                {
                    restaurants.map((item) => {
                        return (
                            <RestaurantInfo data={item} />
                        )
                    })
                }

            </div>
        );
    }
}

export default Details;
