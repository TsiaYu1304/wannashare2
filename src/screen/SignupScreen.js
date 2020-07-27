import React,{useContext,useEffect,useState}from 'react';
import {View, Text, TouchableOpacity,StyleSheet,Image,TextInput,AsyncStorage, ActivityIndicator,Dimensions} from "react-native"
import {Button} from "react-native-elements";
import * as firebase from 'firebase'; 
import {StoreContext}from "../store/UserStore.js";

var {height,width} = Dimensions.get('window');

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
    const { isLoginState } = useContext(StoreContext);
    const [isLogin, setIsLogin] = isLoginState;

    const {userState} = useContext(StoreContext);
    const [user,setUser] = userState;

    useEffect(()=>{
        saveToAsyncStorage();
    },[user]);

    const saveToAsyncStorage = () => {
        try{
            AsyncStorage.setItem(ME_PERSISTENCE_KEY,JSON.stringify(user));
            AsyncStorage.setItem(HAS_SET_KEY,JSON.stringify(true));
            console.log("signin user儲存")
        }catch(e){}
    };

    
  

    const isignInsaveToAsyncStorage = () => {
        try{
            AsyncStorage.setItem(SIGN_PERSISTENCE_KEY,JSON.stringify(true));
            AsyncStorage.setItem(SIGN_HAS_SET_KEY.stringify(true));
            console.log(`註冊呼叫了了`);
        }catch(e){}
    };


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
            
          setUser({...user,userphoto:"https://github.com/tsaiyuyes7/TsaiyuYes7_2020App/blob/master/src/icon/round-account-button-with-user-inside.png?raw=true"})
          await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
          await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
          await firebase.auth().currentUser.updateProfile({
              displayName:name,
              photoURL:"https://github.com/TsiaYu1304/0721_wannashare/blob/master/src/img/IDphoto.png?raw=true"
          })


         await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).set({
             sharecoin:0
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
        <View style={{backgroundColor:'#fff',flex:1}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image
            source={require('../icon/back.png')}
            style={{width:0.064*width,height:0.064*width,marginLeft:0.096*width,marginTop:0.1*height}}
            />
            </TouchableOpacity>
            <View style={styles.headertext}>
            <Text style={{fontSize:28,color:"#675D5D",}}>註冊</Text>
            </View>

            <View style={{paddingTop:0.065*height , alignItems:'center'}}>
            <View style={styles.nameinputsection}>
                    <Image
                    source={require('../icon/round-account-button-with-user-inside.png')}
                    style={styles.Image_icon}
                    />
                <TextInput
                placeholder="輸入姓名"
                style={{marginLeft:0.05*width,color:"#F0A202",fontSize:15}}
                //onChangeText={(name)=>setUser({...user,name})}
                onChangeText={(name) => setName(name)}
                />
                </View>
                <View style={styles.emailinputsection}>
                    <Image
                    source={require('../icon/multimedia.png')}
                    style={styles.Image_icon}
                    />
                <TextInput
                placeholder="輸入信箱"
                style={{marginLeft:0.05*width,color:"#F0A202",fontSize:15}}
                //onChangeText={(email)=>setUser({...user,email})}
                onChangeText={(email) => setUser({...user,email})}
                />
                </View>
                <View style={styles.passwordinputsection}>
                    <Image
                    source={require('../icon/lock.png')}
                    style={styles.Image_icon}
                    />
                <TextInput
                placeholder="輸入密碼"
                style={{marginLeft:0.05*width,color:"#F0A202",fontSize:15}}
                onChangeText={(password) => setUser({...user,password})}
                />
                </View>
            </View>
            <View style={styles.btnstyle}>
            {renderButton()}
            <Text style={{ padding: 0.026*width, fontSize: 16, color: "red" }}>{error}</Text>
            </View>
            <View style={{marginTop:0.044*height ,alignItems:'center',height:0.025*height}}>
                <Text style={{color:"#675D5D"}}>其他註冊</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:0.05*height}}>
                <TouchableOpacity >
                    <View style={styles.anothersignin_btn}>
                    <Image
                    source={require('../icon/brands-and-logotypes.png')}
                    style={{height:0.053*width,width:0.053*width}}
                    />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.anothersignin_btn2}>
                    <Image
                    source={require('../icon/facebook.png')}
                    style={{height:0.053*width,width:0.053*width}}
                    />
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    Image_icon:{
        height:0.022*height,
        width:0.05*width,
        marginTop:0.013*height,
        marginLeft:0.05*width
    },
    anothersignin_btn:{
        width:0.15*width,
        height:0.15*width,
        backgroundColor:'#fff',
        borderRadius:0.075*width,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#c8c8c8',
        shadowOffset:{width:1,height:2},
        shadowOpacity:0.5,
        elevation:2
    },
    anothersignin_btn2:{
        width:0.15*width,
        height:0.15*width,
        marginLeft:0.13*width,
        backgroundColor:'#fff',
        borderRadius:0.075*width,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#c8c8c8',
        shadowOffset:{width:1,height:2},
        shadowOpacity:0.5,
        elevation:2
    },
    headertext:{
        marginTop:0.069*height,
        marginLeft:0.096*width
        

    },
    nameinputsection:{
        flexDirection:'row',
        borderWidth:1,
        width:0.8*width,
        height:0.054*height,
        borderRadius:0.059*width,
        borderColor:'#c8c8c8'
    },
    emailinputsection:{
        flexDirection:'row',
        borderWidth:1,
        width:0.8*width,
        height:0.054*height,
        borderRadius:0.059*width,
        borderColor:'#c8c8c8',
        marginTop:0.044*height
    },
    passwordinputsection:{
        marginTop:0.044*height,
        flexDirection:'row',
        borderWidth:1,
        width:0.8*width,
        height:0.054*height,
        borderRadius:0.059*width,
        borderColor:'#c8c8c8'
    },
    btnstyle:{
        width:0.8*width,
        height:0.054*height,
        marginLeft:0.096*width,
        marginTop:0.062*height
    },
    signupsection:{
        marginTop:0.044*height,
        height:0.099*height,
        flexDirection:'row',
        justifyContent:'center'
    }
})


export default SignupScreen;