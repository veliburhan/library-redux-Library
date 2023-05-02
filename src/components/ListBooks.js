import React from "react"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

const ListBooks = () => {

    const {booksState,categoriesState}=useSelector(state=>state)

    return (
        <div className="container my-3">
            <div className="d-flex justify-content-end my-3">
                <Link to={"/add-book"} className="btn btn-primary">Kitap Ekle</Link>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr className="position-relative">
                        <th scope="col">Sıra No</th>
                        <th scope="col">Kitap Adı</th>
                        <th scope="col">Yazarı</th>
                        <th scope="col">Kategori</th>
                    </tr>
                </thead>
                <tbody>
                    {booksState.books.map((book,index)=> {
                    const myCategory=categoriesState.categories.find(item=>item.id === book.categoryId)
                    
                    return(
                        <tr key={book.id} className="position-relative">
                        <td>
                            <Link className="link stretched-link" to={`/book-detail/${book.id}`}> {index+1} </Link>
                        </td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{myCategory.name}</td>
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