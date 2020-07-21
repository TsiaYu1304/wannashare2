import React,{useState,useEffect} from "react";
import {View, Text,TouchableOpacity,Image,ScrollView,StyleSheet,ImageBackground} from "react-native"
import MapView,{Marker} from "react-native-maps";
import * as firebase from 'firebase'; 
import Qrocde from 'react-native-qrcode-svg' 
import QRCode from "react-native-qrcode-svg";
//let db = firebase.firestore();
//let Auth = firebase.auth();

const OrderDetailScreen = ({route,navigation}) =>{
    
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
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={{width:42,height:42,backgroundColor:'#fff',borderRadius:10,alignItems:'center',paddingTop:12,marginLeft:16}}>
                    <Image
                    source={require('../icon/back.png')}
                    style={{width:18,height:18}}
                    />
            </TouchableOpacity>
            <View style={{marginTop:16,alignItems:'center'}}>
            <QRCode
                value= {orderID}
                size={235}
            />
            <Text style={{fontSize:22,marginTop:8,color:'#fff'}}>{food}</Text>
            </View>
            <View style={{backgroundColor:'#fff',borderRadius:25,marginTop:8,paddingTop:40}}>
    
            <View >
            <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>分享者</Text>
                        <Text>{name}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>說明</Text>
                        <Text >{foodDetail}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>期限</Text>
                        <Text>{date}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>數量</Text>
                        <Text>{number}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>地點</Text>
                    <Text >台北市大安區和平東路360號</Text>
                </View>
            </View>
            <View style={{height:372,justifyContent:'center',alignItems:'center'}}>
                <MapView
                region={region}
                style={{width:340,height:340}}
                showsTraffic
                provider="google"
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailView:{
        backgroundColor:'#F0A202',
        paddingTop:62

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