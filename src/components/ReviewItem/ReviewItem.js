import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name,quantity, key, price} = props.product;
    return (
        <div>
            <div className="">
                <h4 className="product-name">{name}</h4>
                <p>Quantity: {quantity}</p>
                <p><small>Price: ${price}</small></p>
                <br />
                <button className="cart-button" onClick = {() => props.removeProduct(key)}>Remove</button>
            </div>

        </div>
        
    );
};

export default ReviewItem;