import React, {createContext, Dispatch, useReducer} from "react";





const INITIAL_STATE = {
    destination: "",
    dates: [{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    }],
    options: {
        adult: 0,
        children: 0,
        room: 0,
    },
}



type State = typeof INITIAL_STATE


type AuthAction = {
    type: "NEW_SEARCH" | "RESET_SEARCH"
    payload: State
}

export type ContextState = {
    dispatch: Dispatch<AuthAction>
} & State

export const SearchContext = createContext<ContextState>(INITIAL_STATE as any)


const SearchReducer = (state: State, action: AuthAction) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state
    }
}



export const SearchContextProvider = ({children}: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)


    return (
        <SearchContext.Provider
            value={{destination: state.destination,options: state.options,dates: state.dates,dispatch}}>
            {children}
        </SearchContext.Provider>
    )
}