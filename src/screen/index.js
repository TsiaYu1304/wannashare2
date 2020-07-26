import React from "react";
import {View, Text,Image,TouchableOpacity} from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TakePicture from "../screen/TakePictureScreen";
import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
import HomeTabNavigation from "../navigations/MainTab.js";
import HomeScreen from "../screen/HomeScreen.js";
import SearchScreen from "../screen/SearchScreen.js";
import PostScreen from "../screen/PostScreen";
import FinishorderScreen from "./FinishorderScreen";
import UnfinishorderScreen from "./UnfinishScreen";
import FooddetailScreen from "./FooddetailScreen";
import AddScreen from "../screen/AddScreen.js";
import UserScreen from "../screen/UserScreen";
import setting from "../screen/settingScreen";
import ICanUse from "../screen/coinScreen";
import Coupon from "../screen/couponScreen";
import Chat from "../screen/chatScreen";
import intro from "../screen/GuideScreen";
import OrderDetailscreen from "./orderDetailScreen";
import SellerDetailScreen from "./SellerOrderDetail";
import chatroomScreen from "./ChatroomScreen"
import ChatroomScreen from "./ChatroomScreen";
import FoodShopScreen from "./foodshopscreen"




export const TopTab = createMaterialTopTabNavigator();

export const Stack = createStackNavigator();
export const Tab = createBottomTabNavigator();

//登入頁面

const BackImage =()=>{
    return(
    <Image
        source={require('../icon/back.png')}
        style={{width:24,height:24,marginLeft:16}}
        
    />
    )
}
export const SignStackNavigation = ({navigation}) => {
    //<Stack.Screen name="Guide" component={intro} options={{headerShown: false}} />
    return(
        <Stack.Navigator>
           
            <Stack.Screen name="Signin" component={SigninScreen} options={{headerShown: false}} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export const HomeStackTabNavigation = ({navigation}) => {

    return(
        <Stack.Navigator>
            
            <Stack.Screen name="Home" component={HomeTabNavigation} options={{headerShown: false}} />
            <Stack.Screen name="Food" component = {FooddetailScreen}  options={{
                headerShown: false,
                headerStyle:{
                    backgroundColor:"#F0A202F0",
                    height:88
                },
                title:'吐司',
                
               
                headerBackImage:()=> (<BackImage/>)
            }}/>
            <Stack.Screen name="Coin" component={ICanUse} options={{title:"想享幣",headerShown: false}} />
            <Stack.Screen name="Setting" component = {setting} options={{
                title:'設定',
                headerTitleStyle:{color:'#fff'},
                headerStyle:{
                    backgroundColor:"#F0A202F0",
                    height:88
                },
                headerBackTitleVisible:false,
                headerTintColor:'#fff'
                
            }}/>
            <Stack.Screen name="Coupon" component={Coupon} options={{title:"優惠券",headerShown: false}} />
            <Stack.Screen name="Chat" component={Chat} options={{title:"聊天",headerShown: false}} />
            <Stack.Screen name="ChatRoom" component={ChatroomScreen} options={{title:"聊天室",headerBackTitleVisible:false}} />
            <Stack.Screen name="OrderDetail" component={OrderDetailscreen} options={{title:"詳細資訊",headerShown: false}} />
            <Stack.Screen name="SellerOrderDetail" component={SellerDetailScreen} options={{title:"詳細",headerShown: false}} />
        </Stack.Navigator>
    );
};

export const HomeStackNavigation = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="HomePage" component = {HomeScreen} options={{headerShown: false}}/>
            
        </Stack.Navigator>
    )
}

const AddRightHeader =()=>{
    return(
    <Text style={{marginRight:18,color:'#fff'}}>分享</Text>
    )
}




export const PostStackNavigation = ({navigation}) => {
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="TakePicture" component={TakePicture}
            options={{
                title:'拍照',
                headerStyle:{
                    backgroundColor:'#F0A202F0',
                
                },
                headerTitleStyle:{
                    color:'#fff'
                },
                headerBackTitleVisible:true,
                headerBackTitle:'取消',
                headerShown: false
            }}
            />
            <Stack.Screen name="Add" component = {AddScreen}
           
            options={{
                title:'新增',
                headerStyle:{
                    backgroundColor:'#F0A202F0',
                
                },
                headerTitleStyle:{
                    color:'#fff'
                },
                headerRight:()=>(<AddRightHeader/>),
                headerBackTitleVisible:false,
                headerTintColor:'#fff'
            }}
            />
        </Stack.Navigator>
    )
}

export const OrderStackNavigation = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Order" component = {OrderTabNavigation} options={{
                title:'我的分享',
                headerStyle:{
                    backgroundColor:"#F0A202F0",
                    height:88
                },
                headerTitleStyle:{
                    color:'#fff'
                },

                
                
            }}/>
        </Stack.Navigator>
    )
}

export const OrderTabNavigation = ({navigation}) => {
    return (
        <TopTab.Navigator
        tabBarOptions={{
            indicatorStyle:{
                backgroundColor:'#F0A202F0'
            }
            
        }}
        >
            <TopTab.Screen name="foodshop" component={FoodShopScreen} 
            options={{
                title:'已發佈',
            }} />
            <TopTab.Screen name="unfinishorder" component={UnfinishorderScreen} 
            options={{
                title:'已下單',
            }} />
            <TopTab.Screen name="finishorder" component={FinishorderScreen}
            options={{
                title:'已領取'
            }}/>
        </TopTab.Navigator>
    )
}

const Chatbtn = () => 
{
    return(
        <View style={{flexDirection:'row'}}>
        <Image
        source ={require('../icon/chat-bubble.png')}
        style={{width:25,height:24,marginRight:16}}
        />
        <Image
        source ={require('../icon/settings.png')}
        style={{width:24,height:24,marginRight:16}}
        />
        </View>
    )
}
export const UserNavigation = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="User" component = {UserScreen} options={{
                title:'我的帳號',
                headerStyle:{
                    backgroundColor:"#F0A202F0",
                    height:88
                    
                },
                headerShown: false
                
            }}/>
            
        </Stack.Navigator>
    )
}

//主頁面
