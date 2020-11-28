import React,{createContext,useReducer, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {reducer, initialState} from '../reducer/userReducer';
import AsyncStorage from '@react-native-community/async-storage'
export const UserContext = createContext();
const Routes = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // useEffect( async ()=> {
    //   try {
    //     const user = await AsyncStorage.getItem("user")
    //      if(user){
    //         dispatch({type:"USER", payload:user})
    //         //history.push('/')
    //       }else{
    //         navigation.navigate('Login')
    //       }
    //       console.log(user, "User navigation")
    //     }
    //     catch(err){
    //       console.log(err)
    //     }
         
    // }, [])

    useEffect(() => {
      async function fetchData() {
        const user = await AsyncStorage.getItem("user")
         if(user){
            dispatch({type:"USER", payload:user})
            // routeName = 'HomeScreen'
          }
          else{
            this.props.navigation.navigate('Login')
          }
        }
        fetchData();
    }, []);
    // useEffect(() => {
    //   async function fetchToken() {
    //     const tokenuser = await AsyncStorage.getItem("jwt")
    //     }
    //     fetchToken();
    // }, []);
    
    return(
        <UserContext.Provider value={{state, dispatch}}>
            <NavigationContainer >
            <AuthStack/>
            </NavigationContainer>
        </UserContext.Provider>
        // <NavigationContainer >
        // <AuthStack/>
        // </NavigationContainer>
        
    );
};
export default Routes;