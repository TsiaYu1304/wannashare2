import React,{useContext,useEffect,useState}from 'react';
import {View, Text, TouchableOpacity,StyleSheet,Image,TextInput,AsyncStorage, ActivityIndicator} from "react-native"
import {Button} from "react-native-elements";
import * as firebase from 'firebase'; 
import {StoreContext}from "../store/UserStore.js";
const ME_PERSISTENCE_KEY = "ME_PERSISTENCE_KEY";
const HAS_SET_KEY = "HAS_SET_KEY";

const SIGN_PERSISTENCE_KEY = "SIGN_PERSISTENCE_KEY";
const SIGN_HAS_SET_KEY = "SIGN_HAS_SET_KEY";

const SignupScreen = ({navigation}) =>{


    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {userState} = useContext(StoreContext);
    const [user,setUser] = userState;

    const saveToAsyncStorage = () => {
        try{
            AsyncStorage.setItem(ME_PERSISTENCE_KEY,JSON.stringify(user));
            AsyncStorage.setItem(HAS_SET_KEY,JSON.stringify(true));
            console.log("signUP user儲存")
        }catch(e){}
    };

    useEffect(()=>{
        saveToAsyncStorage();
    },[user]);

    const { isLoginState } = useContext(StoreContext);
    const [isLogin, setIsLogin] = isLoginState;
  

    const isignInsaveToAsyncStorage = () => {
        try{
            AsyncStorage.setItem(SIGN_PERSISTENCE_KEY,JSON.stringify(true));
            AsyncStorage.setItem(SIGN_HAS_SET_KEY.stringify(true));
            console.log(`註冊呼叫了了`);
        }catch(e){}
    };

    useEffect(()=>{
        //isignInsaveToAsyncStorage();
    },[isLogin]);


    const renderButton = () => {
        return loading ? (
          <ActivityIndicator size="large" color="#F0A202"  />
        ) : (
            <Button
                buttonStyle={{
                    backgroundColor:"#F0A202",
                    borderRadius:22
                }}
                
                title="註冊"
                onPress={onSignUp}
                style={{borderRadius:22}}
                />
        );
      };

      const onSignUp = async () => {
        setError(" ");
        setLoading(true);
        try {
            
          await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
          await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
          await firebase.auth().currentUser.updateProfile({
              displayName:name
          })

          setUser({...user,name:firebase.auth().currentUser.displayName})
          setUser({...user,email:firebase.auth().currentUser.email})
          
          setName("");
          setEmail("");
          setPassword("");
          setError("");
          setIsLogin(true);
          isignInsaveToAsyncStorage();
        } catch (err1) {
            setError(err1.message);
        } finally {
            setLoading(false);
        }
      };

    return (
        <View style={{backgroundColor:'#fff',height:812}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image
            source={require('../icon/back.png')}
            style={{width:24,height:24,marginLeft:36,marginTop:56}}
            />
            </TouchableOpacity>
            <View style={styles.headertext}>
            <Text style={{fontSize:28,color:"#675D5D",}}>註冊</Text>
            </View>

            <View style={{paddingTop:53 , alignItems:'center'}}>
            <View style={styles.nameinputsection}>
                    <Image
                    source={require('../icon/round-account-button-with-user-inside.png')}
                    style={{height:18,width:18,marginTop:13,marginLeft:18}}
                    />
                <TextInput
                placeholder="輸入姓名"
                style={{marginLeft:18,color:"#F0A202"}}
                //onChangeText={(name)=>setUser({...user,name})}
                onChangeText={(name) => setName(name)}
                />
                </View>
                <View style={styles.emailinputsection}>
                    <Image
                    source={require('../icon/multimedia.png')}
                    style={{height:18,width:18,marginTop:13,marginLeft:18}}
                    />
                <TextInput
                placeholder="輸入信箱"
                style={{marginLeft:18,color:"#F0A202"}}
                //onChangeText={(email)=>setUser({...user,email})}
                onChangeText={(email) => setUser({...user,email})}
                />
                </View>
                <View style={styles.passwordinputsection}>
                    <Image
                    source={require('../icon/lock.png')}
                    style={{height:18,width:18,marginTop:13,marginLeft:18}}
                    />
                <TextInput
                placeholder="輸入密碼"
                style={{marginLeft:18,color:"#F0A202"}}
                onChangeText={(password) => setUser({...user,password})}
                />
                </View>
            </View>
            <View style={styles.btnstyle}>
            {renderButton()}
            <Text style={{ padding: 10, fontSize: 16, color: "red" }}>{error}</Text>
            </View>
            <View style={{marginTop:36 ,alignItems:'center',height:20}}>
                <Text style={{color:"#675D5D"}}>其他註冊</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:40}}>
                <TouchableOpacity >
                    <View style={styles.anothersignin_btn}>
                    <Image
                    source={require('../icon/brands-and-logotypes.png')}
                    style={{height:20,width:20,}}
                    />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.anothersignin_btn2}>
                    <Image
                    source={require('../icon/facebook.png')}
                    style={{height:20,width:20}}
                    />
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    anothersignin_btn:{
        width:56,
        height:56,
        backgroundColor:'#fff',
        borderRadius:28,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#c8c8c8',
        shadowOffset:{width:1,height:2},
        shadowOpacity:0.5,
        elevation:2
    },
    anothersignin_btn2:{
        width:56,
        height:56,
        marginLeft:50,
        backgroundColor:'#fff',
        borderRadius:28,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#c8c8c8',
        shadowOffset:{width:1,height:2},
        shadowOpacity:0.5,
        elevation:2
    },
    headertext:{
        marginTop:56,
        width:328,
        marginLeft:36
        

    },
    nameinputsection:{
        flexDirection:'row',
        borderWidth:1,
        width:303,
        height:44,
        borderRadius:22,
        borderColor:'#c8c8c8'
    },
    emailinputsection:{
        flexDirection:'row',
        borderWidth:1,
        width:303,
        height:44,
        borderRadius:22,
        borderColor:'#c8c8c8',
        marginTop:36
    },
    passwordinputsection:{
        marginTop:36,
        flexDirection:'row',
        borderWidth:1,
        width:303,
        height:44,
        borderRadius:22,
        borderColor:'#c8c8c8'
    },
    btnstyle:{
        width:303,
        height:44,
        marginLeft:36,
        marginTop:50
    },
    signupsection:{
        marginTop:36,
        height:79,
        flexDirection:'row',
        justifyContent:'center'
    }
})


export default SignupScreen;