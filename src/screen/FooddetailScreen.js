import React,{useState,useEffect} from "react";
import {View,TextInput ,Modal,Text,TouchableOpacity,Image,ScrollView,StyleSheet,ImageBackground,Dimensions} from "react-native"
import { Card, Button } from "react-native-elements";
import MapView,{Marker} from "react-native-maps";
import cusmapstyle from '../json/mapstyle.json'
import * as firebase from 'firebase'; 
import {nanoid} from  'nanoid/async/index.native'
import { setWidth, setheight, setSptext } from '../component/ScreenUtil';
import {Fontisto} from "@expo/vector-icons"
const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;


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
    const [showConfirm,setShowConfirm]= useState(false);
    const { Myname } = firebase.auth().currentUser.displayName;
    const { MyUID } = firebase.auth().currentUser.uid;
    const { MyURL } = firebase.auth().currentUser.photoURL;
    const { location } = route.params;
    const [Dataexist,setExist] = useState(false);
    const [Room_ID,setRoomID] = useState("");
    const [choseDate,setChoseDate] = useState("");

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
            confirmtime:firebase.database.ServerValue.TIMESTAMP,  //訂單成立時間
            orderID:orderID,
            price:price,
            transtime:choseDate
          });

          //分享者 “分享訂單” “完成：未完成”

          firebase.database().ref("Users").child(sellerUID).child("Shareorder").child("unfinish").child(orderID).set({
            name:name,
            img:img,
            food:food,
            foodDetail:foodDetail,
            price:price,
            Buyerphoto:firebase.auth().currentUser.photoURL,
            BuyerID:firebase.auth().currentUser.uid,
            Buyername:firebase.auth().currentUser.displayName,
            date:date,
            confirmtime:firebase.database.ServerValue.TIMESTAMP, //訂單成立時間
            orderID:orderID,
            transtime:choseDate
          });

          firebase.database().ref("Users").child(sellerUID).child("Shareorder").child("foodshop").child(orderID).remove();
          firebase.database().ref("Orders").child(orderID).remove();
      }
  
    //Modal
    const AcceptShowConfrim = () => {
        setShowConfirm(false);
        navigation.navigate('User')
    }

    const AcceptOrder = () => { //確認下單
        addunfinishorder();
        setShowModal(false);
        setShowConfirm(true);
        
        
    };
    const onOpenModal = () => { //按我要下單
        setShowModal(true);
      }
      
      const onCLoseModal = () => {
        setShowModal(false);
    };

    //地圖

    const [region,setRegion] = useState({
        longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.008,
    latitudeDelta: 0.008,
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
        <View style={{flex:1}}>
        <ScrollView style={{backgroundColor:'#fff'}}>
            
            <View >
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
                    <Text style={{fontSize:setSptext(14),color:'#656565'}}>{name}</Text>
                    <Text style={{fontSize:setSptext(20),color:'#656565',marginTop:setheight(4)}}>{food}</Text>
                    <Text style={{fontSize:setSptext(14),color:'#656565',marginTop:setheight(4)}}>5小時前發布</Text>
                </View>
                <View style={styles.Disandprice}>
                   
                    <Image
                        source={require('../icon/pricetag.png')}
                        style={{height:26,width:26,marginTop:-2}}
                    />
                    <Text style={{marginLeft:setWidth(2),fontSize:setSptext(18),color:'#949494'}}>{price}</Text>
                </View>
            </View>
            <View style={styles.Twobutton}>
                <TouchableOpacity onPress={Chatwithseller}>
                    <View style={styles.btn2}>
                        <Image
                        source={require('../icon/chat2x.png')}
                        style={{width:setWidth(18),height:setheight(18)}}
                        />
                        <Text style={{fontSize:setSptext(15) ,marginLeft:setWidth(14),color:'#fff'}}>聯絡分享者</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={onOpenModal}>
                    <View style={styles.btn}>
                        <Image
                        source={require('../icon/shopping-bag.png')}
                        style={{width:setWidth(18),height:setheight(18)}}
                        />
                        <Text style={{fontSize:setSptext(15) ,marginLeft:setWidth(14),color:'#fff'}}>我要下訂
                        </Text>
                    </View>
                </TouchableOpacity>

             
    <Modal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.containerStyle}>
        <Card containerStyle={styles.cardstyle} 
              dividerStyle={{width:0}} 
              titleStyle={{fontSize:setSptext(17),color:'#656565'}}
              title={"確認訂單"}
        >
          <View style={{marginTop:setheight(24),flexDirection:'row',marginLeft:setWidth(18)}}>
          <Text style={{color:'#656565',fontSize:setSptext(18)}}>數量</Text>
          <TextInput
          value={"1"}
          style={{marginLeft:setWidth(82),fontSize:setSptext(18)}}
          />
          </View>
          <Text style={{color:'#656565',marginTop:setheight(53),fontSize:setSptext(18),marginLeft:setWidth(18)}}>領取時間</Text>
          
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <TextInput
                    style={{fontSize:setSptext(18),color:'#656565',marginTop:setheight(16),marginLeft:setWidth(18)}}
                    placeholder="2020-08-11 16:00"
                    value={choseDate}
                    onChangeText={(choseDate) =>setChoseDate(choseDate)}
                    />
          <Fontisto name="date" size={setheight(24)} color='#000' style={{left:setWidth(24),top:setheight(8)}} /> 
                    
          
          </View>
          <View style={{ flexDirection: "row" ,justifyContent:'center',marginTop:setheight(57)}}>
            <Button
              title="取消"
              titleStyle={{color:'#F0A202'}}
              buttonStyle={styles.cancelbtn}
              onPress={onCLoseModal}
            />
            <Button
              title="確定"
              titleStyle={{color:'#fff'}}
              buttonStyle={styles.buttonstyle}
              onPress={AcceptOrder}
            />
          </View>
        </Card>
      </View>
    </Modal>

    <Modal
      visible={showConfirm}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
       <View style={styles.containerStyle}>
        <Card containerStyle={styles.card2style} 
              dividerStyle={{width:0}} 
              titleStyle={{fontSize:setSptext(17),color:'#656565'}}
              title={"訂單已下訂 !"}
        >
            <Button
            title="好"
            titleStyle={{color:'#fff'}}
            buttonStyle={styles.confirmbutton}
            onPress={AcceptShowConfrim}
            />
        </Card>
        </View>

    </Modal>

    
            </View>
            <View style={{marginLeft:setWidth,marginTop:setheight(16)}}>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(14)}}>說明</Text>
                        <Text style={styles.listcontent}>{foodDetail}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(14)}}>期限</Text>
                        <Text style={styles.listcontent}>{date}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(14)}}>數量</Text>
                        <Text style={styles.listcontent}>{number}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(14)}}>地點</Text>
                    <Text style={styles.listcontent}>{location}</Text>
                </View>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <MapView
                region={region}
                style={styles.MAPStyle}
                showsTraffic
                provider="google"
                customMapStyle={cusmapstyle}
                >
                    <Marker
                    coordinate={marker.coord}
                    title={marker.name}
                    description={marker.address}
                    >
                        <Image
                        source={require('../icon/marker.png')}
                        style={{width:setWidth(36),height:setheight(36)}}
                        />
                    </Marker>
                </MapView>
                
            
            </View>
            </View>
            
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    listcontent:{
        fontSize:setSptext(14),
        marginLeft:setWidth(32)
    },
    MAPStyle:{
        width:setWidth(340),
        height:setheight(340),
        borderRadius:10,
        marginTop:setheight(21)
    },
    cardstyle:{
        paddingTop:setheight(40),
        width:setWidth(287),
        height:setheight(380),
        borderRadius:20
    },
    card2style:{
        paddingTop:setheight(40),
        width:setWidth(287),
        height:setheight(168),
        borderRadius:20,
        alignItems:'center'
    },
  containerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems:'center'
    
  },
   confirmbutton:{ 
    backgroundColor: '#f0A202', 
    width: setWidth(103), 
    height:setheight(42),
    borderRadius:10
},
  buttonstyle:{ 
      backgroundColor: '#f0A202', 
      width: setWidth(103), 
      height:setheight(42),
      borderRadius:10,
      marginLeft:setWidth(9)
  },
  cancelbtn:{
    backgroundColor: '#fff', 
    width: setWidth(103), 
    height:setheight(42),
    borderRadius:10,
    borderColor:'#F0A202',
    borderWidth:1,
    marginRight:setWidth(9)

  },
  pickStyles:{
    width:setWidth(223),
    height:setheight(36),
    marginTop:setheight(14),
    right:setWidth(10)
  },
    detailView:{
        backgroundColor:'#fff',
        borderRadius:setWidth(20),
        bottom:setheight(28),
        alignItems:'center',
        paddingTop:setheight(40)

    },
    Foodimg:{
        width:devicewidth,
        height:setheight(327),
        paddingTop:setheight(44),
        paddingLeft:setWidth(16)
    },
    Userphoto:{
        width:setWidth(64),
        height:setheight(64),
        borderRadius:setWidth(35)
    },
    FooddetailList:{
        height:setheight(42),
        width:setWidth(323),
        flexDirection:'row',
        alignItems:'center'
    },
    SellerSection:{
        justifyContent:'flex-start',
        flexDirection:'row',
        height:setheight(70),
        alignItems:'center'
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
        width:setWidth(153),
        height:setheight(42),
        backgroundColor:'#F0A202',
        borderRadius:15,
        marginLeft:setWidth(8),
        marginTop:setheight(16)
    },
    btn2:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:setWidth(153),
        height:setheight(42),
        backgroundColor:'#F0A202',
        borderRadius:15,
        marginRight:setWidth(8),
        marginTop:setheight(16)
    }


})

export default FooddetailScreen;