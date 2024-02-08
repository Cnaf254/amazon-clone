import React,{createContext,useReducer} from 'react'

export const DataContext=createContext()

 export const DataProvider=({children,reducer,initialState})=>{
    return (
<DataContext.Provider value={useReducer(reducer,initialState)}>
    {children}
</DataContext.Provider>
    )
}
