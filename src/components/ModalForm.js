import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import api from "../api/api"
import urls from "../api/urls"
import { useDispatch,useSelector } from "react-redux"
import actionTypes from "../redux/action/actionTypes"
import GeneralModal from "./GeneralModal"



const ModalForm = ({
    title,
    content,
    buttonCancel_OnClick= ()=>{},
    categoryForm,
    ModalForm=()=>{}
    
}) => {

    const [form, setForm] = useState(categoryForm)
    const { categoriesState } = useSelector(state => state)
    const [hata,setHata]=useState(false)

    console.log("form name= ", form.name)
    console.log("form ıd= ", form.id)

    const navigate=useNavigate()
    const dispatch=useDispatch()


    const handleSubmit=(event)=>{
        event.preventDefault()
        //VALİDATİON
        if(categoriesState.categories.filter(category => category.name === form.name).length > 0){
            //alert(" Mevcut kategorilerin dışında bir kategori adı yazınız !")
            setHata(true)
            return
        }

        api.put(`${urls.categories}/${form.id}`,form)
        .then(res=>{
            dispatch({type:actionTypes.categoryTypes.EDIT_CATEGORY, payload:form})            
            ModalForm()
            navigate("/categories") 
                                 
        })
         }

    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.4)",
                zIndex: 100,
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>

            <div
                style={{
                    width: "30%",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    padding: "20px"
                }}>

                <h3 className="text-center">{title}</h3>
                <p className="text-center">{content}</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title"
                            className="form-label">Kategori Adı <span style={{ color: "red" }}>*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Kategori adı giriniz"
                            value={form.name}
                            onChange={(event) => setForm({...form,name:event.target.value})}
                        />

                    </div>               

                    <div className="d-flex justify-content-center">
                        
                        <button className="btn btn-danger mx-2" onClick={buttonCancel_OnClick} >İptal</button>
                        <button className="btn btn-primary" type="submit" >Kaydet</button>
                    </div>
                </form>


                {   
                    hata === true && (
                        
                        <GeneralModal 
                        title={"Uyarı"} 
                        content={"Bu kategori adı şu anda kullanımda. Lütfen başka bir kategori adı yazınız."} 
                        buttonText={"Tamam"}                         
                        buttonOnClick={() => {
                            navigate("/categories")
                            setHata(false)
                            }
                            }                         
                        />  
                        
                    )
                }

                

           
                
            </div>
        </div>
    )
}

export default ModalForm