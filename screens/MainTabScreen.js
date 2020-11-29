import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import CreateScreen from './CreateNewFeed';
import ProfileScreen from './Profile';
import UserProfileScreen from './UserProfile';
// import UserTabScreen from './UserTabScreen';
import HomeeScreen from './Homee';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator()

const HomeStack = createStackNavigator();
const HomeeStack = createStackNavigator();
const CreateStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const UserStack = createStackNavigator();
//home-variant

export default function MainTabScreen () {
  return (
    <Tab.Navigator
    // đổi lại home thành Homee khi final
    //beri1@domedia.com
      initialRouteName="Home"
      activeColor="#fff"
      style={{backgroundColor: null }}
      barStyle={{ backgroundColor: '#252A36',height:70}}>
        <Tab.Screen
        name="Homee"
        component={HomeeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeTabs}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bubble" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateStackScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gamepad-round-outline" color={color} size={22} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="UserProfile" // name
        component={UserStackScreen} 
        options={{
          tabBarLabel: 'User Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={22} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
   
)};

//
//  home customs

function HomeTabs() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Home"
        component={HomeStackScreen}
        // options={{
        //   tabBarLabel: 'Explore',
        //   tabBarIcon: ({ color }) => (
        //     <MaterialCommunityIcons name="chart-bubble" color={color} size={22} />
        //   ),
        // }}
      />
      <UserStack.Screen
        name="UserProfile" // name
        component={UserStackScreen} 
        // options={{
        //   tabBarLabel: 'User Profile',
        //   tabBarIcon: ({ color }) => (
        //     <MaterialCommunityIcons name="account-outline" color={color} size={22} />
        //   ),
        // }}
      />
    </UserStack.Navigator>
  );
}


//  //

// const Main = createStackNavigator();
// const MainScreen = () => {
//     <HomeStack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#009387'},
//         headerTintColor:'#fff',
//         headerTitleStyle:{
//             fontWeight:'bold'},
//     }}>
//         <HomeStack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//             title:'Home'
//         }}
//         />

//     </HomeStack.Navigator>
// }

// // // 

// export default MainTabScreen;
const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387'},
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:'bold'},
    }}>
        <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
            title:'Home'
        }}
        />

    </HomeStack.Navigator>
);
const HomeeStackScreen = ({navigation}) => (
  <HomeeStack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: '#009387'},
      headerTintColor:'#fff',
      headerTitleStyle:{
          fontWeight:'bold'},
  }}>
      <HomeeStack.Screen
      name="Homee"
      component={HomeeScreen}
      options={{
          title:'Homee'
      }}
      />

  </HomeeStack.Navigator>
);
const CreateStackScreen = ({navigation}) => (
    <CreateStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387'},
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:'bold'}
    }}>
        <CreateStack.Screen
        name="Create"
        component={CreateScreen}
        options={{
            title:'New Post'
        }}
        />

    </CreateStack.Navigator>
);
const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387'},
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:'bold'}
    }}>
        <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
            title:'New Post'
        }}
        />

    </ProfileStack.Navigator>
);

// user profile
const UserStackScreen = ({navigation}) => (
  <UserStack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: '#009387'},
      headerTintColor:'#fff',
      headerTitleStyle:{
          fontWeight:'bold'}
  }}>
      <UserStack.Screen
      name="UserProfile"
      component={UserProfileScreen}
      options={{
          title:'New Post'
      }}
      />

  </UserStack.Navigator>
)
