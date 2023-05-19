import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";



import Header from "../components/Header";
import GeneralModal from "../components/GeneralModal";
import ModalForm from "../components/ModalForm";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/action/actionTypes";

import del from "../assets/images/del.png";
import edit from "../assets/images/edit.png"




const ListCategories = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { categoriesState, booksState } = useSelector(state => state)
    const [showModal, setShowModal] = useState(false)
    const [modalForm, setModalForm] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [WillDelCategory, SetWillDelCategory] = useState("")
    const [indelible, setIndelible] = useState(false)
    const [selectedRow, setSelectedRow] = useState("0")

    const [categoryForm, setCategoryForm] = useState(
        {
            id: "",
            name: ""
        }
    )



    const deleteCategory = (id) => {
        //VALİDATİON
        if (booksState.books.filter(book => book.categoryId === id).length > 0) {
            // alert("Bu kategori ismi ile kayıtlı kitap olduğundan kategori ismi silinemez !")
            setIndelible(true)
            return
        }


        api.delete(`${urls.categories}/${id}`)
            .then(res => {
                dispatch({ type: actionTypes.categoryTypes.DELETE_CATEGORY, payload: id })
                setShowModal(false)
                setDeleted(true)

            })
    }

    const categorySay = (categori) => {
        const adet = booksState.books.filter(book => book.categoryId === categori.id).length
     
        return adet
    }




    return (
        <div>
            <Header page="list-categories" />
            <div>


                <div className="container w-60 my-2">
                 
                    {
                        categoriesState.categories.length === 0 && (
                            <div className="alert alert-danger text-center" role="alert">
                                Henüz kategori kaydı bulunmuyor.
                            </div>
                        )
                    }

                    {
                        categoriesState.categories.length > 0 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{width:"60px"}} >S. No</th>
                                        <th style={{width:"500px"}}>Kategori Adı</th>
                                        <th style={{width:"400px"}}>Kitap Sayısı</th>
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categoriesState.categories.map((categori, index) =>
                                            <>
                                                <tr key={categori.id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{categori.name}</td>
                                                    <td>
                                                        {categorySay(categori)>0 ? <button className="btn btn-outline-info" onClick={() => selectedRow !== index ? setSelectedRow(index):setSelectedRow("0")}>{categorySay(categori)}</button>:categorySay(categori)}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="" onClick={() => {
                                                                setShowModal(true)
                                                                SetWillDelCategory(categori.id)
                                                            }}
                                                            style={{ width: "40px" }}><img src={del} style={{ width: "30px" }} />
                                                        </button>

                                                        <button
                                                            className="mx-2" onClick={() => {
                                                                setModalForm(true)
                                                                setCategoryForm({ ...categoryForm, id: categori.id, name: categori.name })


                                                            }}
                                                            style={{ width: "40px" }}><img src={edit} style={{ width: "30px" }} />
                                                        </button>

                                                    </td>

                                                </tr>
                                                {selectedRow === index && categorySay(categori) > 0 && (
                                                    

                                                    booksState.books.filter(book => book.categoryId === categori.id).map((book_selected,index) =>                                    
                                                    
                                                    <tr key={index} className="position-relative">
                                                        
                                                        <td className="text-end"><Link className="link stretched-link" to={`/book-detail/${book_selected.id}`}>{index+1}</Link></td>
                                                        <td >{book_selected.title}</td>
                                                        <td >{book_selected.author}</td>
                                                        <td>{categori.name}</td>
                                                    </tr>
                                                    
                                                    )                                                  

                                                )}
                                            </>
                                        )
                                    }

                                </tbody>
                            </table>
                        )
                    }
                    {
                        showModal === true && (

                            <GeneralModal
                                title={"UYARI !"}
                                content={"Bu Kategori silinecek. Devam etmek istiyor musunuz?"}
                                buttonText={"Sil"}
                                button2Text={"Vazgeç"}
                                button2_OnClick={() => setShowModal(false)}
                                buttonOnClick={() => {
                                    deleteCategory(WillDelCategory)
                                }} />
                        )
                    }

                    {
                        deleted === true && (

                            <GeneralModal
                                title={"Bilgi"}
                                content={"Kategori veri tabanından silindi."}
                                buttonText={"Tamam"}
                                buttonOnClick={() => {
                                    navigate("/categories")
                                    setDeleted(false)
                                }
                                }
                            />

                        )
                    }

                    {
                        indelible === true && (

                            <GeneralModal
                                title={"UYARI"}
                                content={"Bu kategori adı ile kayıtlı kitap bulunduğundan kategori adı silinemez !"}
                                buttonText={"Tamam"}
                                buttonOnClick={() => {
                                    navigate("/categories")
                                    setIndelible(false)
                                }
                                }
                            />

                        )
                    }

                    {

                        modalForm === true && (

                            <ModalForm
                                title={"Kategori Güncelle"}
                                content=""
                                categoryForm={categoryForm}
                                buttonCancel_OnClick={() => {
                                    navigate("/categories")
                                    setModalForm(false)
                                }}
                                ModalForm={() => setModalForm(false)}

                            />

                        )
                    }



                </div>
            </div>
        </div >

    )
}

export default ListCategories