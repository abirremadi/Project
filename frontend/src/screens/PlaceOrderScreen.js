import React, { useEffect } from 'react';
import {useSelector,useDispatch} from'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import {Link} from 'react-router-dom';
import {createOrder} from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if (!cart.paymentMethod){
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(7);
    cart.taxPrice = toPrice(0.20 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch= useDispatch ();
    const placeOrderHandler = () => {
      dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
      if (success) {
        props.history.push(`/order/${order._id}`);
        dispatch({ type: ORDER_CREATE_RESET });
      }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className="row top-left">
                <div className="col-2">
                <ul>
            <li>
              <div className="cart card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  <strong> City : </strong> {cart.shippingAddress.city}, 
                  <strong> Postal Code : </strong> {cart.shippingAddress.postalCode},
                  <strong> Country : </strong> {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="cart card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="cart card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>

                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x {item.price} Dt = {item.qty * item.price} Dt
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
                </div>
                <div className="col-1">
                  <div className="cart card-body">
                    <ul>
                      <li>
                        <h2> Order Summary</h2>
                      </li>
                      <li>
                        <div className="row">
                          <div> Items</div>  
                          <div> {cart.itemsPrice.toFixed(3 )} Dt</div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div> Shipping</div>  
                          <div> {cart.shippingPrice.toFixed(3)} Dt</div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div> Tax</div>  
                          <div> {cart.taxPrice.toFixed(3)} Dt</div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div> 
                           <strong> Order Total</strong>
                            </div>  
                          <div>
                        <strong>{cart.totalPrice.toFixed(3)} Dt </strong>
                             </div>
                        </div>
                      </li>
                      <li>
                        <button
                        type="button"
                        onClick={placeOrderHandler}
                        className="primary block"
                        disabled={cart.cartItems.length === 0}
                      >
                        Place Order
                        </button>
                        </li>
                        {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </ul>
                  </div>
                </div>
            </div>
        </div>
    )
}
