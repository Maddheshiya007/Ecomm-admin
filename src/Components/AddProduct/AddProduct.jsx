import React, { useState } from "react";
import './AddProduct.css'
import upload_area from '../Assests/logo.png'


const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let product = productDetails;

        let formdata = new FormData();
        formdata.append('file', image);
        formdata.append('upload_preset', `${import.meta.env.VITE_UPLOAD_PRESET}`);
        formdata.append('cloud_name', `${import.meta.env.VITE_CLOUD_NAME}`)
        const { secure_url, public_id } = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formdata
        }).then((res) => res.json());
        if (secure_url) {
            product.image = secure_url;
            product.image_id = public_id;
            console.log(secure_url, public_id);
            await fetch(`${import.meta.env.VITE_SERVER_URL}/addproduct`, {
                mode: 'no-cors',
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
                },
                body: JSON.stringify(product)
            }).then((res) => res.json()).then((data) => data.success ? alert("Product Added") : alert("Failed"))
        }
    }

    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input type="text" value={productDetails.name} onChange={changeHandler} name="name" placeholder="Type here" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input type="text"
                        value={productDetails.old_price} onChange={changeHandler}
                        name="old_price" placeholder="Type here" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input type="text"
                        value={productDetails.new_price} onChange={changeHandler} name="new_price" placeholder="Type here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category" value={productDetails.category} onChange={changeHandler} className="add-product-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumnail-img" alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={Add_Product} className="addproduct-btn">Add</button>
        </div>
    )
}

export default AddProduct;