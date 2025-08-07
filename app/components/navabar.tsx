import React from 'react';
import {Link} from "react-router";


const Navabar = () => {
    return (
       <nav className="navbar">
           <Link to= "/">
               <p className="text-xl font-bold text-gradient">RESUMIND</p>
           </Link>

               <Link to= "/auth">
                   <p className="primary-button w-fit">Logout</p>
               </Link>



       </nav>
    );
};

export default Navabar;