import React from "react"

import { useSelector } from "react-redux"

const AddBookForm = () => {
    const { categoriesState } = useSelector(state => state)


    return (
        <div className="container my-5">
            <form>
                <div className="mb-3">
                    <label htmlFor="title"
                        className="form-label">Kitap Adı</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Kitap adı giriniz" />
                </div>

                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Yazar Adı</label>
                    <input type="text" className="form-control" id="author" placeholder="Yazar adı giriniz" />
                </div>

                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label">Yayınevi</label>
                    <input type="text" className="form-control" id="publisher" placeholder="Yayınevi adı giriniz" />
                </div>

                <div className="mb-3">
                    <label htmlFor="isbn" className="form-label">ISBN</label>
                    <input type="number" className="form-control" id="isbn" placeholder="***********" />
                </div>

                <select className="form-select" aria-label="Default select example">

                    {
                        categoriesState.categories.map(item => (
                            <option key={item.id} value={item.id} >{item.name}</option>
                        ))
                    }
                </select>

                <div class="form-check my-4" >
                    <input className="form-check-input" type="checkbox" value="" id="isRead" />
                    <label className="form-check-label" htmlFor="isRead">
                        Bu kitabı okudum.
                    </label>
                </div>

                <div className="d-flex justify-content-center">
                    <button className="btn btn-secondary w-50" type="submit"> Kaydet</button>
                </div>
            </form>
        </div>
    )
}


export default AddBookForm