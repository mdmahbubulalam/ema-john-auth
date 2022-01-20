import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0,15);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find(pd =>pd.key === existingKey);
            product.quantity=savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    },[])

    const handleAddProduct = (product) => {
        const sameProduct = cart.find((pd) => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== product.key);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    };
    
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} product={product} handleAddProduct={handleAddProduct} showAddToCart={true}/>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="cart-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;