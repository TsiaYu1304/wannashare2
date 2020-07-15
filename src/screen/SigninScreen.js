import React,{useContext,useState,useEffect} from "react";
import {View, Text, TouchableOpacity,StyleSheet,TextInput,Image, ActivityIndicator,AsyncStorage } from "react-native";
import SignupScreen from "../screen/SignupScreen";
import {Button} from "react-native-elements";
import * as firebase from 'firebase'; 
import {StoreContext}from "../store/UserStore.js";

const ME_PERSISTENCE_KEY = "ME_PERSISTENCE_KEY";
const HAS_SET_KEY = "HAS_SET_KEY";

const SIGN_PERSISTENCE_KEY = "SIGN_PERSISTENCE_KEY";
const SIGN_HAS_SET_KEY = "SIGN_HAS_SET_KEY";

const SigninScreen = ({navigation}) =>{
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const { isLoginState } = useContext(StoreContext);
  const [isLogin, setIsLogin] = isLoginState;

  const [loading, setLoading] = useState(false);

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
            AsyncStorage.setItem(SIGN_HAS_SET_KEY,JSON.stringify(true));
            console.log(`signin isLogin=${isLogin}`);
            
        }catch(e){console.log(`signin err=${e}`);}
        //console.log(`signin isLogin=${isLogin}`);
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
            
            title="登入"
            onPress={onSignIn}
            //onPress={() => navigation.navigate('Home')} 
            style={{borderRadius:22}}
            />
        );
      };

      const onSignIn = async () => {
        setError(" ");
        setLoading(true);
        try {
          
          await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
          
          
          setUser({...user,email:firebase.auth().currentUser.email})
          setUser({...user,name:firebase.auth().currentUser.displayName})
       
          setError("");
          setIsLogin(true);
          isignInsaveToAsyncStorage();

          console.log(`itsme`);
        } catch (err1) {
          
            setError(err1.message);
        } finally {
            setLoading(false);
        }
      };

    return (
        <View style={{backgroundColor:'#fff',height:812}}>
            <View style={styles.headertext}>
            <Text style={{fontSize:28,color:"#675D5D",}}>登入</Text>
            </View>

            <View style={{paddingTop:53, alignItems:'center'}}>
                <View style={styles.emailinputsection}>
                    <Image
                    source={require('../icon/multimedia.png')}
                    style={{height:18,width:18,marginTop:13,marginLeft:18}}
                    />
                <TextInput
                placeholder="輸入信箱"
                style={{marginLeft:18,color:"#F0A202"}}
                
                value={email}
                onChangeText={(email) =>setUser({...user,email})}
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
                value={password}
                onChangeText={(password) => setUser({...user,password})}
                />
                </View>
                
            </View>
            <Text style={{color:"#F0A202",marginTop:6,marginLeft:268}}>忘記密碼?</Text>
            <View style={styles.btnstyle}>
            {renderButton()}
            <Text style={{ padding: 10, fontSize: 16, color: "red" }}>{error}</Text>
            </View>
            <View style={{marginTop:36 ,alignItems:'center',height:20}}>
                <Text style={{color:"#675D5D"}}>其他登入</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:40}}>
                <TouchableOpacity >
                    <View style={styles.anothersignin_btn}>
                    <Image
                    source={require('../icon/brands-and-logotypes.png')}
                    style={{height:20,width:20}}
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
            <View style={styles.signupsection}>
                <Text style={{color:"#675D5D",fontSize:13}}>還沒擁有帳號?</Text>
                <Button 
                        buttonStyle={{
                            backgroundColor:"#fff",
                            height:40,
                            marginTop:-12.5
                            
                        }}
                        titleStyle={{
                            fontSize:13,
                            color:'#F0A202F0'
                        }}
                        title="註冊"
                        onPress={() => navigation.navigate('Signup')}
                    />
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
        marginTop:50,
        width:328,
        marginLeft:36
        

    },
    emailinputsection:{
        flexDirection:'row',
        borderWidth:1,
        width:303,
        height:44,
        borderRadius:22,
        borderColor:'#c8c8c8'
    },
    passwordinputsection:{
        marginTop:50,
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
        marginTop:82
    },
    signupsection:{
        marginTop:36,
        height:17,
        flexDirection:'row',
        justifyContent:'center'
    }
})

export default SigninScreen;