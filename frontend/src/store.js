import {createStore,compose,applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReeducers';
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer } from './reducers/orderReducer';

import { productCreateReducer,productDeleteReducer,productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/productReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
const initialState={
    userSignin :{
        userInfo:localStorage.getItem('userInfo') 
        ? JSON.parse (localStorage.getItem('userInfo'))
        :null,
    },
    cart:{
        cartItems:localStorage.getItem('cartItems')
        ?JSON.parse(localStorage.getItem('cartItems'))
        :[],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse( localStorage.getItem('shippingAddress'))
        :{},
        paymentMethod: 'PayPal',
    },
};
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin :userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderDetails: orderDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store=createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
    );

export default store;