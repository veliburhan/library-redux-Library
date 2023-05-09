import React,{useState} from "react"

import { useParams,useNavigate } from "react-router-dom"

import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import api from "../api/api"
import urls from "../api/urls"
import actionTypes from "../redux/action/actionTypes"




const BookEdit = () => {
    const params = useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const { booksState, categoriesState } = useSelector(state => state)

    const myBook = booksState.books.find((item) => item.id === params.bookId)

    const [form,setForm]=useState(myBook)

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(!form.title || !form.author || !form.publisher || !form.categoryId ){
            alert("Lütfen zorunlu alanları doldurun")
            return
        }

        api.put(`${urls.books}/${params.bookId}`,form)
            .then(res=> {
                dispatch({type:actionTypes.bookTypes.EDIT_BOOK,payload:form})
                navigate(`/book-detail/${params.bookId}`)
               
            })
            .catch(err => {})
    }

    
    return (
        <div>
            <Header />
            <div className="container w-50 my-5 border" >
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="title"
                        className="form-label">Kitap Adı <span style={{ color: "red" }}>*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Kitap adı giriniz"
                    value={form.title}
                    onChange={(event)=> setForm({...form,title:event.target.value})}
                    />

                </div>

                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Yazar Adı <span style={{ color: "red" }}>*</span></label>
                    <input type="text" className="form-control" id="author" placeholder="Yazar adı giriniz"
                    value={form.author}
                    onChange={(event)=> setForm({...form,author:event.target.value})}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label">Yayınevi <span style={{ color: "red" }}>*</span></label>
                    <input type="text" className="form-control" id="publisher" placeholder="Yayınevi adı giriniz"
                    value={form.publisher}
                    onChange={(event)=> setForm({...form,publisher:event.target.value})}
                    />
                </div>


                <label htmlFor="select1" className="form-label">Kategori<span style={{ color: "red" }}>*</span></label>
                <select className="form-select" aria-label="select1" id="select1"
                value={form.categoryId}
                onChange={(event)=> setForm({...form,categoryId:event.target.value})}
                >

                    {
                        categoriesState.categories.map(item => (
                            <option key={item.id} value={item.id} >{item.name}</option>
                        ))
                    }
                </select>

                <div className="mb-3 my-3">
                    <label htmlFor="isbn" className="form-label">ISBN <span style={{ color: "red" }}></span></label>
                    <input type="number" className="form-control" id="isbn" placeholder="***********"
                    value={form.isbn}
                    onChange={(event)=> {
                        if (event.target.value.length<=11){
                            setForm({...form,isbn:event.target.value})
                        }
                    }
                    }
                    />
                </div>


                <div className="form-check my-4" >
                    <input className="form-check-input" type="checkbox" id="isRead"
                    value={form.isRead}
                    checked={form.isRead}
                    onChange={()=> setForm({...form,isRead:!form.isRead})}
                    />
                    <label className="form-check-label" htmlFor="isRead">
                        Bu kitabı okudum.
                    </label>
                </div>

                <div className="d-flex justify-content-center">
                    <button className="btn btn-success w-50" type="submit"> Kaydet</button>
                </div>
            </form>
            </div>
        </div>        
        
    )}


export default BookEdit