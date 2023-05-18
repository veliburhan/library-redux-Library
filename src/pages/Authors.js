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




const Authors = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { bookesState, booksState } = useSelector(state => state)
    const [showModal, setShowModal] = useState(false)
    const [modalForm, setModalForm] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [dizi, SetDizi] = useState([])
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


        api.delete(`${urls.bookes}/${id}`)
            .then(res => {
                dispatch({ type: actionTypes.categoryTypes.DELETE_CATEGORY, payload: id })
                setShowModal(false)
                setDeleted(true)

            })
    }

    const BookSay = (author) => {
        const adet = booksState.books.filter(book => book.author === author).length
     
        return adet
    }

    const AuthorsList=(books)=>{
        
        var uniqueList = Array.from(new Set(books.map(x => x.author)));
        
        uniqueList.sort(function(a, b){return a.localeCompare(b)})
                
        SetDizi(uniqueList)

    }




    return (
        <div>
            <Header/>
            <div>
                
                <div className="container w-50 my-4">
                 
                    {
                        
                        booksState.books.length === 0 && (
                            <div className="alert alert-danger text-center" role="alert">
                                Henüz yazar kaydı bulunmuyor.
                            </div>
                        )
                    }

                    {
                        booksState.books.length > 0 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{width:"60px"}} >No</th>
                                        <th style={{width:"500px"}}>Yazar Adı</th>
                                        <th className="text-end" style={{width:"400px"}}>Kitap Sayısı</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    { dizi.length < 1 && (
                                        AuthorsList(booksState.books)
                                    )
                                    }

                                    {   
                                        
                                        dizi.map((author,index) =>                                    
                                        
                                        
                                            <>

                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{author}</td>
                                                    <td className="text-end">
                                                        {BookSay(author) > 0 ? <button className="btn btn-outline-info" onClick={() => selectedRow !== index ? setSelectedRow(index):setSelectedRow("0")}>{BookSay(author)}</button>:BookSay(author)}
                                                    </td>
                                                    

                                                </tr>
                                                {selectedRow === index && (                                                    
                                                    
                                                    booksState.books.filter(filter_book => filter_book.author === author).map((book_selected,index) =>                                    
                                                    
                                                    <tr key={index} className="position-relative">
                                                        
                                                        <td className="text-end"><Link className="link stretched-link" to={`/book-detail/${book_selected.id}`}>{index+1}</Link></td>
                                                        <td >{book_selected.title}</td>
                                                        <td >{book_selected.author}</td>
                                                        
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
                    

                    

                   

                    
                </div>
            </div>
        </div >

    )
}

export default Authors