import { FETCH_CATEGORY_FAILURE, FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCEESS } from "../typesFiles/CategoryTypes"

const initialState = {
    loading : true,
    category : [],
    error :'',
    meta : ''
}


const categoryReducer = (state = initialState, action : any)=>{
    switch(action.type){
        case FETCH_CATEGORY_REQUEST: 
        return{
            ...state,
            loading : true
        }

        case FETCH_CATEGORY_SUCCEESS: 
        return{
            ...state,
            loading : false,
            category : action.payload.data,
            meta : action.payload.meta,
            error : ""
        }

        case FETCH_CATEGORY_FAILURE: 
        return{
            loading : false,
            category : [],
            error : action.payload
        }
        default : return state
    }
}

export default categoryReducer