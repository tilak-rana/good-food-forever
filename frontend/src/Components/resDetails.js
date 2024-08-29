import React from 'react';
import Modal from 'react-modal';
import Carousel from './resimgcarousel';
import RestaurantInfo from './restaurantInfo';
import MenuItem from './MenuItem';
import CartSummary from './CartSummary';
import PaymentCard from './PaymentCard';
import axios from 'axios';
import queryString from 'query-string';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '8px'
  }
};

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      menuModal: false,
      formModal: false,
      paymentModal: false,
      resId: undefined,
      menuItems: [],
      subtotal: 0,
      formData: {
        name: '',
        email: '',
        address: '',
        contactNumber: ''
      },
      selectedPaymentMethod: ''
    };
  }

  componentDidMount() {
    const qs = queryString.parse(window.location.search);
    const { restaurant } = qs;

    axios.get(`http://localhost:5500/restaurants/${restaurant}`)
      .then(res => {
        this.setState({ restaurants: res.data.restaurant, resId: restaurant });
      })
      .catch(err => console.log(err));
  }

  handleModal = (state, value) => {
    const { resId } = this.state;

    if (state === 'menuModal' && value === true) {
      axios.get(`http://localhost:5500/menu/${resId}`)
        .then(res => {
          const items = res.data.menuitems ? res.data.menuitems.map((item) => ({
            ...item,
            qty: 0
          })) : [];

          this.setState({ menuItems: items });
        })
        .catch(err => {
          console.error('API Error:', err);
        });
    }

    this.setState({ [state]: value });
  };

  handleAddItem = (index) => {
    const { menuItems } = this.state;
    menuItems[index].qty += 1;
    this.setState({ menuItems });
    this.updateSubtotal(menuItems);
  };

  handleSubtractItem = (index) => {
    const { menuItems } = this.state;
    if (menuItems[index].qty > 0) {
      menuItems[index].qty -= 1;
      this.setState({ menuItems });
      this.updateSubtotal(menuItems);
    }
  };

  updateSubtotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    this.setState({ subtotal: total });
  };

  handlePayment = () => {
    this.handleModal('menuModal', false);
    this.handleModal('formModal', true);
  };

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { formData, resId, subtotal, selectedPaymentMethod } = this.state;

    axios.post('http://localhost:5500/orders', {
      ...formData,
      resId,
      subtotal,
      paymentMethod: selectedPaymentMethod
    })
    .then(response => {
      console.log('Order submitted successfully:', response.data);
      this.handleModal('formModal', false);
      this.handleModal('paymentModal', true);
      this.setState({
        formData: {
          name: '',
          email: '',
          address: '',
          contactNumber: ''
        }
      });
    })
    .catch(error => {
      console.error('Error submitting order:', error);
    });
  };

  handlePaymentMethodSelect = (method) => {
    this.setState({ selectedPaymentMethod: method });
  };

  render() {
    const { restaurants, menuModal, formModal, paymentModal, menuItems, subtotal, formData } = this.state;

    return (
      <div>
        <Carousel />
        {restaurants.length > 0 && restaurants.map((item) => (
          <RestaurantInfo data={item} key={item.id} />
        ))}
        <button className="btn btn-danger w-100 mt-3" onClick={() => this.handleModal('menuModal', true)}>
          Place Online Order
        </button>

        <Modal
          isOpen={menuModal}
          onRequestClose={() => this.handleModal('menuModal', false)}
          style={customStyles}
          ariaHideApp={false}
        >
          <button onClick={() => this.handleModal('menuModal', false)} className="close-modal-btn">
            X
          </button>
          <div>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                index={index}
                onAdd={this.handleAddItem}
                onSubtract={this.handleSubtractItem}
              />
            ))}
            <CartSummary subtotal={subtotal} onPayNow={this.handlePayment} />
          </div>
        </Modal>

        <Modal
          isOpen={formModal}
          onRequestClose={() => this.handleModal('formModal', false)}
          style={customStyles}
          ariaHideApp={false}
        >
          <button onClick={() => this.handleModal('formModal', false)} className="close-modal-btn">
            X
          </button>
          <div>
            <h2>Order Details</h2>
            <form onSubmit={this.handleFormSubmit}>
              <div>
                <label>Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={this.handleFormChange}
                  placeholder="Enter your Name"
                  required
                />
              </div>
              <div>
                <label>Address:</label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={this.handleFormChange}
                  placeholder="Enter your Address"
                  required
                />
              </div>
              <div>
                <label>Contact Number:</label>
                <input
                  className="form-control"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={this.handleFormChange}
                  placeholder="Enter your Contact Number"
                  required
                />
              </div>
              <button className="btn btn-success mt-3" type="submit">Submit Order</button>
            </form>
          </div>
        </Modal>

        <Modal
          isOpen={paymentModal}
          onRequestClose={() => this.handleModal('paymentModal', false)}
          style={customStyles}
          ariaHideApp={false}
        >
          <button onClick={() => this.handleModal('paymentModal', false)} className="close-modal-btn">
            X
          </button>
          <PaymentCard onPaymentMethodSelect={this.handlePaymentMethodSelect} />
        </Modal>
      </div>
    );
  }
}

export default Details;
