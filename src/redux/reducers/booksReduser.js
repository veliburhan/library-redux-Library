import actionTypes from "../action/actionTypes";


const intialState = {
    start: false,
    success: false,
    books: [],
    fail: "false",
    error: ""
}

const booksReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.bookTypes.FETCH_BOOKS_START:
            return {
                ...state,
                start: true,
            }
        case actionTypes.bookTypes.FETCH_BOOKS_SUCCESS:
            return {
                ...state,
                start: false,
                success: true,
                books: action.payload,
                fail: false
            }
        case actionTypes.bookTypes.FETCH_BOOKS_FAIL:
            return {
                ...state,
                start: false,
                success: false,
                fail: true,
                error: action.payload
            }

        case actionTypes.bookTypes.ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload]
            }

        case actionTypes.bookTypes.DELETE_BOOK:
            let filteredBooks=state.books.filter(item => item.id !== action.payload)
            return{
                ...state,
                books:filteredBooks
            }

        case actionTypes.bookTypes.EDIT_BOOK:
            let tempArray=[];
            for(let i=1;i<state.books.length;i++){
                if(state.books[i].id === action.payload.id){
                    tempArray.push(action.payload)
                }
                else{
                    tempArray.push(state.books[i].id)
                }
            }
            return{
                ...state,
                books:tempArray
            }
            
        default:
            return state

    }
}

export default booksReducer