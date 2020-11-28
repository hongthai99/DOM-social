import React,{useReducer, createContext} from 'react';
import Provider from './navigation';
//
// import {reducer, initialState} from './reducer/userReducer';
// import {BrowserRouter} from 'react-router-dom';
//
// export const UserContext = createContext()
const App = () => {
  //
  // const [state, dispatch] = useReducer(reducer, initialState)
  //
  //
  return(
    // <UserContext.Provider value={{state, dispatch}}>
    //   <BrowserRouter>
    //   <Provider/>
    //   </BrowserRouter>
    // </UserContext.Provider>
      <Provider 
      // value={{state, dispatch}}
      />
    
  )
}

export default App;