import React from "react"

import error from "../assets/images/error1.gif"
import {Link} from "react-router-dom"

const Error=()=>{
    return(
        <div style={{
            width:"100%",
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems: "center",
            flexDirection : "column"
        }}>
            <Link to={"/"}> <img src={error}/> </Link>
            <h1>Sayfa bulunamadı !.</h1>
            
        </div>
    )
}

export default Error 