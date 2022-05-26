import { FETCH_FILES_FAILURE, FETCH_FILES_REQUEST, FETCH_FILES_SUCCEESS } from "../typesFiles/UploadFileTypes"

const initialState = {
    loading : true,
    category : [],
    error :''
}


const filesReducer = (state = initialState, action : any)=>{
    switch(action.type){
        case FETCH_FILES_REQUEST: 
        return{
            ...state,
            loading : true
        }

        case FETCH_FILES_SUCCEESS: 
        return{
            ...state,
            FILES : action.payload,
            loading : false,
            
        }

        case FETCH_FILES_FAILURE: 
        return{
            loading : false,
            file : [],
            error : action.payload
        }
        default : return state
    }
}

export default filesReducer