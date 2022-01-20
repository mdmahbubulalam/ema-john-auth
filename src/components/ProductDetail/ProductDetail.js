import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './ProductDetail.css';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div className="product-detail">
            <h3>Your Product Detail:</h3>
            <Product product={product} showAddToCart={false}/>
        </div>
    );
};

export default ProductDetail;