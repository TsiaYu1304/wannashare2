import React ,{useContext,useEffect,useState} from "react";
import { StyleSheet, Text, View,TouchableOpacity,AsyncStorage} from 'react-native';
import * as firebase from 'firebase'; 
import {StoreContext}from "../store/UserStore.js";

const SIGN_PERSISTENCE_KEY = "SIGN_PERSISTENCE_KEY";
const SIGN_HAS_SET_KEY = "SIGN_HAS_SET_KEY";

const SettingScreen = ({navigation}) => {

    const { isLoginState } = useContext(StoreContext);
    const [isLogin, setIsLogin] = isLoginState;
  

    const isignInsaveToAsyncStorage = () => {
        try{
            AsyncStorage.setItem(SIGN_PERSISTENCE_KEY,JSON.stringify(false));
            AsyncStorage.setItem(SIGN_HAS_SET_KEY.stringify(true));
        }catch(e){}
    };

    useEffect(()=>{
        isignInsaveToAsyncStorage();
    },[isLogin]);

    const onSignOut = async () => {
        firebase.auth().signOut();
        setIsLogin(false);
        
      };
    return (
       <View>
           <TouchableOpacity onPress={onSignOut}>
           <Text>登出</Text>
           </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({

});
export default SettingScreen;