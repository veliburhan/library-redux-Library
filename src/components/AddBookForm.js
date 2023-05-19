import React , {useState} from "react"

import { useSelector ,useDispatch} from "react-redux"
import api from "../api/api"
import urls from "../api/urls"
import actionTypes from "../redux/action/actionTypes"
import {useNavigate} from "react-router-dom"
import GeneralModal from "./GeneralModal"

import { upperFirstLetters } from "../utils/functions"
 
const AddBookForm = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { categoriesState } = useSelector(state => state)
    const [form,setForm] = useState({
        id:String(new Date().getTime()),
        title: "",
        author:"",
        isbn: "",
        publisher: "",
        categoryId: categoriesState.categories[0].id,
        isRead:false
    });

    

    const [showModal,setShowModal]=useState(false)
    const handleSubmit=(event)=>{
        event.preventDefault()
        /* VALİDATİON */
        if(!form.title || !form.author || !form.publisher || !form.categoryId){
            alert("Kitap adı, Yazar adı, Yayınevi adı ve Kategori alanları doldurulmalıdır.")
            return
        }
        // Girilen verilerin baş harfi büyük harfe çevriliyor
       


        api.post(urls.books,form)
        .then(res=>{
            dispatch({type:actionTypes.bookTypes.ADD_BOOK,payload:form})
            setShowModal(true)
        })
        .catch(err=>{})
    }

    return (
        <div className="container w-50 my-5">
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="title"
                        className="form-label">Kitap Adı <span style={{color:"red"}}>*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Kitap adı giriniz" 
                        value={form.title}
                        onChange={(event)=> setForm({...form,title:upperFirstLetters(event.target.value)})}
                        />
                        
                </div>

                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Yazar Adı <span style={{color:"red"}}>*</span></label>
                    <input type="text" className="form-control" id="author" placeholder="Yazar adı giriniz" 
                    value={form.author}
                    onChange={(event)=> setForm({...form,author:upperFirstLetters(event.target.value)})}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label">Yayınevi <span style={{color:"red"}}>*</span></label>
                    <input type="text" className="form-control" id="publisher" placeholder="Yayınevi adı giriniz" 
                    value={form.publisher}
                    onChange={(event)=> setForm({...form,publisher:upperFirstLetters(event.target.value)})}
                    />
                </div>

                
                <label htmlFor="select1" className="form-label">Kategori<span style={{color:"red"}}>*</span></label>
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
                    <label htmlFor="isbn" className="form-label">ISBN <span style={{color:"red"}}></span></label>
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
                    <input className="form-check-input" type="checkbox"  id="isRead" 
                    value={form.isRead}
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
            {
                showModal === true &&
                 <GeneralModal 
                    title={"Başarılı"} 
                    content="Kitap başarıyla kaydedildi" 
                    buttonText={"Kapat"} 
                    buttonOnClick={()=>navigate("/")}                    
                />
            }
            
         </div>
    )
}


export default AddBookForm