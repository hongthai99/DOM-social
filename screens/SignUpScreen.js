import React,{useState, useEffect,useContext} from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Input,
  Alert
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState("")
  // const [url , setUrl] = useState(undefined)

  // useEffect(() => {
  //   if(url){
  //       uploadField()
  //   }
  // },[url])
  //api cloudinary cấp 
  const uploadPhotoProfile = (image) => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "dom-clone")
    data.append("cloud_name", "DOMedia")
    fetch("https://api.cloudinary.com/v1_1/domedia/image/upload/",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data => {
        setImage(data.url)
        // setModal(false)
        console.log(data)
  })
  .catch(err=>{
      console.log(err)
  })
  }
  // api post method
const uploadField = () => {
  fetch("https://domedia-api.herokuapp.com/register",{
      method: "post",
      headers:{
          "Content-Type": "application/json"
      },
      // use JSON to define it
      body:JSON.stringify({
          name,
          password,
          email,
          // pic:url
          pic:image
      })
  }).then(res => res.json())
  //And here I can console to log data logs and I will go on this post then use double click on this button
  // get data if else condition like this.
  .then( data => {
      if(data.error){
          Alert.alert(data.error)
      }
      else{
          Alert.alert(data.message)
          navigation.navigate('Login')
      }
  }).catch(err => {
      console.log(err)
  })
}
// const PostRegister = () => {
//   if(image){
//       uploadPhotoProfile()
//   }else{
//       uploadField()
//   }
// }

// cụm này của expo image picker 
const pickImage = async () => {
  let data = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1,1],
    quality: 0.5,
  });

  console.log(data);

  if (!data.cancelled) {
    // setImage(data.uri);
    // // value(image)
    // // console.log(uri,'After set URI')
    let newfile = { 
      uri:data.uri,
      type:`test/${data.uri.split(".")[1]}`,
      name:`test.${data.uri.split(".")[1]}` 

  }
    uploadPhotoProfile(newfile)
  }
};

console.log(name, email, password,image)
//beri1@domedia.com 123456
  return(
      <View style={styles.container}>
          <Text style={styles.logo}>REGISTER</Text>
            <View style={{...styles.inputView, width:250, marginLeft:50}}>
              <TextInput
                style={styles.inputText}
                placeholder="Name..." 
                placeholderTextColor="#003f5c"
                onChangeText={name => setName(name)}
                value={name}
              />
            </View>
            <View style={styles.dm}>
              <TouchableOpacity onPress={()=>pickImage()}>
                <MaterialCommunityIcons name="account" size={18}/>
              </TouchableOpacity>
            </View>
            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                onChangeText={email => setEmail(email)}
                value={email}
                />
            </View>
            <View style={styles.inputView}>
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..."
                placeholderTextColor="#003f5c"
                onChangeText={password => setPassword(password)}
                value={password}
                />
            </View>
            <TouchableOpacity>
              <Text style={styles.forgot} onPress={() => navigation.navigate('Login')}>Do you have a account ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn }>
              <Text style={styles.loginText} 
              // onPress={() => PostRegister()}
              onPress={() => uploadField()} 
              >REGISTER</Text>
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
    fontSize:20,
    color:"#000",
    marginBottom:25
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
  },
  dm: {
    backgroundColor:"red",
    position: "absolute",
    top:226,
    left:36,
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
});
export default SignUpScreen;