import React from "react";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";


const Home=()=>{

   return(
        <div>
            <Header page="list-books" />
            <ListBooks/>
        </div>

    )
}

export default Home