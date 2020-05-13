import React , {useEffect, useState} from 'react'
import "../styles.css"
import {API} from "../backend.js"
import Base from "./Base.js";
import Card from "./Card"
import { getProducts } from "./helper/coreapicalls.js"
import { loadCart } from './helper/cartHelper';

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);
    
    const loadAllProducts = (products) => {
        return (
            <div>
                <h2>This section is to load products</h2>
                {products.map((product, index) => (
                    <Card
                    key={index}
                    product={product}
                    addtoCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload = {reload}
                    />
                ))}
            </div>
        )
    }

    const loadCheckOut = () => {
        return (
            <h2>For checkout</h2>
        )
    }
    
    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{products.length > 0 ? loadAllProducts() : (<h3>No products in cart</h3>)}</div>
                <div className="col-6">{loadCheckOut()}</div>
                    
            </div>
        </Base>
    )
}


export default Cart;