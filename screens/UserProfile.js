import React,{useState, useContext, useEffect} from 'react';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import {useParams} from 'react-router-dom'

import {
  SafeAreaView, 
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../navigation/Routes'
import { useRoute } from '@react-navigation/native';


// const UserProfile = ({navigation}) => {

const UserProfile = ({navigation}) => {
    const [iduserprofile, setIdUserProfile] = useState([])
    const [userProfile, setProfile] = useState(null)
    const [tokenuserprofile, setTokenUserProfile] = useState([])

    // console.log(iduserprofile, "IDDDDDDDDDDDDDD");
    // console.log(tokenuserprofile, "TOKEENNNNNNNNNNN");


    const {state, dispatch} = useContext(UserContext)
    const [showFollow, setFollow] = useState(state?!state.following.includes(iduserprofile):true)
    // useEffect(() => {
    //     // useCallback(
    //     async function userprofile() {
    //         // setRefreshing(true);
    //         try{
    //             const idd = await AsyncStorage.getItem('IdUserProfile')
    //             setIdUserProfile(JSON.parse(idd).userid)
    //         }
    //         catch(err){
    //             console.log(err)
    //         }
    //     }
    //     // callback
    //     userprofile()
    // }, [])

    // console.log(id, "user profile id");
    // const productId = navigation.params('UserID', null)
    // console.log(navigation)
    // const id = useRoute()
    // console.log(id)
    // useEffect(() => {
    //      console.log(route, 'route');
    //  }, [route])
    // console.log(navigation.getParam('item'));
    // const {ID} = navigation.state.params;
    // console.log(ID);
    // console.log(navigation)
    // console.log({route})
    // const { productId } = navigation.getParams('productID');
    // console.log(productId, "id in user profile")
    // const { params } = navigation.state;
    // const [userProfile, setProfile] = useState(null)
    // const {state, dispatch} = useContext(UserContext)
    // const {userid} = route.params;
    // console.log(userid, "ID user")
//    const useridd = JSON.stringify(navigation.getParam('userid'))
    // console.log(userid, "user id")
    // const [showFollow, setFollow] = useState(state?!state.following.includes(userid):true)
    
    // useEffect(()=>{
    //     fetch('/mynewsfeed', {
    //         headers:{
    //             "Authorization": "" + localStorage.getItem("jwt")
    //         }
    //     }).then(res => res.json())
    //     .then(result => {
    //         setMypic(result.mynewsfeed)
    //     })
    // },[])
    //beri1@domedia.com
    //thai@domedia.com

    // console.log(userid, "user id")
    // async function  getABC () {
    //     let A = await AsyncStorage.getItem('IdUserProfile');
    //     console.log(getABC.A);
        
    // }


    useEffect(() => {
        async function fetchMyAPI() {
            try{
                setIdUserProfile(JSON.parse(await AsyncStorage.getItem('IdUserProfile')).userid)
                setTokenUserProfile(await AsyncStorage.getItem('jwt'))
                    await fetch(`https://domedia-api.herokuapp.com/user/${JSON.parse(await AsyncStorage.getItem('IdUserProfile')).userid}`,{
                    headers:{
                        "Authorization": "" + JSON.parse(await AsyncStorage.getItem('jwt')).token
                    }
                  
                }).then(res=>res.json())
                .then(result => {
                    setProfile(result)
                })
            }catch(err){
                console.log(err)
            }
        }
        fetchMyAPI()
      }, [])

      console.log(userProfile);

    //   console.log(mypic, "My picture")

    const followUser = () => {
        fetch('https://domedia-api.herokuapp.com/follow', {
            method:"put",
            headers:{
                "Content-Type":"application/json", 
                "Authorization": "" + JSON.parse(tokenuserprofile).token
            },
            body:JSON.stringify({
                followId:iduserprofile
            })
        }).then(res=>res.json())
        .then(data => {
            //console.log(data)
            dispatch({type:"UPDATE", 
                    payload:{
                        following:data.following, 
                        followers:data.followers
                    }
            })
            AsyncStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            }) 
            setFollow(false) 
        })
    }

    // //make a unfollower user
    const unfollowUser = () => {
        fetch('https://domedia-api.herokuapp.com/unfollow', {
            method:"put",
            headers:{
                "Content-Type":"application/json", 
                "Authorization": "" + JSON.parse(tokenuserprofile).token
            },
            body:JSON.stringify({
                unfollowId:iduserprofile
            })
        }).then(res=>res.json())
        .then(data => {
            //console.log(data)
            dispatch({type:"UPDATE", 
                    payload:{
                        following:data.following, 
                        followers:data.followers
                    }
            })
            AsyncStorage.setItem("user", JSON.stringify(data))
            
            setProfile((prevState) => {
                const newFollower = prevState.user.followers.filter(item => item != data._id)
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setFollow(true)
        })
    }
    // end of api

    // beri1@domedia.com
        return(
          <>
          {
            userProfile ? 
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex:1, justifyContent:"space-between", marginTop:20, marginLeft:310}}>
                        <MaterialCommunityIcons name="home" size={22} 
                                                onPress = {() => {
                                                    navigation.navigate('Home')
                                                }}/>
                    </View>
                    <View style={{alignSelf:"center"}}>
                        <View style={styles.profileImage}>
                            <Image
                            source={{uri: userProfile.user.pic}}
                            style={styles.image}
                            resizeMode="center"
                            />
                        </View>
                        {/* <View style={styles.dm}>
                                <Text style={{fontSize:14}}
                                //  onPress={() => followUser()}
                                    >Follow</Text>
                            </View> */}
                        {
                            showFollow 
                            ? 
                            <View style={styles.dm}>
                                <Text style={{fontSize:14}}
                                 onPress={() => followUser()}
                                 >
                                     Follow</Text>
                            </View>
                            :
                            <View style={styles.dm}>
                                <Text style={{fontSize:14}}
                                onPress={() => unfollowUser()}
                                >UnFollow</Text>
                            </View>
                        }
                        
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { color: "#001111",fontWeight: "400", fontSize: 30 }]}>{userProfile.user.name}</Text>
                        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Photographer</Text>
                    </View>
                    <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 14 }]}>{userProfile.posts.length}</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 14 }]}>{userProfile.user.followers.length}</Text>
                        <Text style={[styles.text, styles.subText]}>Followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 14 }]}>{userProfile.user.following.length}</Text>
                        <Text style={[styles.text, styles.subText]}>Following</Text>
                    </View>
                </View>
                <View style={{ marginTop: 32 }}>
                  <View>
                   {
                    userProfile.posts.map(item => {
                        return(
                            <View style={styles.mediaImageContainer} key={item._id}>
                                <Image source={{uri: item.picture}} style={styles.image} alt={item.title} resizeMode="cover"></Image>
                            </View>
                        )
                    })
                   } 
                  </View>   
                </View>
              </ScrollView>
            </SafeAreaView>
            :
              <View style={styles.container}>
                <Text>
                    Loading ... 
                </Text>
              </View>
          }
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage:{
        width:160,
        height:160,
        borderRadius:80,
        overflow:"hidden"
    },
    image:{
        flex:1,
        width: undefined,
        height:undefined,
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        margin:25
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    mediaImageContainer: {
        width: 330,
        height: 330,
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 12
    },
    text: {
        color: "#52575D"
    },
    dm: {
        backgroundColor: "gray",
        position: "absolute",
        bottom: 5,
        right: -15,
        width: 70,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default UserProfile;