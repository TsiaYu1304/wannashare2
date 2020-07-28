import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from "react-native";
import { OrderStackNavigation,PostStackNavigation, OrderTabNavigation ,HomeStackNavigation ,UserNavigation} from "../screen"
import HomeScreen from "../screen/HomeScreen";
import AddScreen from "../screen/AddScreen.js";
import TakePicture from "../screen/TakePictureScreen"
import TakepictureScreen from "../screen/TakePictureScreen";
import UserScreen from "../screen/UserScreen"

const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
    
    return(
            <Tab.Navigator
            tabBarOptions={{
                showLabel:false
            }}
            >
               <Tab.Screen 
               name= "Home" 
               component={HomeStackNavigation}
               options={{
                   tabBarLabel:"主頁",
                   tabBarIcon:({focused}) => (
                       focused
                       ? <Image source={require('../icon/internet.png')} style={{height:24,width:24 }}  />
                       : <Image source={require('../icon/home.png')} style={{height:24,width:24 }}  />
                   )
               }} 
               />
               <Tab.Screen 
               name="Post" 
               component={PostStackNavigation} 
               
               options={{
                tabBarLabel:"主頁",
                tabBarIcon:({focused}) => (
                    focused
                    ? <Image source={require('../icon/plus_yellow.png')} style={{height:24,width:24 }}  />
                    : <Image source={require('../icon/plus.png')} style={{height:24,width:24 }}  />
                ),
                tabBarVisible:false
            }} 
               />
               <Tab.Screen 
               name = "Order" 
               component={OrderStackNavigation}
               options={{
                tabBarLabel:"主頁",
                tabBarIcon:({focused}) => (
                    focused
                    ? <Image source={require('../icon/menu2.png')} style={{height:24,width:24 }}  />
                    : <Image source={require('../icon/menu.png')} style={{height:24,width:24 }}  />
                )
            }} 
               />
               <Tab.Screen 
               name = "User" 
               component={UserScreen}
               options={{
                tabBarLabel:"主頁",
                tabBarIcon:({focused}) => (
                    focused
                    ? <Image source={require('../icon/user_yellow.png')} style={{height:24,width:24 }}  />
                    : <Image source={require('../icon/user_black.png')} style={{height:24,width:24 }}  />
                )
            }} 
               />
            </Tab.Navigator>
    )

}

export default HomeTabNavigation;
