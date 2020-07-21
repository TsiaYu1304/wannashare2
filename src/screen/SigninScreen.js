import React,{useContext,useState,useEffect} from "react";
import {View, Text, TouchableOpacity,StyleSheet,TextInput,Image, ActivityIndicator,AsyncStorage ,Dimensions} from "react-native";
import SignupScreen from "../screen/SignupScreen";
import {Button} from "react-native-elements";
import * as firebase from 'firebase'; 
import {StoreContext}from "../store/UserStore.js";

var {height,width} = Dimensions.get('window');
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
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={styles.headertext}>
            <Text style={{fontSize:28,color:"#675D5D",}}>登入</Text>
            </View>

            <View style={{marginTop:0.07*height, alignItems:'center'}}>
                <View style={styles.emailinputsection}>
                    <Image
                    source={require('../icon/multimedia.png')}
                    style={styles.Image_icon}
                    />
                <TextInput
                placeholder="輸入信箱"
                style={{marginLeft:0.05*width,color:"#F0A202",fontSize:15}}
                
                value={email}
                onChangeText={(email) =>setUser({...user,email})}
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
                value={password}
                onChangeText={(password) => setUser({...user,password})}
                />
                </View>
                
            </View>
            <Text style={{color:"#F0A202",marginTop:0.01*height,marginLeft:0.71*width}}>忘記密碼?</Text>
            <View style={styles.btnstyle}>
            {renderButton()}
            <Text style={{ padding: 0.013*width, fontSize: 16, color: "red" }}>{error}</Text>
            </View>
            <View style={{marginTop:0.08*height ,alignItems:'center',height:0.024*height}}>
                <Text style={{color:"#675D5D"}}>其他登入</Text>
            </View>
            <View style={styles.btn_2_View}>
                <TouchableOpacity style={styles.anothersignin_btn}>
                    
                    <Image
                    source={require('../icon/brands-and-logotypes.png')}
                    style={{height:0.053*width,width:0.053*width}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.anothersignin_btn2}>
                    
                    <Image
                    source={require('../icon/facebook.png')}
                    style={{height:0.053*width,width:0.053*width}}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.signupsection}>
                <Text style={{color:"#675D5D",fontSize:13}}>還沒擁有帳號?</Text>
                <TouchableOpacity  onPress={() => navigation.navigate('Signup')}>
                    <Text
                    style={{fontSize:13,color:'#F0A202F0'}}
                    >註冊</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
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
        elevation:2,
        marginRight:0.08*width
    },
    anothersignin_btn2:{
        width:0.15*width,
        height:0.15*width,

        backgroundColor:'#fff',
        borderRadius:0.075*width,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#c8c8c8',
        shadowOffset:{width:1,height:2},
        shadowOpacity:0.5,
        elevation:2,
        marginLeft:0.08*width
    },
    headertext:{
        marginTop:0.15*height,
        marginLeft:0.1*width
        

    },
    Image_icon:{
        height:0.022*height,
        width:0.05*width,
        marginTop:0.013*height,
        marginLeft:0.05*width
    },
    emailinputsection:{
        flexDirection:'row',
        borderWidth:1,
        width:0.8*width,
        height:0.054*height,
        borderRadius:0.059*width,
        borderColor:'#c8c8c8'
    },
    passwordinputsection:{
        marginTop:0.062*height,
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
        marginTop:0.1*height
    },
    signupsection:{
        marginTop:0.044*height,
        height:0.02*height,
        flexDirection:'row',
        justifyContent:'center'
    },
    btn_2_View:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:0.08*height
    }
})

export default SigninScreen;