import React,{useReducer, createContext, useEffect, useContext} from 'react';
import Routes from './Routes';
// import {Route} from 'react-router-dom';

// export const UserContext = createContext()
// //
// import AsyncStorage from '@react-native-community/async-storage';
// import {UserContext} from '../App'
//
//
const Provider = () => {
  //
  // const {state, dispatch} = useContext(UserContext)

    // useEffect(() => {
    // const user = JSON.parse(AsyncStorage.getItem("user"))
    // if(user){
    //   dispatch({type:"USER", payload:user})
    //   //history.push('/')
    // }else{
    //   navigation.navigate('Login')
    // }
    // },[])

    //
    return(
      // <Route>
      //    <Routes />
      // </Route>
      <Routes />
       
    );
} 
export default Provider;