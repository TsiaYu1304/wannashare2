import React ,{useContext,useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Switch } from 'react-native';
import * as firebase from 'firebase'; 
import {StoreContext}from "../store/UserStore.js";

const setting = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
        <View style={{backgroundColor:'#fff',height:8850}}>
           

            <ScrollView style={{ height: 200 }}>
                {/* chat_1Start----------------------- */}
                <View style={{
                    height: 44,
                    // backgroundColor: 'pink',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderBottomWidth: '1',
                    borderBottomColor: "#E1E1E1"
                }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#949494",
                                marginLeft: 26
                            }}>更改名稱</Text>
                    </View>
                </View>
                {/* chat_1End----------------------- */}
                {/* chat_2Start----------------------- */}
                <View style={{
                    height: 44,
                    // backgroundColor: 'pink',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderBottomWidth: '1',
                    borderBottomColor: "#E1E1E1"
                }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#949494",
                                marginLeft: 26
                            }}>更改密碼</Text>
                    </View>
                </View>
                {/* chat_2End----------------------- */}
                {/* chat_3Start----------------------- */}
                <View style={{
                    height: 44,
                    //backgroundColor: 'pink',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: '1',
                    borderBottomColor: "#E1E1E1"
                }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#949494",
                                marginLeft: 26
                            }}>允許推播</Text>
                    </View>
                    <View style={{
                       // backgroundColor:'#000',
                        flexDirection:'row',
                        justifyContent:'flex-end',
                        width:260
                        }}>
                    <Switch
                    trackColor={{ false: 'rgba(120,120,128,0.16)', true: "#F0A202F0" }}
                    thumbColor={isEnabled ? "#fff" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    />
                    </View>
                </View>
                {/* chat_3End----------------------- */}
                 {/* chat_4Start----------------------- */}
                 <View style={{
                    height: 44,
                    // backgroundColor: 'pink',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderBottomWidth: '1',
                    borderBottomColor: "#E1E1E1"
                }}>
                    <TouchableOpacity onPress={onSignOut}>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#949494",
                                marginLeft: 26
                            }}>登出</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                {/* chat_4End----------------------- */}

            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({

});
export default setting;