import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions,TouchableOpacity,Switch } from 'react-native';
import { setWidth,setheight,setSptext } from '../component/ScreenUtil';



const chatScreen = ({navigation}) => {
    return(
        <View style={{backgroundColor:'#fff', flex:1,alignItems:'center'}}>
            <Image
            source={require('../img/No_chat.png')}
            style={{marginTop:setheight(120),width:setWidth(235),height:setheight(235)}}/>
            <Text style={{color:'#656565',fontSize:setSptext(18)}}>目前尚無優惠券</Text>
        </View>
    )
}

const ChatRoomCard = ({navigation}) =>{
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('ChatRoom')}>
    <View style={{
        height: 88,
        // backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth:'1',
        borderBottomColor:"#E1E1E1"
    }}>
    
        <View style={{
            width: 74,
            marginLeft: 16,
            //backgroundColor:'red'
        }}>
            <Image source={require('../img_yu/wang.png')}
                style={{ width: 64, height: 64, borderRadius: 50 }} />
        </View>

        <View>
            <Text style={{ fontSize: 18, color: "#949494" }}>王先生</Text>
            <Text></Text>
            <Text style={{ fontSize: 14, color: "#949494" }}>掰掰＾＾</Text>
        </View>
    </View>
    </TouchableOpacity>

    )}

const chat = ({navigation}) => {
    return (
        <View style={{backgroundColor:'#fff',height:8850}}>
            {/* headerStart-------------------------- */}
            <View style={{
                height: 88,
                backgroundColor: '#F0A202',
                flexDirection: "row",
                justifyContent: 'flex-start',

            }}>
                <View style={{
                    //backgroundColor: 'red',
                    width: 42,
                    justifyContent: "flex-end",
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../img_yu/back_white.png')}
                            style={{
                                marginBottom: 8,
                                marginLeft: 16
                            }} /></TouchableOpacity>
                </View>
                <View style={{
                    // backgroundColor: 'blue',
                    width: 291,
                    justifyContent: 'flex-end',
                    alignItems: 'center',

                }}>
                    <Text style={{ fontSize: 20, color: '#fff', marginBottom: 12 }}>聊天</Text>
                </View>
                <View style={{
                    // backgroundColor: 'green',
                    width: 42
                }}></View>
            </View>
            {/* headerEnd-------------------------- */}
            
            <ScrollView style={{ height: 750 }}>
            <TouchableOpacity onPress={()=>navigation.navigate('ChatRoom')}>
    <View style={{
        height: 88,
        // backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth:'1',
        borderBottomColor:"#E1E1E1"
    }}>
    
        <View style={{
            width: 74,
            marginLeft: 16,
            //backgroundColor:'red'
        }}>
            <Image source={require('../img_yu/wang.png')}
                style={{ width: 64, height: 64, borderRadius: 50 }} />
        </View>

        <View>
            <Text style={{ fontSize: 18, color: "#949494" }}>王先生</Text>
            <Text></Text>
            <Text style={{ fontSize: 14, color: "#949494" }}>掰掰＾＾</Text>
        </View>
    </View>
    </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

});
export default chatScreen;