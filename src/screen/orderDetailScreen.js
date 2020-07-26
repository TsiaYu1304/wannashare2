import React,{useState,useEffect} from "react";
import {View, Text,TouchableOpacity,Image,ScrollView,StyleSheet,ImageBackground,Dimensions,Modal} from "react-native"
import MapView,{Marker} from "react-native-maps";
import * as firebase from 'firebase'; 
import '../component/ScreenUtil'
import QRCode from "react-native-qrcode-svg";
import cusmapstyle from '../json/mapstyle.json'
import { setheight, setWidth, setSptext } from "../component/ScreenUtil";
import {Entypo, FontAwesome,AntDesign,MaterialCommunityIcons} from "@expo/vector-icons"
const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;
//let db = firebase.firestore();
//let Auth = firebase.auth();

/*
    
*/

const OrderDetailScreen = ({route,navigation}) =>{
    const [showmodal,setShowmodal] = useState(false);
    const [useruid, setUid] = useState("");
    const { name } = route.params;
    const { food } = route.params;
    const { SellerPhoto } = route.params;
    const { img } = route.params;
    const { foodDetail } = route.params;
    const { orderID } = route.params;
    const { date } = route.params;
    const { number } = route.params;
   
    console.log(`id =  ${orderID}`)
    function Addfinishorder() {
        
        firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Buyorder").child("unfinish").child(food).set({
            name:name,
            food:food,
            foodDetail:foodDetail,
            SellerPhoto:SellerPhoto,
            img:img,
            date:date,
            time:firebase.database.ServerValue.TIMESTAMP,
            orderID:orderID
          });
      }

   
    const [region,setRegion] = useState({
        longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.01,
    latitudeDelta: 0.02,
    });

    const [marker,setMaker] = useState({
        coord:{
            longitude: 121.544637,
            latitude: 25.024624,
        },
        name:'NTUE',
        address:'Eat-Eat'
    });

    const onRegionChangeComplete = (rgn) => {
        setRegion(rgn);
        setMaker({...marker,coord:{
            longitude: rgn.longitude,
            latitude: rgn.latitude
        }});
    }
    return (

        <ScrollView style={{backgroundColor:'#fff'}}>
            
            <View style={styles.detailView}> 
            <View style={{height:setheight(252),paddingTop:setheight(44)}}>
                <ImageBackground
                source={require('../img/account_bg.png')}
                style={{width:devicewidth,height:setheight(280)}}
                >
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={{width:42,height:42,backgroundColor:'#fff',borderRadius:10,alignItems:'center',justifyContent:'center',marginTop:30,marginLeft:16}}>
                    <Image
                    source={require('../icon/back.png')}
                    style={{width:18,height:18}}
                    />
            </TouchableOpacity>
            <View style={{alignItems:'center',marginTop:setheight(22)}}>
            
            </View>
            </ImageBackground>
            
            </View>
            
            <View style={{backgroundColor:'#fff',borderTopStartRadius:25,borderTopEndRadius:25}}>
            <View style={{bottom:setheight(120)}}>
            <View style={{alignItems:'center'}}>
            <Image
            source={{uri:img}}
            style={{width:setWidth(195),height:setheight(195),borderRadius:10}}
            />
            <Text style={{marginTop:setheight(16),fontSize:setSptext(22),color:'#656565'}}>{food}</Text>
            </View>
            <View style={{marginTop:setheight(16),flexDirection:'row',justifyContent:'center'}}>
                <TouchableOpacity style={styles.btn_touchable}>
                    <Image source={require('../icon/chat2x.png')} style={{width:setWidth(18),height:setheight(18)}} />
                    <Text style={{color:'#fff',fontSize:setSptext(15),marginLeft:setSptext(8)}}>聯絡分享人</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setShowmodal(true)} style={styles.btn_touchable2}>
                    <Image source={require('../icon/baseline_qr_code.png')} style={{width:setWidth(18),height:setheight(18)}} />
                    <Text style={{color:'#fff',fontSize:setSptext(15),marginLeft:setSptext(8)}}>顯示QRcode</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:setheight(30)}}>
            <View style={styles.FooddetailList}>
                    
                    <Text style={styles.fooddetail_text}>分享人</Text>
                    <Image source={{uri:SellerPhoto}} style={{borderRadius:25,width:setWidth(32),height:setheight(32)}} />
                    <Text style={{fontSize:setSptext(18),color:'#656565',marginLeft:setWidth(8)}}>{name}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={styles.fooddetail_text}>領取時間</Text>
                    <Text style={{fontSize:setSptext(18),color:'#656565'}}>2020/04/17/ 17:00</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={styles.fooddetail_text}>說明</Text>
                        <Text style={{fontSize:setSptext(18),color:'#656565'}}>{foodDetail}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={styles.fooddetail_text}>期限</Text>
                        <Text style={{fontSize:setSptext(18),color:'#656565'}}>{date}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={styles.fooddetail_text}>數量</Text>
                        <Text style={{fontSize:setSptext(18),color:'#656565'}}>1</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={styles.fooddetail_text}>地點</Text>
                    <Text style={{fontSize:setSptext(18),color:'#656565'}} >捷運科技大樓站</Text>
                </View>
            </View>
            <View style={{height:372,justifyContent:'center',alignItems:'center'}}>
                <MapView
                region={region}
                style={{width:340,height:340}}
                showsTraffic
                provider="google"
                customMapStyle={cusmapstyle}
                >
                    <Marker
                    coordinate={marker.coord}
                    title={marker.name}
                    description={marker.address}
                    />
                </MapView>
                
            
            </View>
            </View>
            </View>
            </View>
            { showmodal && 
                <Modal 
                transparent = {false}
                visible = {showmodal}
                >
                    <View style={{flex:1,backgroundColor:'#F0A202',paddingTop:setheight(44)}}>
                        <ImageBackground source={require('../img/account_bg.png')}
                                    style={{width:devicewidth,height:setheight(150)}}>
                    <TouchableOpacity
                    onPress={()=>setShowmodal(false)}
                    style={styles.modal_view}>
                    <AntDesign name="close" size={setWidth(24)} color='#656565' />
                    </TouchableOpacity>
                    </ImageBackground>
                    <View style={styles.modal_view_section}>
                    <QRCode
                        value= {orderID}
                        size={279}
                        color='#656565'
                    />
                    <View style={{width:setWidth(279) ,marginTop:setheight(32)}}>
                    <Text style={{color:'#656565',fontSize:setSptext(18)}}>請分享人掃描QRcode</Text>
                    <Text style={{marginTop:setheight(8),color:'#656565',fontSize:setSptext(18)}}>完成分享步驟！</Text>
                    </View>
                    <View style={{width:setWidth(279),alignItems:'flex-end'}}>
                        <Image
                        source={require('../img/toastBaby.png')}
                        style={{height:setheight(182),
                        width:setWidth(182)}}
                        />
                    </View>
                    </View>
                </View>
                </Modal>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    modal_view_section:{
        backgroundColor:'#fff',
        flex:1 ,
        borderTopEndRadius:25,
        borderTopStartRadius:25,
        alignItems:'center',
        paddingTop:setheight(65)

    },
    modal_view:{
        width:setWidth(42),
        height:setheight(42),
        backgroundColor:'#fff',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:setheight(30),
        marginLeft:setWidth(16)
    },
    btn_touchable:{
        flexDirection:'row',
        width:setWidth(147),
        height:setheight(42),
        backgroundColor:'#f0A202',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    btn_touchable2:{
        flexDirection:'row',
        width:setWidth(147),
        height:setheight(42),
        backgroundColor:'#f0A202',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginLeft:setWidth(17)
    },
    fooddetail_text:{
        fontSize:setSptext(18),
        width:setWidth(86),
        color:'#656565'
    },
    detailView:{
        backgroundColor:'#F0A202',
        flex:1
    },
    Foodimg:{
        width:375,
        height:327,
        paddingTop:48,
        paddingLeft:16
    },
    Userphoto:{
        width:64,
        height:64,
        borderRadius:35,
        marginLeft:16
    },
    FooddetailList:{
        height:42,
        width:375,
        marginLeft:60,
        flexDirection:'row',
        alignItems:'center'  
    },
    SellerSection:{
        justifyContent:'flex-start',
        flexDirection:'row',
        height:64,
        alignItems:'center',
        marginTop:32
    },
    Disandprice:{
        flexDirection:'row',
        marginLeft:95
    },
    Twobutton:{
        flexDirection:'row'
    },
    btn:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:163,
        height:42,
        marginLeft:16,
        backgroundColor:'#F0A202',
        borderRadius:10,
        marginTop:32,
        marginBottom:32
    }


})

export default OrderDetailScreen;