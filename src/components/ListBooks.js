import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import okundu from "../assets/images/okundu.png"
import book from "../assets/images/book.png"

const ListBooks = () => {

    const { booksState, categoriesState } = useSelector(state => state)
    console.log("booksstate",booksState)

    if(booksState.success === false || categoriesState.success === false){
        return <h1>Loading...</h1>
      }
   
    return (
        <div className="container">
            <div className="d-flex justify-content-end">
                <Link to={"/add-book"}><img width={"50px"} src={book} /></Link>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr className="position-relative">
                        <th scope="col">Sıra No</th>
                        <th scope="col">Kitap Adı</th>
                        <th scope="col">Yazarı</th>
                        <th scope="col">Kategori</th>
                        <th scope="col">Durumu</th>
                    </tr>
                </thead>
                <tbody>
                    {booksState.books.map((book, index) => {
                        const myCategory = categoriesState.categories.find(item => item.id === book.categoryId)
                        console.log("myCategory: ", myCategory)

                        return (
                            <tr key={book.id} className="position-relative">
                                <td>
                                    <Link className="link stretched-link" to={`/book-detail/${book.id}`}> {index + 1}</Link>
                                </td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{myCategory.name}</td>
                                <td>{book.isRead === true && <img style={{ width: "20px" }} src={okundu} alt={"Okundu"}/>} </td>
                            </tr>)

                    }
                    )
                    }
                </tbody>
            </table>
        </div>
    )

}

export default ListBooks