import React,{useState, useContext} from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TextInput, Keyboard, Alert,TouchableOpacity} from 'react-native';
// import Animated, {Easing} from 'react-native-reanimated'
// import {TapGestureHandler, State} from 'react-native-gesture-handler'
// import {Link} from 'react-router-dom'
// import { login } from '../fetchAPI/action/auth';

// const {width, height} =Dimensions.get('window')
// const {Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate,concat} = Animated
// // const [emailhihi, setEmail] = useState("");
// // const [passwordhihi, setPassword] = useState("");

// function runTiming(clock, value, dest) {

//     const state = {
//       finished: new Value(0),
//       position: new Value(0),
//       time: new Value(0),
//       frameTime: new Value(0)
//     };
  
//     const config = {
//       duration: 500,
//       toValue: new Value(0),
//       easing: Easing.inOut(Easing.ease)
//     };
  
//     return block([
//       cond(clockRunning(clock), 0, [
//         set(state.finished, 0),
//         set(state.time, 0),
//         set(state.position, value),
//         set(state.frameTime, 0),
//         set(config.toValue, dest),
//         startClock(clock)
//       ]),
//       timing(clock, state, config),
//       cond(state.finished, debug('stop clock', stopClock(clock))),
//       state.position
//     ]);
// }

// const PostLogin = async (email, password) => {
//     const response = await login(emailhihi,passwordhihi); // thai@domedia.com   123456
//     const resData = await response.json();
//     console.log(resData);
// }
// export default class LoginScreen extends Component {
    
//     constructor(){
//         super();
//         // this.state={
//         //     email:emailhihi ,
//         //     password:passwordhihi ,
//         // }

//         this.buttonOpacity = new Value(1);

//         this.onStateChange = event([
//             {
//                 nativeEvent:({state})=>block([
//                     cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(),1,0)))
//                 ])
//             }
//         ]);
//         this.buttonY = interpolate(this.buttonOpacity, {
//             inputRange:[0,1],
//             outputRange:[100,0],
//             extrapolate:Extrapolate.CLAMP
//         });
//         this.bgY = interpolate(this.buttonOpacity, {
//             inputRange:[0,1],
//             outputRange:[-height/3.5,0],
//             extrapolate:Extrapolate.CLAMP
//         });
//         this.textInputZindex = interpolate(this.buttonOpacity, {
//             inputRange:[0,1],
//             outputRange:[1,-1],
//             extrapolate:Extrapolate.CLAMP
//         });
//         this.textInputY = interpolate(this.buttonOpacity, {
//             inputRange:[0,1],
//             outputRange:[0,100],
//             extrapolate: Extrapolate.CLAMP
//         });
//         this.textInputOpacity = interpolate(this.buttonOpacity, {
//             inputRange:[0,1],
//             outputRange:[1,0],
//             extrapolate: Extrapolate.CLAMP
//         });
//         this.rotateCross = interpolate(this.buttonOpacity, {
//             inputRange:[0,1],
//             outputRange:[180,360],
//             extrapolate: Extrapolate.CLAMP
//         });
//         this.onCloseState = event([
//             {
//                 nativeEvent:({state})=>block([
//                     cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(),0,1)))
//                 ])
//             }
//         ]);
//     }

//     render(){  
//         console.log(this.state.emailhihi,this.state.passwordhihi)
//         return(
//             <View style={{flex:1, backgroundColor:'white', justifyContent:'flex-end'}}>
//                 <Animated.View style={{...StyleSheet.absoluteFill,transform:[{translateY:this.bgY}]}}>
//                     <Image 
//                         source={require('../assets/bg.jpg')}
//                         style={{flex:1, height:null, width:null}}
//                     />
//                 </Animated.View>
//                 <View style={{height:height/3.5}}>
//                     <TapGestureHandler onHandlerStateChange={this.onStateChange}>
//                         <Animated.View style={{...styles.button, opacity:this.buttonOpacity, transform:[{translateY:this.buttonY}]}}>
//                             <Text style={{fontWeight:'bold', fontSize: 15}}>SIGN IN</Text>
//                         </Animated.View>
//                     </TapGestureHandler>
//                     <Animated.View style={{...styles.button, opacity:this.buttonOpacity, transform:[{translateY:this.buttonY}]}}>
//                         <Text
//                             onPress={() =>
//                                 this.props.navigation.navigate('SignUp')}
//                             style={{fontWeight:'bold', fontSize: 15}}>SIGN UP</Text>
//                     </Animated.View>
//                     <Animated.View style={{...styles.ForgotPassword, opacity:this.buttonOpacity, transform:[{translateY:this.buttonY}]}}>
//                         <Text style={{fontSize: 15, color:'white'}}>Forgot password?</Text>
//                     </Animated.View>
//                     <Animated.View style={{zIndex:this.textInputZindex, 
//                                            opacity:this.textInputOpacity, 
//                                            transform:[{translateY:this.textInputY}],
//                                            height:height/3.5, 
//                                            ...StyleSheet.absoluteFill, 
//                                            top: null, 
//                                            justifyContent:'center'}}>
//                         <TapGestureHandler onHandlerStateChange={this.onCloseState}>
//                             <Animated.View style={styles.CloseButtom}>
//                                 <Animated.Text style={{fontSize:15, transform:[{rotate:concat(this.rotateCross,'deg')}]}}>
//                                     X
//                                 </Animated.Text>
//                             </Animated.View>
//                         </TapGestureHandler>
//                         <TextInput 
//                         placeholder="EMAIL"
//                         style={styles.TextInput}
//                         value={email}
//                         onChange={(event) => setEmail(event.target.value)}
//                         placeholderTextColor="black"
//                         />
//                         <TextInput 
//                         placeholder="PASSWORD"
//                         value={password}
//                         onChange={(event) => setPassword(event.target.value)}
//                         // value={passwordhihi}
//                         // onChangeText={setPassword}
//                         // onChange={setPassword=(password)}
//                         secureTextEntry={true}
//                         style={styles.TextInput}
//                         placeholderTextColor="black"
//                         />
//                         <Animated.View style={styles.button}>
//                             <Text 
//                             onPress={() => Postlogin()}
//                             // onPress={() =>
//                             //     this.props.navigation.navigate('HomeScreen')}
//                             style={{fontSize: 15, fontWeight:'bold'}}> 
//                             SIGN IN
//                             </Text>
//                         </Animated.View>
//                     </Animated.View>
//                 </View>
//             </View>
//         )
//     }
// }



// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'center',
//     },
//     button:{
//         backgroundColor:'white',
//         height:60,
//         marginHorizontal: 45,
//         borderRadius: 30,
//         alignItems:'center',
//         justifyContent:'center',
//         marginVertical:5,
//         shadowOffset:{width: 2, height:2},
//         shadowColor:'black',
//         shadowOpacity: 0.2
//     },
//     TextInput:{
//         height:50,
//         borderRadius:30,
//         borderWidth:1,
//         marginHorizontal:45,
//         paddingLeft:20,
//         marginVertical:5,
//         borderColor: '#D9D9D6',
//     },
//     CloseButtom:{
//         height:40,
//         width: 40,
//         backgroundColor:'white',
//         borderRadius: 20,
//         backgroundColor:'white',
//         alignItems:'center',
//         justifyContent:'center',
//         position:'absolute',
//         top: -25,
//         left: width/2-20,
//         shadowOffset:{width: 2, height:2},
//         shadowColor:'black',
//         shadowOpacity: 0.2
//     },
//     ForgotPassword:{
//         alignItems:'center',
//         justifyContent:'center',
//         position:'absolute',
//         bottom: 65,
//         left: width/2-60,
//     },
// });
import {UserContext} from '../navigation/Routes'
import AsyncStorage from '@react-native-community/async-storage';
const LoginScreen = ({navigation}) => {
    const {state, dispatch} = useContext(UserContext)
    
    const [email, setEmail] = useState("") // make it set the name with the name
    const [password, setPassword] = useState("") // 
    // make method to post login
    const PostLogin = async () => {
        // simple check this is a real email
        // instead of use axois so i use fetch
        fetch("https://domedia-api.herokuapp.com/login",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
        .then( data => {
            console.log(data, "login")
            if(data.error){
                Alert.alert(data.error)
            }
            else{
                // AsyncStorage.setItem("jwt", data.token) //store token
                // saveDataUser(data.token, data.user) //
                savetoken(data.token)
                // console.log(data.token)
                // AsyncStorage.setItem("user",JSON.stringify(data.user)) // store data user
                saveDataUser(data.user) //
                // console.log(data.user)
                dispatch({type:"USER", payload:data.user})
                // saveDataUser(data.token, data.user)
                Alert.alert("Hí anh em")
                navigation.navigate('HomeScreen')
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const saveDataUser = (user) => {
      AsyncStorage.setItem("user", JSON.stringify({
        user: user
      }))
      // console.log(user)
      // AsyncStorage.setItem("user",JSON.stringify(data.user))
    }
    const savetoken = ( token ) => {
      AsyncStorage.setItem('jwt', JSON.stringify({
            token: token,
          }))
      console.log(token)
    }
    // console.log(email, password) thai@domedia.com 123456
    // beri1@domedia.com 123456
    // console.log(data.token)
    // console.log(token)
    return(
        <View style={styles.container}>
            <Text style={styles.logo}>...</Text>
            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Email..." 
                placeholderTextColor="#003f5c"
                onChangeText={email => setEmail(email)}
                value={email}/>
            </View>
            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..." 
                placeholderTextColor="#003f5c"
                onChangeText={password => setPassword(password)}
                value={password}/>
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText} onPress={() => PostLogin()}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.loginText} onPress={() => navigation.navigate('SignUp')} >REGISTER</Text>
            </TouchableOpacity>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#003f5c',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#000",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#D3D3D3",
      borderRadius:15,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"#000"
    },
    forgot:{
      color:"#000",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5",
      borderRadius:15,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"#000"
    }
  });
export default LoginScreen;
