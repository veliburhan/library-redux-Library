import React,{useEffect} from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import {useDispatch,useSelector} from "react-redux";
import axios from "axios";
import actionTypes from "./redux/action/actionTypes";
import Error from "./pages/Error";
import AddBook from "./pages/AddBook";



function App() {
  const dispatch = useDispatch()
  const {booksState,categoriesState}=useSelector(state=>state)

  useEffect(()=>{
    //fetch books
    dispatch({type:actionTypes.bookTypes.FETCH_BOOKS_START})
    axios.get("http://localhost:3333/books")
    .then(res=>{
      dispatch({type:actionTypes.bookTypes.FETCH_BOOKS_SUCCESS,payload:res.data})
    })
    .catch(err=>{
      console.log("kitaplar yüklenemedi")
      dispatch({type:actionTypes.bookTypes.FETCH_BOOKS_FAIL,payload:"Kitaplar Yüklenirken Bir Hata Oluştu !"})
    })

    //fetch categories
    dispatch({type:actionTypes.categoryTypes.FETCH_CATEGORIES_START})
    axios.get("http://localhost:3333/categories")
    .then(res=>{
      dispatch({type:actionTypes.categoryTypes.FETCH_CATEGORIES_SUCCESS,payload:res.data})
    })
    .catch(err=>{
      console.log("kategoriler yüklenemedi")
      dispatch({type:actionTypes.categoryTypes.FETCH_CATEGORIES_FAIL,payload:"Kategoriler Yüklenirken Bir Hata Oluştu !"})
    })

  },[])


  if(booksState.success === false || categoriesState.success === false){
    return <h1>Loading...</h1>
  }
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add-book" element={<AddBook/>} />


      <Route path="*"element ={<Error/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
