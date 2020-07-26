import React, { useEffect,useContext,useState } from 'react';
import { StyleSheet, Text, View , Image ,TouchableOpacity,Button, AsyncStorage, AppRegistry} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
import {SignStackNavigation,HomeStackTabNavigation} from "./src/screen/index.js"
import {StoreContext,StoreProvider}from "./src/store/UserStore.js";

const PERSISTENCE_KEY = "NAVIGATION_STATE";
const SIGN_PERSISTENCE_KEY = "SIGN_PERSISTENCE_KEY";
const SIGN_HAS_SET_KEY = "SIGN_HAS_SET_KEY";

const Stack = createStackNavigator();
  

const App=()=> {

  const { isLoginState } = useContext(StoreContext);
  const [isLogin, setIsLogin] = isLoginState;
  const [Login,setLogin] = useState(false);

  const [isLoadingComplete,setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();

  useEffect(()=>{
    const firebaseConfig = {
      apiKey: "AIzaSyAdeuAc0I-QaJP_6u3iACaif5KuDC5tALA",
      authDomain: "wannashareios.firebaseapp.com",
      databaseURL: "https://wannashareios.firebaseio.com",
      projectId: "wannashareios",
      storageBucket: "wannashareios.appspot.com",
      messagingSenderId: "594225041914",
      appId: "1:594225041914:web:1d1fd4f662a3d17eaad443",
      measurementId: "G-DD3EEX3G4L"
    };
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig); //避免firbase重複初始化
    }
    console.log(`firebase`);
  },[]);

  useEffect(()=>{
    async function GetLoginAsyncStorage(){
        const saveLoginstate = await AsyncStorage.getItem(SIGN_PERSISTENCE_KEY);
        const Loginstate = JSON.parse(saveLoginstate);
        setLogin(Loginstate);
        
    }
    GetLoginAsyncStorage();
  },[]);

  

  React.useEffect(()=>{
    async function loadResourceAndDataAsync(){
      try{
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString);
        setInitialNavigationState(state);
      }catch(e){
        console.warn(e);
      }finally{
        setLoadingComplete(true);

      }
    }
    loadResourceAndDataAsync();
  },[]);

  if (!isLoadingComplete){
    return null;

  }  else{
    console.log(`App isLogin=${Login}`);
  return isLogin ?(
    <NavigationContainer>
      <HomeStackTabNavigation/>
      
    </NavigationContainer>
  ):(
    <NavigationContainer>
      <SignStackNavigation/>
    </NavigationContainer>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const Index = () => {
//   return(
//         <StoreProvider>
//           <App/>
//         </StoreProvider>
//   )
// } 

// AppRegistry.registerComponent('my App', () => Index);

export default ()=>{
  return(
    <StoreProvider>
      <App/>
    </StoreProvider>// user變成全域變數
  )
}