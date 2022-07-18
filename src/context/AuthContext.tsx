import React, {createContext, Dispatch, useEffect, useReducer} from "react";



const initialState = {
    loading: false,
    user: JSON.parse(localStorage.getItem("user") as any) || null,
    error: ""
}

type State = typeof initialState

type Actions = {
    type: "LOGIN_SUCCESS" | "LOGIN_ERROR" | "LOGIN_LOADING" | "LOGOUT",
    payload?: any
}

export type ContextState = {
    dispatch: Dispatch<Actions>
} & State

export const AuthContext = createContext<ContextState>(initialState as any)


const authReducer = (state: State, action: Actions) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case "LOGIN_LOADING":
            return {
                ...state,
                loading: true
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                error: "error"
            }
        case "LOGOUT":
            return initialState
        default:
            return state
    }
}



export const AuthContextProvider = ({children}: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
           localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    return (
        <AuthContext.Provider
            value={{user:  state.user ,error: state.error,loading: state.loading,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

























// import React, {createContext, Dispatch, useReducer} from "react";
//
//
//
// const initialState = {
//     loading: false,
//     user: null,
//     error: ""
// }
//
// type State = typeof initialState
//
// type AuthAction = {
//     type: "LOGIN_SUCCESS" | "LOGIN_ERROR" | "LOGIN_LOADING",
//     payload: State
// }
//
//
//
//
// export const SearchContext = createContext<any>(initialState)
//
//
// const authReducer = (state: State, action: AuthAction) => {
//     switch (action.type) {
//
//         case "LOGIN_LOADING":
//             return {
//                 loading: true
//             }
//         case "LOGIN_SUCCESS":
//             return {
//                 user: action.payload,
//                 loading: false
//             }
//         case "LOGIN_ERROR":
//             return {
//                 error: "err"
//             }
//         default:
//             return state
//     }
// }
//
//
//
// export const SearchContextProvider = ({children}: { children: React.ReactNode }) => {
//
//     const [state, dispatch] = useReducer(authReducer, initialState)
//
//     return (
//         <SearchContext.Provider value={{user: state.user,loading: state.loading, error: state.error, dispatch}}>
//             {children}
//         </SearchContext.Provider>
//     )
// }