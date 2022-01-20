import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    let total=0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total+product.price*product.quantity; 
    }

    let shipping = 0;

    if(total >250){
        shipping = 0;
    }else if(total >150){
        shipping = 8.99;
    }else if(total >0){
        shipping = 12.99;
    }

    let tax = total/10;

    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered : {cart.length} </p>
            <p>Product Price : ${formatNumber(total)}</p>
            <p><small>VAT + Tax :${formatNumber(tax)}</small></p>
            <p><small>Shipping Cost :${formatNumber(shipping)}</small></p>
            <p>Total Price : ${formatNumber(total+shipping+tax)}</p>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;