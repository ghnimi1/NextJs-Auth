import { combineReducers } from "redux"
import {
    activateEmailReducer,
    getTokenReducer,
    userLoginReducer,
    userRegisterReducer,
    getCurrentUserReducer,
    updateProfileReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    getAllUsersReducer,
    getUserReducer,
    updateRoleUserReducer,
    deleteUserReducer
} from './usersReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    token: getTokenReducer,
    activate: activateEmailReducer,
    currentUser: getCurrentUserReducer,
    updateProfile: updateProfileReducer,
    updateRole: updateRoleUserReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    users: getAllUsersReducer,
    user: getUserReducer,
    deleteUser: deleteUserReducer
})

export default rootReducer;