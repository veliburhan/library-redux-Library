import React, { useEffect, useState } from "react"

import Header from "../components/Header"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Navigate, Link } from "react-router-dom"


import urls from "../api/urls"
import api from "../api/api"
import GeneralModal from "../components/GeneralModal"
import actionTypes from "../redux/action/actionTypes"
import okundu from "../assets/images/okundu.png"
import edit from "../assets/images/edit.png"
import del from "../assets/images/del.png"
import back from "../assets/images/back.png"
import booksBanner from "../assets/images/books_banner2.png"


const BookDetail = (props) => {
    const params = useParams()
    console.log("props= ", props)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [book, setBook] = useState(null)
    const [category, setCategory] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [deleted, setDeleted] = useState(false)


    const deleteBook = (id) => {
        api.delete(`${urls.books}/${id}`)
            .then(res => {
                dispatch({ type: actionTypes.bookTypes.DELETE_BOOK, payload: id })
                setShowModal(false)
                setDeleted(true)

            })
    }



    // const read=(id)=>{
    //     api.put(`${urls.books}/${params.bookId}`)
    //     .then(res=>{

    //     })

    // }


    useEffect(() => {
        api.get(`${urls.books}/${params.bookId}`)
            .then(resBook => {
                setBook(resBook.data)
                api.get(`${urls.categories}/${resBook.data.categoryId}`) //kitabın categoryId sine bakarak kategori ismini buluyoruz.
                    .then(resCategory =>
                        setCategory(resCategory.data))


            })
    }, [])

    // if(book===null) return null
    return (
        <div >
            <Header page="book-detail" />



            <div className="container my-5 justify-content-center w-50 p-3 mb-2">

                {/* CARD START  */}

                <div className="card w-100">


                    <div className="card-img-overlay mx-auto">


                        <table className="table mx-auto card-title text-black" style={{ fontSize: "20px" }}>

                            <tbody>

                                <tr>
                                    <td>Kitap Adı</td>
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
                                    <td>{book?.isRead === true ? "Okundu" : "Okunmadı"} </td>
                                </tr>
                                <tr style={{ height: 50 }}></tr>
                                <tr></tr>

                                <tr>
                                    <td style={{ width: "100px" }}></td>
                                    <td style={{ width: "300px" }}>
                                        <Link to={`/book-edit/${book?.id}`} className="btn btn-success my-10 justify-content-end">Düzenle</Link>
                                        <button className="btn btn-danger my-10 justify-content-end mx-1" onClick={() => setShowModal(true)} style={{ width: "90px" }}>Sil</button>

                                    </td>
                                </tr>



                            </tbody>
                        </table>

                    </div>


                </div>




                {
                    showModal === true && (

                        <GeneralModal
                            title={"Uyarı!"}
                            content={"Kitap silinecek. Devam etmek istiyor musunuz?"}
                            buttonText={"Sil"}
                            button2Text={"Vazgeç"}
                            button2_OnClick={() => setShowModal(false)}
                            buttonOnClick={() => {
                                deleteBook(book?.id)

                            }} />
                    )
                }

                {
                    deleted === true && (

                        <GeneralModal
                            title={"Bilgi"}
                            content={(book?.title) + " veri tabanından silindi. Kitap listesine yönlendirileceksiniz."}
                            buttonText={"Tamam"}
                            buttonOnClick={() => {
                                navigate("/")
                                setDeleted(false)
                            }
                            }
                        />

                    )
                }

            </div>
        </div>
    )
}



export default BookDetail