import { USER } from "../constants/user";

let initialState = {
    loading:false,
    error:"",
}

export const sendOtpReducer = (state = initialState,action) => {
    switch(action.type){
        case USER.SEND_EMAIL_OTP_REQUEST:
            return { ...state, loading:true}
        case USER.SEND_EMAIL_OTP_SUCCESS:
            return { ...state,loading: false }
        case USER.SEND_EMAIL_OTP_FAILED:
            return { ...state,loading: false }
            case USER.SEND_PHONE_OTP_REQUEST:
                return { ...state, loading:true}
            case USER.SEND_PHONE_OTP_SUCCESS:
                return { ...state,loading: false }
            case USER.SEND_PHONE_OTP_FAILED:
                return { ...state,loading: false }
        default:
            return state
    }
}

