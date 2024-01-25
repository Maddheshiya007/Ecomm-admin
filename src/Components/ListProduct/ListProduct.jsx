import React, { useEffect, useState } from "react";
import './ListProduct.css'

const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/allproducts`).then((res) => res.json()).then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, [])
    const remove_product = async (id) => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/removeproduct`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        await fetchInfo();
    }

    return (
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, i) => {
                    return <div key={i} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p> ${product.old_price} </p>
                        <p> ${product.new_price} </p>
                        <p> {product.category} </p>
                        <p onClick={()=>{
                            remove_product(product.id);
                        }} alt="" className="listproduct-remove-icon">❌</p>

                    </div>
                })}
            </div>
        </div>
    )
}

export default ListProduct;