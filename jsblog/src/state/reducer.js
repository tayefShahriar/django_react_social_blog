export const initialstate = {
    profile: null,
}

export const reducer = (state, action)=>{
    switch (action.type){
        case "ADD_PROFILE":
            return{
                ...state,
                profile:action.value
            }
        default:
            return state
    }
}