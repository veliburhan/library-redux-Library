
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

        case actionTypes.categoryTypes.ADD_CATEGORY:
            return{
                ...state,
                categories:[...state.categories,action.payload]

            }

        case actionTypes.categoryTypes.DELETE_CATEGORY:
            let filteredCategories=state.categories.filter(item => item.id !== action.payload)
            return{
                ...state,
                categories:filteredCategories
            }

        case actionTypes.categoryTypes.EDIT_CATEGORY:
            let tempArray=[];
            for(let i=0;i<state.categories.length;i++){
                if(state.categories[i].id === action.payload.id){
                    tempArray.push(action.payload)
                }
                else{
                    tempArray.push(state.categories[i])
                }
            }
            return{
                ...state,
                categories:tempArray
            }
    
        default:
            return state
    }

}

export default categoriesReducer