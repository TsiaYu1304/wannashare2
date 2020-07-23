import React,{useState,useEffect} from "react";
import {View, Text,TouchableOpacity,Image,ScrollView,StyleSheet,ImageBackground} from "react-native"
import {Button} from "react-native-elements";
import fooddata from "../json/fooddetail.json";
import { round } from "react-native-reanimated";
import MapView,{Marker} from "react-native-maps";
import Confirm from "../component/Confirm.js"
import * as firebase from 'firebase'; 
import {nanoid} from  'nanoid/async/index.native'



const FooddetailScreen = ({route,navigation}) =>{
    
    const [useruid, setUid] = useState("");
    const { name } = route.params;
    const { food } = route.params;
    const { SellerPhoto } = route.params;
    const { img } = route.params;
    const { foodDetail } = route.params;
    const { orderID } = route.params;
    const { date } = route.params;
    const { number } = route.params;
    const { sellerUID } = route.params;
    const { price } = route.params;
    const [showModal, setShowModal] = useState(false);
    const { Myname } = firebase.auth().currentUser.displayName;
    const { MyUID } = firebase.auth().currentUser.uid;
    const { MyURL } = firebase.auth().currentUser.photoURL;
    const [Dataexist,setExist] = useState(false);
    const [Room_ID,setRoomID] = useState("");

    //建立聊天室資料庫
    const BuildChatRoominUserData = (ID) =>{
        //買家方增加聊天室
        firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Chatroom").child(ID).set({
            RoomID:ID,
            anotheruser:name,
            anotheruserUID:sellerUID,
            anotheruserURL:SellerPhoto
        });
        //賣加方增加聊天室
        firebase.database().ref("Users").child(sellerUID).child("Chatroom").child(ID).set({
            RoomID:ID,
            anotheruser:Myname,
            anotheruserUID:MyUID,
            anotheruserURL:MyURL
        });
    };

    const BuildChatRoominOrderData = (ID) =>{
        //在聊天室資料夾增加我的資料
        firebase.database().ref("ChatRoom").child(ID).child("Users").child(Myname).set({
            name:Myname,
            uid:MyUID,
            URL:MyURL
        });
        //firebase.database().ref("ChatRoom").child(ID).child("Users").child(Myname).off();
        console.log("聊天室建立我的資料");

        //在聊天室資料夾增加賣方資料
        firebase.database().ref("ChatRoom").child(ID).child("Users").child(name).set({
            name:name,
            uid:sellerUID,
            URL:SellerPhoto
        });
        //firebase.database().ref("ChatRoom").child(ID).child("Users").child(name).off();
        console.log("聊天室建立賣家的資料");
    };

    const Chatwithseller = async () => {
        let RoomExist = false;
        let iid = await nanoid(10);
        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).
        child("Chatroom").orderByChild('anotheruser').equalTo(name).once("value",snapshot => {
            if(snapshot.exists()){ //如果聊天室存在

                snapshot.forEach(function(childSnapshot) {
                    iid = childSnapshot.val().RoomID;  //取得RoomID
                });
                //setExist(true);
                RoomExist = true;
                console.log(iid )
            }else{
                RoomExist = false;
                //setExist(false);
                setRoomID(iid);
                console.log("nono");
            }
        });
        //console.log(`Roomid = ${Room_ID}`)

        if(RoomExist){  //聊天室存在
            //就要導到跟那個賣家聊天的畫面
            navigation.navigate('ChatRoom',{
                name:name,
                SellerPhoto:SellerPhoto,
                RoomID:iid
            })
        }else{
            //console.log(`Myname = ${firebase.auth().currentUser.displayName}`)
            firebase.database().ref("ChatRoom").child(iid).child(firebase.auth().currentUser.displayName).set({
                name:firebase.auth().currentUser.displayName,
                uid:firebase.auth().currentUser.uid,
                URL:firebase.auth().currentUser.photoURL
            });
            firebase.database().ref("ChatRoom").child(iid).child(name).set({
                name:name,
                uid:sellerUID,
                URL:SellerPhoto
            });
            firebase.database().ref("Users").child(sellerUID).child("Chatroom").child(iid).set({
                RoomID:iid,
                anotheruser:firebase.auth().currentUser.displayName,
                anotheruserUID:firebase.auth().currentUser.uid,
                anotheruserURL:firebase.auth().currentUser.photoURL
            });
            firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Chatroom").child(iid).set({
                RoomID:iid,
                anotheruser:name,
                anotheruserUID:sellerUID,
                anotheruserURL:SellerPhoto
            });

            navigation.navigate('ChatRoom',{
                name:name,
                SellerPhoto:SellerPhoto,
                RoomID:iid
            })
        }
    }

    
    function addunfinishorder() { //下單建立訂單資料庫


        //領取者 “買訂單” “未完成”
        firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Buyorder").child("unfinish").child(orderID).set({
            name:name,
            food:food,
            foodDetail:foodDetail,
            SellerPhoto:SellerPhoto,
            img:img,
            date:date,
            time:firebase.database.ServerValue.TIMESTAMP,
            orderID:orderID,
            price:price
          });

          //分享者 “分享訂單” “完成：未完成”

          firebase.database().ref("Users").child(sellerUID).child("Shareorder").child("finish").child(orderID).set({
            name:name,
            food:food,
            foodDetail:foodDetail,
            Buyerphoto:firebase.auth().currentUser.photoURL,
            price:price,
            BuyerID:firebase.auth().currentUser.uid,
            img:img,
            date:date,
            time:firebase.database.ServerValue.TIMESTAMP,
            orderID:orderID,
            finish:false
          });

          firebase.database().ref("Users").child(sellerUID).child("Shareorder").child("unfinish").child(orderID).remove();
          firebase.database().ref("Orders").child(orderID).remove();
      }

    const AcceptOrder = () => { //確認下單
        addunfinishorder();
        setShowModal(false);

        
    };
    const onOpenModal = () => { //按我要下單
        setShowModal(true);
      }
      
      const onCLoseModal = () => {
        setShowModal(false);
    };

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
    //console.log(`post name=${post.name}`);
    return (

        <ScrollView style={{backgroundColor:'#fff'}}>
            <View style={{
        shadowColor:"#9A9A9A",
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.4}}>
            <ImageBackground
                source={{uri:img}}
                style={styles.Foodimg}

            >
                <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={{width:42,height:42,backgroundColor:'#fff',borderRadius:10,alignItems:'center',paddingTop:12}}>
                    <Image
                    source={require('../icon/back.png')}
                    style={{width:18,height:18}}
                    />
                </TouchableOpacity>
            </ImageBackground>
            </View>
            <View style={styles.detailView}> 
            <View style={styles.SellerSection}>
                <Image
                    source={{uri:SellerPhoto}}
                    style={styles.Userphoto}
                />
                <View style={{marginLeft:8}}>
                    <Text style={{fontSize:12,color:'#949494'}}>{name}</Text>
                    <Text style={{fontSize:22,color:'#949494'}}>{food}</Text>
                    <Text style={{fontSize:12,color:'#949494',marginTop:2}}>5小時前發布</Text>
                </View>
                <View style={styles.Disandprice}>
                   
                    <Image
                        source={require('../icon/pricetag.png')}
                        style={{height:26,width:26,marginTop:-2}}
                    />
                    <Text style={{fontSize:18,color:'#949494'}}>{price}</Text>
                </View>
            </View>
            <View style={styles.Twobutton}>
                <TouchableOpacity onPress={Chatwithseller}>
                    <View style={styles.btn}>
                        <Image
                        source={require('../icon/chat2x.png')}
                        style={{width:18,height:18}}
                        />
                        <Text style={{fontSize:15 ,marginLeft:14,color:'#fff'}}>聯絡分享者</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={onOpenModal}>
                    <View style={styles.btn}>
                        <Image
                        source={require('../icon/shopping-bag.png')}
                        style={{width:18,height:18}}
                        />
                        <Text style={{fontSize:15 ,marginLeft:14,color:'#fff'}}>我要下訂
                        </Text>
                    </View>
                </TouchableOpacity>
                <Confirm
                title="確定下單?"
                visible={showModal}
                onAccept={ ()=>{
                            AcceptOrder()
                            navigation.navigate('User')                                   
                         }}
                onDecline={onCLoseModal}
                />
            </View>
            <View >
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14}}>說明</Text>
                        <Text style={{fontSize:14 ,marginLeft:32}}>{foodDetail}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14}}>期限</Text>
                        <Text style={{fontSize:14 ,marginLeft:32}}>{date}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14}}>數量</Text>
                        <Text style={{fontSize:14 ,marginLeft:32}}>{number}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14}}>地點</Text>
                    <Text style={{fontSize:14 ,marginLeft:32}}>台北市大安區和平東路360號</Text>
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailView:{
        backgroundColor:'#fff',
        borderRadius:20,
        top:-28

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
        paddingLeft:19,
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

export default FooddetailScreen;