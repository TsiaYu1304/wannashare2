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
const sign = false;

const App=()=> {
  const [first,setFirst] = useState(true);
  //const [login,setLog] = useState(false);

  const { isLoginState } = useContext(StoreContext);
  const [isLogin, setIsLogin] = isLoginState;

  const [isLoadingComplete,setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();

  const {userState} = useContext(StoreContext);
  const [user,setUser] = userState;


  const FirebasrInit = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyDWXrA3-aadNVL0AJZ_BAfiHkVtza7Z1zw",
      authDomain: "iosapp-a5f28.firebaseapp.com",
      databaseURL: "https://iosapp-a5f28.firebaseio.com",
      projectId: "iosapp-a5f28",
      storageBucket: "iosapp-a5f28.appspot.com",
      messagingSenderId: "960935600720",
      appId: "1:960935600720:web:8915136a1469f84f59a755",
      measurementId: "G-KRCGHBV34G"
      };
      if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig); //避免firbase重複初始化
      }
  };
  

  useEffect(()=>{
    const firebaseConfig = {
    apiKey: "AIzaSyDWXrA3-aadNVL0AJZ_BAfiHkVtza7Z1zw",
    authDomain: "iosapp-a5f28.firebaseapp.com",
    databaseURL: "https://iosapp-a5f28.firebaseio.com",
    projectId: "iosapp-a5f28",
    storageBucket: "iosapp-a5f28.appspot.com",
    messagingSenderId: "960935600720",
    appId: "1:960935600720:web:8915136a1469f84f59a755",
    measurementId: "G-KRCGHBV34G"
    };
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig); //避免firbase重複初始化
    }
    
  },[]);

  const GetloginState = () => {
        
    try{
        AsyncStorage.getItem(SIGN_PERSISTENCE_KEY, (err, value) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`App get login is ?? =${value}`)
                setIsLogin(value);
            }
        })
    //console.log(`sign OUT finish???=${JSON.parse(AsyncStorage.getItem(SIGN_PERSISTENCE_KEY))}`);
    }catch(e){console.log(`App get error ?? =${e}`);}
};

const FirstLogin = async () => {
        
  if (first) {   //如果是第一次登入
    try {  //登入
      //FirebasrInit();
      await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
      
      setFirst(false);
      console.log(`first Login done = ${user.email} ${user.password} ${firebase.auth().currentUser.displayName}`);
      
    } catch (err1) {
      console.log(`App first Login =${err1}`);
    }
  } else {
    console.log("nothing");
  }
};

  useEffect(()=>{
   
    FirstLogin();
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
    
    console.log(`App get  login ?? =${isLogin}`);
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


export default ()=>{
  return(
    <StoreProvider>
      <App/>
    </StoreProvider>// user變成全域變數
  )
}



