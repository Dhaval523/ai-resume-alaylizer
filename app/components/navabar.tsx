import React from 'react';
import {Link} from "react-router";


const Navabar = () => {
    return (
       <nav className="navbar">
           <Link to= "/">
               <p className="text-2xl font-bold text-gradient">RESUMIND</p>
           </Link>
           <Link to= "/upload">
               <p className="primary-button w-fit">Upload</p>
           </Link>
       </nav>
    );
};

export default Navabar;