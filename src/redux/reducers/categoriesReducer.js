
import actionTypes from "../action/actionTypes";


const initialState={
    start:false,
    success:false,
    categories:[],
    fail:false,
    error:""
}

const categoriesReducer=(state=initialState, action)=>{
    switch (action.type) {
        case actionTypes.categoryTypes.FETCH_CATEGORIES_START:
            return{
                ...state,
                start:true,
            }
            
        case actionTypes.categoryTypes.FETCH_CATEGORIES_SUCCESS:
            return{
                ...state,
                start:false,
                success:true,
                categories:action.payload,
                fail:false
            }
        
        case actionTypes.categoryTypes.FETCH_CATEGORIES_FAIL:
            return{
                ...state,
                start:false,
                success:false,
                fail:true,
                error:action.payload
            }
    
        default:
            return state
    }

}

export default categoriesReducer