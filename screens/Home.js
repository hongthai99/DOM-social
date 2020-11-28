import React,{useState, useEffect, useContext, useCallback} from 'react'
import Constants from 'expo-constants';
import {
  SafeAreaView, 
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../navigation/Routes'
import {useLinkProps, useLinkTo} from '@react-navigation/native'
// import { useNavigation } from '@react-navigation/native';



const HomeeScreen = ({navigation}) => {
        const [data, setData] = useState([])
        const {state, dispatch} = useContext(UserContext)
        const [token, setToken] = useState([])
        const [text, setText] = useState("")
        const linkTo = useLinkTo();
        // const navigation = useNavigation();
        // Pull to refresh
        // const [refreshing, setRefreshing] = useState(false);
        // const [listData, setListData] = useState(data);
        // const [refreshing, setRefreshing] = useState(false)
        // useEffect(()=>{
        //     fetch('https://domedia-api.herokuapp.com/newsfeed',{
        //         headers:{
        //             "Authorization": "" + AsyncStorage.getItem("jwt")
        //         }
                
        //     }).then(res=>res.json())
        //     .then(result => {
        //         console.log(result)
        //         setData(result.posts)
        //     })
        // },[])
        
        useEffect(() => {
            // useCallback(
            async function fetchMyAPI() {
                // setRefreshing(true);
                try{
                    const token = await AsyncStorage.getItem('jwt')
                    setToken(token)
                    //console.log(JSON.parse(token).token)
                    let result = await fetch('https://domedia-api.herokuapp.com/newsfeed',{
                        headers:{
                            "Authorization": "" + JSON.parse(token).token
                        }
                      
                    }).then(res=>res.json())
                    // console.log(result)
                    setData(result.posts)
                    // setRefreshing(result)
                    // Test Pull to refresh
                    // setListData(responseJson.result.concat(data));
                    // setRefreshing(false)
                }catch(err){
                    console.log(err)
                }
                
            }
            // callback
            // )
            fetchMyAPI()
          }, [])
        // const onRefresh = useCallback(() => {
        //     setRefreshing(true)
        //     setData(true)
        // }, [refreshing])

        //   console.log(token, "test token")
          const deletePost = (postid) => {
            fetch(`https://domedia-api.herokuapp.com/deletepost/${postid}`,{
                method:"delete",
                headers:{
                    "Authorization": "" + JSON.parse(token).token
                }
            }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newdata = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newdata)
            })
        }
        const likePost = (id) => {
            fetch('https://domedia-api.herokuapp.com/like', {
                method: "put",
                headers:{
                    "Content-Type":"application/json", 
                    "Authorization": "" + JSON.parse(token).token
                },
                body:JSON.stringify({
                    postId:id
                })
            }).then(res => res.json())
            .then(result => {
                //console.log(result)
                const newData = data.map(item => {
                    if(item._id == result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
        }
    // beri1@domedia.com
        const unlikePost = (id) => {
            fetch('https://domedia-api.herokuapp.com/unlike', {
                method: "put",
                headers:{
                    "Content-Type":"application/json", 
                    "Authorization": "" + JSON.parse(token).token
                },
                body:JSON.stringify({
                    postId:id
                })
            }).then(res => res.json())
            .then(result => {
               // console.log(result)
                const newData = data.map(item => {
                    if(item._id == result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
        }

        const makeComment = (text, postId) =>{
            fetch('https://domedia-api.herokuapp.com/comment', {
                method:"put",
                headers:{
                    "Content-Type":"application/json", 
                    "Authorization": "" + JSON.parse(token).token
                },
                body:JSON.stringify({
                    postId,
                    text
                })
            }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if(item._id == result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
        }

        const selectItemHandler = (id) => {
            navigation.navigate('UserProfile', {
                params : {
                    productID: '12345'
                }
            });
            console.log(id, "Id will pass to user profile")
        };
    
         // const tokenUser = AsyncStorage.getItem("jwt")
        // console.log(tokenUser, "token Home")
        // try {const userData = await AsyncStorage.getItem('jwt')
        //     console.log(userData);
        // }catch(err){

        //     console.log(err)}
        //email: beri1@domedia.com
        // pass: 123456
        // console.log(data)

        return(
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false}>
                {/* <RefreshControl refreshing={refreshing} onRefresh={onRefresh}> */}
                { data.map(item => (
                    <View style={styles.card} key={item._id}>
                    <View style={styles.userInfo}>
                        <Image
                        source={require('../assets/j.jpg')}
                        // source={{uri: user.pic}}
                        style={styles.userImg} />
                        <View style={styles.userInfoText}>
                            <Text style={styles.userName} 
                            // onPress={() => linkTo(item.postedBy._id !== state._id ? "/Profile/" + item.postedBy._id : "/Profile")}
                            // onPress={() => linkTo("/UserProfile/" ,{
                            // })}
                            onPress={() => selectItemHandler(item.postedBy._id)}
                            //onPress={() => navigation.navigate('UserProfile', {JSON_ListView_Clicked_Item: item.postedBy._id,} )}
                            // onPress={() => navigation.navigate('UserProfile', {
                            //     screen : 'userProfile',
                            //     params: {
                            //         userid: item.postedBy._id
                            //     }
                            // })}
                            // onPress={() => {
                            //     navigation.navigate('UserProfile', {
                            //       userid: item.postedBy._id,
                            //     });
                            //   }}
                            // onPress={() =>
                            //     navigation.navigate('UserProfile', {
                            //       paramKey: item.postedBy._id,
                            //     })
                            //   }
                            // onPress={() => navigation.navigate('UserProfile', item)}
                            // onPress={() => navigation.navigate('UserProfile', 
                            // {
                            //     itemId: 86,
                            //     otherParam: 'anything you want here',
                            // })}
                            >{item.postedBy.name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.postText}>
                        <Text>{item.title}</Text> 
                    </View>
                    <View>
                        <Image
                        style={styles.postImg}
                        source={{uri: item.picture}}/>
                        {
                            item.postedBy._id == state._id && 
                            <View style={styles.dm}>
                            <MaterialCommunityIcons name="delete-empty-outline" size={18} color="#000"
                                                    onPress={() => deletePost(item._id)}/>
                        </View>
                        }
                    </View>
                    <View style={styles.Interaction}>
                        {
                            item.likes.includes(state._id)
                            ?
                            <View style={styles.like}>
                                <Text onPress={()=>{unlikePost(item._id)}}>{item.likes.length} Unlike</Text>
                            </View>
                            : 
                            <View style={{...styles.like, color:"red"}}>
                                <Text onPress={()=>{likePost(item._id)}}>{item.likes.length} Like</Text>
                            </View>
                        }
                        
                        <View style={styles.like}>
                            <Text>{item.comments.length} Comment</Text>
                        </View>
                    </View>
                    
                    {
                        item.comments.map(record => {
                            return(
                                <View style={styles.commentZone} key={record._id}>
                                   <View >
                                      <Text style={styles.commentPeople}>{record.postedBy.name}</Text>
                                   </View>
                                   <View>
                                      <Text style={{...styles.commentPeople, marginLeft:2}}>:</Text>
                                   </View>
                                   <View>
                                      <Text style={{...styles.commentPeople, fontWeight:null,marginLeft:2}}>{record.text}</Text>
                                   </View>
                                </View>
                            )
                        })
                    }
                    <View style={{flexDirection: "row", 
                                  justifyContent:"flex-start",
                                  borderTopWidth: 1,
                                  borderColor: '#EEE',
                                  alignItems: 'center',}}>
                        <TextInput style={{...styles.commentInput, flex: 1,height: 40}} 
                                   placeholder="Comment"
                                   onChangeText={text => setText(text)}
                                   value={text}
                               >
                        </TextInput>
                        <TouchableOpacity style={{height: 40,
                                          paddingHorizontal: 20,
                                          alignItems: 'center',
                                          justifyContent: 'center'}}>
                           <Text onPress={() => {
                                makeComment(text, item._id)
                               }}>
                               Post
                           </Text>
                       </TouchableOpacity>
                    </View>
                    
                </View> 
                ))
                }
                {/* <FlatList data={data}
                renderItem={RenderDataListView}
                key={item._id}
                keyExtractor={item => item._id}
                //thai@domedi.com
                /> */}
                {/* </RefreshControl> */}
                </ScrollView>
                </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
        marginTop: Constants.StatusBar
    },
    scrollView: {
        marginHorizontal: 20,
      },
    card:{
        backgroundColor: '#f8f8f8',
        width: 333,
        marginBottom: 20,
        borderRadius: 10
    },
    userInfo:{
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 15
    },
    userImg:{
        width:50,
        height:50,
        borderRadius:25,
    },
    userName:{
        fontSize: 15,
        fontWeight: "bold"
    },
    userInfoText:{
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 10
    },
    postText:{
        fontSize:15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    postImg:{
        width:333,
        height:333,
        marginTop: 15,
        borderRadius:10,
    },
    Interaction:{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
    },
    commentZone:{
        flexDirection: "row",
    },
    commentPeople:{
        fontWeight:"bold",
        fontSize:15,
        marginLeft: 15,
        marginBottom: 15
    },
    dm: {
        backgroundColor: "red",
        position: "absolute",
        top: 22,
        right:10,
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    commentInput:{
        height:40,
        fontSize:15,
        color:"#000",
        marginLeft: 15,
    }
});
export default HomeeScreen;