import React from "react";
import './Sidebar.css'
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to={'/'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    Add Product
                </div>
            </Link>
            <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    List Product
                </div>
            </Link>
        </div>
    )
}

export default Sidebar;