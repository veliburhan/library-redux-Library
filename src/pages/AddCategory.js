import React,{useState} from "react"
import Header from "../components/Header"
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/action/actionTypes";

import GeneralModal from "../components/GeneralModal";




const AddCategory = () => {

    const [form,setForm]=useState(
        {
            id:String(new Date().getTime()),
            name:""
        }
    )

    const {categoriesState}=useSelector(state=>state)
    const dispatch=useDispatch()
    const [showModal,setShowModal]=useState(false)
    const navigate=useNavigate()

    const handleSubmit=(event)=>{
        event.preventDefault()
        // Validation
        if(form.name === ""){
            alert("Kategori adı boş olamaz !")
            return
        }

        if(categoriesState.categories.filter(category => category.name === form.name).length > 0){
            alert("Bu Kategori adı daha önce eklenmiş. Yeni bir kategori adı ekleyin.")
            return
        }

        api.post(urls.categories,form)
        .then(res=>{
            dispatch({type:actionTypes.categoryTypes.ADD_CATEGORY,payload:form})
            setShowModal(true)
        })

        .catch(err=>{})        

    }
    

    return (
        <div>
            <Header />
            <div className="container w-50 my-5">
                 <div className="d-flex justify-content-center">
                        <h3>Yeni Kategori Ekle</h3>
                </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 ">
                    <label htmlFor="categoryName" className="form-label">Kategori Adı<span style={{ color: "red" }}>*</span></label>
                    <input type="text" className="form-control" id="categoryName" placeholder="Kategori adı giriniz"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    />
                    
                </div>

                <div className="d-flex justify-content-center">
                        <button className="btn btn-success w-50" type="submit"> Kaydet</button>
                </div>
            </form>
            {
                showModal === true &&
                 <GeneralModal 
                    title={"Başarılı"} 
                    content="Kategori başarıyla kaydedildi" 
                    buttonText={"Kapat"} 
                    buttonOnClick={()=>navigate("/categories")}                    
                />
            }
            </div>


        </div>
    )
}

export default AddCategory