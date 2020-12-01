import React,{useState} from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import * as Permissions from 'expo-permissions';


const CreateScreen = ({navigation}) => {
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    // const [picture,setPicture] = useState("")
    // const [url,setUrl] = useState("")
    const [image, setImage] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    

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
    //
    // useEffect(()=>{

    //         const token = await AsyncStorage.getItem('jwt')
    //     fetch("https://domedia-api.herokuapp.com/createnewsfeed",{
    //         method: "post",
    //         headers:{
    //             "Content-Type": "application/json",
    //             "Authorization": "" + JSON.parse(token).token
    //         },
    //         body:JSON.stringify({
    //             title,
    //             body,
    //             pic:image
    //         })
    //     }).then(res => res.json())
    //     .then( data => {
    //         if(data.error){
    //             Alert.alert(data.error)
    //         }
    //         else{
    //             Alert.alert("Okay")
    //             navigation.navigate('Home')
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    //     console.log(token, "Token in Create")
    // },[image])

    const upload = () => {
        async function fetchApi() {
            try{
                const token = await AsyncStorage.getItem('jwt')
                console.log(token, "token in create")
                fetch("https://domedia-api.herokuapp.com/createnewsfeed",{
                    method: "post",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": "" + JSON.parse(token).token
                    },
                    body:JSON.stringify({
                        title,
                        body,
                        pic:image
                    })
                }).then(res => res.json())
                .then(data => {
                    if(data.error){
                        Alert.alert(data.error)
                    } else {
                        Alert.alert('Okay')
                        navigation.navigate('Home')
                    }
                })
                .catch(err => {
                    console.log(err)
                })   
                
            }catch(err){
                console.log(err)
            }
        } fetchApi()
      }

    //   fetch("https://domedia-api.herokuapp.com/createnewsfeed",{
    //         method: "post",
    //         headers:{
    //             "Content-Type": "application/json",
    //             "Authorization": "" + JSON.parse(token).token
    //         },
    //         // use JSON to define it
    //         body:JSON.stringify({
    //             title,
    //             body,
    //             // pic:url
    //             pic:image
    //         })
    //     }).then(res => res.json())
    //     //And here I can console to log data logs and I will go on this post then use double click on this button
    //     // get data if else condition like this.
    //     .then( data => {
    //         if(data.error){
    //             Alert.alert(data.error)
    //         }
    //         else{
    //             Alert.alert(data.message)
    //             navigation.navigate('Login')
    //         }
    //     }).catch(err => {
    //         console.log(err)s
    //     })


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
          // console.log(uri,'After set URI')
          // note 
          /// error
          
          let newfile = { 
            uri:data.uri,
            type:`test/${data.uri.split(".")[1]}`,
            name:`test.${data.uri.split(".")[1]}` 
        }
          uploadPhotoProfile(newfile)
          setSelectedImage({ localUri: data.uri })
          console.log({localUri: data.uri}, "Test");
        }
      };
// beri1@domedia.com

///
    // const pickCamera = async () => {

    //   const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    //     if (permission.status !== 'granted') {
    //   const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     if (newPermission.status === 'granted') {
    //     //its granted.
    //      }
    //       } else {
    //       }

    //   // let data = await ImagePicker.launchCameraAsync({
    //   //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   //   allowsEditing: true,
    //   //   aspect: [1,1],
    //   //   quality: 0.5,
    //   // });
    //   // if (!data.cancelled) {
    //   //   // setImage(data.uri);
    //   //   // // value(image)
    //   //   // console.log(uri,'After set URI')
    //   //   // note 
    //   //   /// error
        
    //   //   let newfile = { 
    //   //     uri:data.uri,
    //   //     type:`test/${data.uri.split(".")[1]}`,
    //   //     name:`test.${data.uri.split(".")[1]}` 
    //   // }
    //   //   uploadPhotoProfile(newfile)
    //   //   setSelectedImage({ localUri: data.uri })
    //   //   console.log({localUri: data.uri}, "Test");
    //   // }
    // }

    const pickFromCamera = async () => {
      const permissions = Permissions.CAMERA;
      const { status } = await Permissions.askAsync(permissions);
  
      console.log(permissions, status);
      if(status === 'granted') {
        let data = await ImagePicker.launchCameraAsync({
          mediaTypes: 'Images',
          aspect: [1,1],
          quality: 0.5,
        }).catch(error => console.log(permissions, { error }));
        if (!data.cancelled) {
          // setImage(data.uri);
          // // value(image)
          // console.log(uri,'After set URI')
          // note 
          /// error
          
          let newfile = { 
            uri:data.uri,
            type:`test/${data.uri.split(".")[1]}`,
            name:`test.${data.uri.split(".")[1]}` 
        }
          uploadPhotoProfile(newfile)
          setSelectedImage({ localUri: data.uri })
          console.log({localUri: data.uri}, "Test");
        }
        console.log(permissions, 'SUCCESS', data);
      }
    }

    /// note


// console.log(image, "image Link create post");
    return(
        <View style={styles.container}>
            <Text style={styles.logo}>NEW</Text>
              {/* <View style={{...styles.inputView, width:250, marginLeft:50}}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Name..." 
                  placeholderTextColor="#003f5c"
                //   onChangeText={name => setName(name)}
                //   value={name}
                />
              </View> */}
              <>
                  {
                    selectedImage ?
                    <Image style={styles.dm} source={{uri: selectedImage.localUri}}/>
                    :
                    <View style={{...styles.dm, flexDirection: 'row'}}>
                      <TouchableOpacity onPress={()=>pickImage()}>
                        <MaterialCommunityIcons name="shape-rectangle-plus" size={18} style={{margin: 10}}/>
                      </TouchableOpacity> 
                      <TouchableOpacity onPress={()=>pickFromCamera()}>
                        <MaterialCommunityIcons name="camera" size={18} style={{margin: 10}}/>
                      </TouchableOpacity> 
                    </View>
                  }
              </>
              <View style={styles.inputView} >
                <TextInput  
                  style={styles.inputText}
                  placeholder="Title"
                  placeholderTextColor="#003f5c"
                  onChangeText={title => setTitle(title)}
                  value={title}
                  />
              </View>
              <View style={styles.inputView}>
                <TextInput  
                  style={styles.inputText}
                  placeholder="More"
                  placeholderTextColor="#003f5c"
                  onChangeText={body => setBody(body)}
                  value={body}
                  />
              </View>
              <TouchableOpacity style={styles.loginBtn }>
                <Text style={styles.loginText} 
                onPress={() => upload()} 
                >POST</Text>
              </TouchableOpacity>
        </View>
    )
}

// 
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
      backgroundColor:"#fff",
      width: 300,
      height: 300,
      borderRadius: 15,
      marginBottom:20,
      alignItems: "center",
      justifyContent: "center"
    },
  });

export default CreateScreen;
