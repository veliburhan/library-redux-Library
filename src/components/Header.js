import React from "react"
import {Link} from "react-router-dom"


const Header=()=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">My Library</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/"}>Anasayfa</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={""}>Kategoriler</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Kitaplar</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Yazarlar</a>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
    )
}

export default Header