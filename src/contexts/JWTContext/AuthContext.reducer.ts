const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SIGN_UP = 'SIGN_UP';

const AuthReducer = (state: any, action: any) => {
    // console.log(action.payload.isAuthenticated)
    switch (action.type) {
        case INITIALIZE:
            return {
                isAuthenticated: action.payload.isAuthenticated,
                isInitialized: true,
                user: action.payload.user,
            };
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                otr_id: action.payload.otr_id,
                validationErrors:action.payload.validationErrors
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                otr_id:''
            };

        case SIGN_UP:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                otr_id: action.payload.otr_id,

            };

        default:
            return state;
    }
};

export default AuthReducer;
