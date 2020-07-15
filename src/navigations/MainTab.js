import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from "react-native";
import { PostStackNavigation, OrderStackNavigation,OrderTabNavigation ,HomeStackNavigation ,UserNavigation} from "../screen"
import HomeScreen from "../screen/HomeScreen";
import AddScreen from "../screen/AddScreen.js";

import ImagePicker from 'react-native-image-crop-picker';

const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
    const TakePhoto =() =>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
          });
    }
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
               listeners={({navigation,route})=>({
                tabPress: () =>{
                    //TakePhoto();
                    //navigation.navigate('Add');
                }
            })}
               options={{
                
                tabBarIcon:({focused}) => (
                    focused
                    ? <Image source={require('../icon/plus_yellow.png')} style={{height:24,width:24 }}  />
                    : <Image source={require('../icon/plus.png')} style={{height:24,width:24 }}  />
                )
            }} 
               />
               <Tab.Screen 
               name = "Order" 
               component={OrderStackNavigation}
               options={{
                tabBarIcon:({focused}) => (
                    focused
                    ? <Image source={require('../icon/menu2.png')} style={{height:24,width:24 }}  />
                    : <Image source={require('../icon/menu.png')} style={{height:24,width:24 }}  />
                )
            }} 
               />
               <Tab.Screen 
               name = "User" 
               component={UserNavigation}
               options={{
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
