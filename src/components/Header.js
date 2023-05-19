import React from "react"
import { Link } from "react-router-dom"
import book from "../assets/images/book.png"


const Header = (props) => {
  console.log("header props=",props)
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"} style={{ backgroundColor: "ff34af" }}>My Library</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/categories"}>Kategoriler</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={"/authors"}>Yazarlar</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#"></a>
            </li>

          </ul>
        </div>
        <div>
          {
            (props.page==="list-books" || props.page ==="book-detail") && (
              <Link to={"/add-book"}><button className="btn btn-primary">Kitap Ekle</button></Link>
            )

          }

          {
            props.page === "list-categories" && (
              <Link to={"/add-category"}><button className="btn btn-primary">Kategori Ekle</button></Link>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Header