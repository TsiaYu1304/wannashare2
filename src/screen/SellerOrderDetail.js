import React,{useState,useEffect} from "react";
import {View, Text,TouchableOpacity,Image,ScrollView,StyleSheet,ImageBackground,Modal,Dimensions} from "react-native"
import MapView,{Marker} from "react-native-maps";
import cusmapstyle from '../json/mapstyle.json'
import { Button } from "react-native-elements";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons"
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase'; 
import { setheight, setWidth, setSptext } from '../component/ScreenUtil';
import {Ionicons} from "@expo/vector-icons"
import { color } from "react-native-reanimated";

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;


const SellerOrderDetailScreen = ({route,navigation}) =>{
    const [showfinish,setshowfinish] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [isScan,setisScan] = useState(false);
    const [useruid, setUid] = useState("");

    const { food } = route.params;
    const { name } = route.params;
    const { Buyerphoto } = route.params;
    const { Buyername } = route.params;
    const { BuyerID } = route.params;
    const { img } = route.params;
    const { foodDetail } = route.params;
    const { number } = route.params;
    const { date } = route.params;
    const { orderID } = route.params;
    

   
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const handleBarCodeScanned = ({ type, data }) => {

        if(data === orderID) {
        setisScan(false);
        setshowfinish(true);
        }else {
            setisScan(false);
            alert(`unfinish`);
            }
      };
      const HandleConfirm = () => {
          Addnifnishorder();
          setshowfinish(false);
          navigation.navigate('User');  
      }

      const Addnifnishorder = () => {
        firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Shareorder").child("finish").child(orderID).set({
            name:name,
            img:img,
            food:food,
            foodDetail:foodDetail,
            Buyerphoto:Buyerphoto,
            BuyerID:BuyerID,
            Buyername:Buyername,
            date:date,
            time:firebase.database.ServerValue.TIMESTAMP,
            orderID:orderID
          });


          firebase.database().ref("Users").child(BuyerID).child("Buyorder").child("finish").child(orderID).set({
            name:name,
            food:food,
            foodDetail:foodDetail,
            SellerPhoto:firebase.auth().currentUser.photoURL,
            img:img,
            date:date,
            time:firebase.database.ServerValue.TIMESTAMP,
            orderID:orderID,
          });

          firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Shareorder").child("unfinish").child(orderID).remove();
          firebase.database().ref("Users").child(BuyerID).child("Buyorder").child("unfinish").child(orderID).remove();
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
    return isScan ? (
        <View
        style={{
          flex:1,
          flexDirection: 'column',
          alignItems:'center',
          justifyContent:'center'
          
        }}>
        
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject,{flex:1,width:'100%',height:setheight(555)}}
          >
              <View style={{marginTop:62}}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',borderRadius:10,marginLeft:setWidth(16),backgroundColor:'#fff',width:setWidth(42),height:setheight(42)}} onPress={()=>setisScan(false)}>
            <AntDesign name="close" size={24} color='#656565' />
            </TouchableOpacity>
            </View>
            
            <View style={{marginTop:setheight(93),alignItems:'center',justifyContent:'center'}}>
            <Image
            source={require('../icon/square.png')}
            style={{width:setWidth(221),height:setheight(221)}} />
         
             </View>
          
          <View style={{paddingTop:setheight(34),paddingLeft:setWidth(48),backgroundColor:'#fff',marginTop:setheight(91),borderRadius:25,height:setheight(303),width:devicewidth}}>

            <Text style={{color:'#656565',fontSize:setSptext(18)}}>掃描QRcode</Text>
            <Text style={{marginTop:setheight(8),color:'#656565',fontSize:setSptext(18)}}>完成分享步驟</Text>
            <Image
                        source={require('../img/toastBaby.png')}
                        style={{height:setheight(182),
                        width:setWidth(182),
                        marginLeft:setWidth(133)
                    }}
                        />
            
        </View>
        </BarCodeScanner>
        
        
 
      </View>

    ):(

        <ScrollView style={{backgroundColor:'#fff'}}>
            
            <View style={styles.detailView}> 
            <View style={{flexDirection:'row',height:setheight(196)}}>
                <ImageBackground 
                source={require('../img/account_bg.png')}
                style={{zIndex:5,height:setheight(252),width:devicewidth}}
                >
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={{width:42,height:42,backgroundColor:'#fff',borderRadius:10,alignItems:'center',paddingTop:12,marginLeft:16}}>
                    <Image
                    source={require('../icon/back.png')}
                    style={{width:18,height:18}}
                    />
            </TouchableOpacity>
            
            </ImageBackground>
            
            </View>
            <View style={{top:setheight(126),position:'absolute',alignSelf:'center',zIndex:5}}>
                <Image
                source={{uri:img}}
                style={{borderRadius:15,width:setWidth(195),height:setheight(195)}}
                />
                <Text style={{fontSize:setSptext(22),marginTop:setheight(8),alignSelf:'center',}}>{food}</Text>
            </View>


            <View style={styles.fooddetailcard}>
            <View style={{marginTop:setheight(120)}}>

            <View style={{marginTop:setheight(16),flexDirection:'row',justifyContent:'center'}}>
                <TouchableOpacity style={styles.btn_touchable}>
                    <Image source={require('../icon/chat2x.png')} style={{width:setWidth(18),height:setheight(18)}} />
                    <Text style={{color:'#fff',fontSize:setSptext(15),marginLeft:setSptext(8)}}>聯絡分享人</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>setisScan(true)} style={styles.btn_touchable2}>
                <AntDesign name="scan1" size={setWidth(18)} color="#fff"/>
                    <Text style={{color:'#fff',fontSize:setSptext(15),marginLeft:setSptext(8)}}>掃描QRcode</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>

            <View style={styles.buyer_detail_card}>
            <View >
                <Text style={{fontSize:setSptext(18),color:'#656565',fontWeight:'bold'}}>領取人資訊</Text>
                <View style={{flexDirection:'row',marginTop:setheight(26)}}>
                    <Text style={styles.buyer_detail_text}>領取人</Text>
                    <Image
                    style={{width:setWidth(32),height:setheight(32),borderRadius:20,bottom:5}}
                    source={{uri:Buyerphoto}}
                    />
                    <Text style={styles.buyer_detail_text_namecontent}>{Buyername}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:setheight(16)}}>
                    <Text style={styles.buyer_detail_text}>領取時間</Text>
                    <Text style={styles.buyer_detail_text_content}>時間還沒用</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:setheight(16)}}>
                    <Text style={styles.buyer_detail_text}>數量</Text>
                    <Text style={styles.buyer_detail_text_content}>1</Text>
                </View>
            </View>
            </View>
            </View>
            
            <View style={styles.fooddetailcontent}>

        
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>價格</Text>
                        <Text style={styles.fooddetailcontent_text}>免費</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>說明</Text>
                        <Text style={styles.fooddetailcontent_text}>{foodDetail}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>期限</Text>
                        <Text style={styles.fooddetailcontent_text}>{date}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>地點</Text>
                    <Text style={styles.fooddetailcontent_text}>捷運科技大樓站</Text>
                </View>
            </View>

            <Modal
            visible={showfinish}
            transparent
            animationType="fade"
            onRequestClose={() => {}}
            >
                <View style={styles.containerStyle}>
                    <View style={styles.finish_cardstyle}>
                    <LottieView
                    style={{height: setheight(200),width:setWidth(200)}}
                    source={require("../json/final.json")}
                    autoPlay loop
                    speed={1}
                    />
                    <Text style={{color:'#656565'}}>交易完成 !</Text>
                    <Text style={{marginTop:setheight(8),color:'#656565'}}>獲得想享幣一枚</Text>

                    <Button
                        title="確定"
                        titleStyle={{color:'#fff',fontSize:13}}
                        buttonStyle={styles.confirmbutton}
                        onPress={HandleConfirm}
                        />
                    </View>

                </View>     
        </Modal>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                
                <MapView
                region={region}
                style={styles.mapstyle}
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
            <View style={{alignItems:'center',marginTop:setheight(16)}}>
                <TouchableOpacity style={styles.cancel_btn}>
                    <Text style={{color:'#ffff',fontSize:setSptext(15)}}>取消訂單</Text>
                </TouchableOpacity>
            </View>
            </View>
            </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    cancel_btn:{
        width:setWidth(340),
        height:setheight(42),
        backgroundColor:'#F0A202',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    mapstyle:{
        marginTop:setheight(8),
        width:setWidth(340),
        height:setheight(318),
        borderRadius:10
    }, 
    confirmbutton:{ 
        backgroundColor: '#f0A202', 
        width: setWidth(103), 
        height:setheight(42),
        borderRadius:10,
        marginTop:setheight(24)
    },
    finish_cardstyle:{
        paddingTop:setheight(40),
        width:setWidth(287),
        height:setheight(393),
        borderRadius:20,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    containerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "relative",
        flex: 1,
        justifyContent: "center",
        alignItems:'center'
        
      },
    buyer_detail_text_namecontent:{
        fontSize:setSptext(18),
        color:'#656565',
        marginLeft:setWidth(8)
    },
    buyer_detail_text_content:{
        fontSize:setSptext(18),
        color:'#656565',

    },
    buyer_detail_text:{
        fontSize:setSptext(18),
        color:'#656565',
        width:setWidth(86)

    },
    buyer_detail_card:{
        width:setWidth(311),
        height:setheight(222),
        borderRadius:20,
        shadowColor:'#76510466',
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.4,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        marginTop:setheight(33)
        
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
    fooddetailcard:{
        flex:1,
        backgroundColor:'#fff',
        borderTopEndRadius:25,
        borderTopStartRadius:25
    },
    fooddetailcontent:{
        backgroundColor:'#fff',
        marginTop:setheight(32)

    },
    fooddetailcontent_text:{
        color:'#656565',
        fontSize: setSptext(18)

    },
    fooddetailcontent_text2:{
        color:'#656565',
        fontSize: setSptext(15)

    },
    
    detailView:{
        backgroundColor:'#F0A202',
        flex:1,
        paddingTop:setheight(44)

    },
    Userphoto:{
        width:setheight(64),
        height:setheight(64),
        borderRadius:35,
        marginLeft:setWidth(16)
    },
    FooddetailList:{
        height:setheight(42),
        width:devicewidth,
        marginLeft:setWidth(32),
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
    }


})

export default SellerOrderDetailScreen;