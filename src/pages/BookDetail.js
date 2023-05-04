import React, { useEffect, useState } from "react"

import Header from "../components/Header"
import { useNavigate, useParams} from "react-router-dom"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"


import urls from "../api/urls"
import api from "../api/api"
import GeneralModal from "../components/GeneralModal"
import actionTypes from "../redux/action/actionTypes"


const BookDetail = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [book, setBook] = useState(null)
    const [category, setCategory] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const deleteBook=(id)=>{
        api.delete(`${urls.books}/${id}`)
        .then(res=>{
            dispatch({type:actionTypes.bookTypes.DELETE_BOOK, payload:id})
            setShowModal(false)
            navigate("/")
        })

    }


    useEffect(() => {
        api.get(`${urls.books}/${params.bookId}`)
            .then(resBook => {
                setBook(resBook.data)
                api.get(`${urls.categories}/${resBook.data.categoryId}`) //kitabın categoryId sine bakarak kategori ismini buluyoruz.
                    .then(resCategory => setCategory(resCategory.data))
            })
    }, [])

    // if(book===null) return null
    return (
        <div>
            <Header />
            <div className="container my-5 w-60">

                <table className="table table-borderless">

                    <tbody>

                        <tr>
                            <td className="">Kitap Adı</td>
                            <td>{book?.title}</td>
                        </tr>

                        <tr>
                            <td>Yazar Adı</td>
                            <td>{book?.author}</td>
                        </tr>

                        <tr>
                            <td>Yayınevi</td>
                            <td>{book?.publisher}</td>
                        </tr>

                        <tr>
                            <td> Kategorisi</td>
                            <td>{category?.name}</td>
                        </tr>


                        <tr>
                            <td> ISBN</td>
                            <td>{book?.isbn === "" ? "-" : book?.isbn}</td>
                        </tr>

                        <tr>
                            <td>Durumu</td>
                            <td>{book?.isRead === true ? "Okundu" : "Okunmadı"}</td>
                        </tr>
                        <tr style={{height:50}}></tr>
                        <tr></tr>

                        <tr>
                            <td style={{width:"60px"}}> <button className="btn btn-primary my-10 justify-content-end" style={{width:"100px"}}>DÜZENLE</button></td>
                            <td> <button className="btn btn-danger my-10 justify-content-start" onClick={() => setShowModal(true)} style={{width:"100px"}}>   SİL   </button> </td>

                        </tr>



                    </tbody>
                </table>

                {
                    showModal === true && (
                        <GeneralModal 
                        title={"Uyarı!"} 
                        content={"Kitap silinecek. Devam etmek istiyor musunuz?"} 
                        buttonText={"Sil"} 
                        button2Text={"Vazgeç"} 
                        button2_OnClick={() => setShowModal(false)} 
                        buttonOnClick={()=>deleteBook(book?.id)}
                        />
                    )
                }

            </div>
        </div>
    )
}



export default BookDetail