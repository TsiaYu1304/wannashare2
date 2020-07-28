import React,{useContext, useState,useEffect}from 'react';
import { ActionSheetIOS,StyleSheet, Text, View, Image, ImageBackground ,TouchableOpacity,Dimensions,FlatList} from 'react-native';
import {Button} from "react-native-elements";
import {StoreContext}from "../store/UserStore.js";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import * as firebase from 'firebase'; 
import fakefoodfata from "../json/fooddetail.json"
import * as ImagePicker  from 'expo-image-picker'
import { setheight, setWidth, setSptext } from '../component/ScreenUtil';

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;


const Foodcard = ({post, navigation}) => {
    return(
        <View style={{height:setheight(120) }}>
        <TouchableOpacity
            onPress={() => navigation.navigate('OrderDetail',{
                food:post.food,
                name:post.name,
                img:post.img,
                SellerPhoto:post.SellerPhoto,
                foodDetail:post.foodDetail,
                date:post.date,
                confirmtime:post.confirmtime,
                orderID:post.orderID,
                transtime:post.transtime

              })}
        >
        <View style={{flexDirection:'row',marginTop:25}}>
            <Image
            source={{uri:post.img}}
            style={{height:88,width:88,borderRadius:10,marginLeft:26}}
            />
            <View style={{marginTop:5,marginLeft:16}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:setWidth(140)}}>
                        <Text>{post.name}</Text>
                        <Text style={{fontSize:18,marginTop:8}}>{post.food}</Text>            
                    </View>
                    <Button
                    title="聯絡他"
                    buttonStyle={{backgroundColor:'#F0A202',borderRadius:10,height:36,width:82}}
                    titleStyle={{fontSize:14}}
                    />
                </View>
                <Text style={{marginTop:8}}>領取期限:{post.date}前</Text>
            </View>
            

        </View>
        </TouchableOpacity>
        
    </View>

    )
}

const FiniFoodcard = ({post, navigation}) => {
    return(
        <View style={{height:setheight(120) }}>
        <TouchableOpacity
            onPress={() => navigation.navigate('BuyerFinishOrder',{
                food:post.food,
                name:post.name,
                img:post.img,
                SellerPhoto:post.SellerPhoto,
                foodDetail:post.foodDetail,
                date:post.date,
                confirmtime:post.confirmtime,
                orderID:post.orderID,
                transtime:post.transtime,
                confirmtime:post.confirmtime

              })}
        >
        <View style={{flexDirection:'row',marginTop:25}}>
            <Image
            source={{uri:post.img}}
            style={{height:88,width:88,borderRadius:10,marginLeft:26}}
            />
            <View style={{marginTop:5,marginLeft:16}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:setWidth(140)}}>
                        <Text>{post.name}</Text>
                        <Text style={{fontSize:18,marginTop:8}}>{post.food}</Text>            
                    </View>
                    <Button
                    title="聯絡他"
                    buttonStyle={{backgroundColor:'#F0A202',borderRadius:10,height:36,width:82}}
                    titleStyle={{fontSize:14}}
                    />
                </View>
                <Text style={{marginTop:8}}>領取期限:{post.date}前</Text>
            </View>
            

        </View>
        </TouchableOpacity>
        
    </View>

    )
}


  
  
const User = ({navigation}) => {
    
    let finishExist = false;
    const [finifoodData,setFinifoodData] = useState([]);
    const [foodData,setFoodData] = useState([]);
    const {userState} = useContext(StoreContext);
    const [user,setUser] = userState;
    const [Orderexist,setOrder] = useState(false);
    const [Finiorderexist,setFiniorder] = useState(false);
    const [tabnumber,setNum] = useState(0);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
    { key: 'first', title: '尚未領取' },
    { key: 'second', title: '已領取' },
  ]);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    const blob = await new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        }
        xhr.onerror = function(e){
            console.log(e);
            reject(new TypeError('NetWork request faild'));
        };
        xhr.responseType = 'blob';
        xhr.open('Get',pickerResult.uri,true);
        xhr.send(null);
    });

    try{
        const ref = firebase.storage().ref(firebase.auth().currentUser.uid)
        var snapshot =  ref.put(blob);
        const imgURL = await (await snapshot).ref.getDownloadURL();
    }catch(e){
        console.warn(e);
    }

    try{

    await firebase.auth().currentUser.updateProfile({
        photoURL:imgURL
    })
    }catch(e){
        console.warn(e);
    }

  };




  const FirstRoute = () => (
    Orderexist?(
        
        <FlatList
            data = {foodData}
            renderItem = {({item}) => 
            <Foodcard
            post = {item}
            navigation = {navigation}
            />}
            keyExtractor = {item => item.name}
        />
        
    ):(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image 
            source={require('../img/No_buy.png')}
            style={{height:setheight(200),width:setWidth(200)}}
            />
            <Text style={{color:'#656565',fontSize:setSptext(18)}} >尚無未領取食物</Text>
        </View>
    )
    
  );

  const SecondRoute = () => (
    Finiorderexist? (
        <FlatList
            data = {finifoodData}
            renderItem = {({item}) => 
            <FiniFoodcard
            post = {item}
            navigation = {navigation}
            />}
            keyExtractor = {item => item.name}
        />
    ):(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image 
            source={require('../img/No_buy.png')}
            style={{height:setheight(200),width:setWidth(200)}}
            />
            <Text style={{color:'#656565',fontSize:setSptext(18)}} >尚無已領取食物</Text>
        </View>
    )
  );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        
      });



    useEffect(()=>{
        storefirebaseauth();
        },[]);
        const storefirebaseauth = () => {
            try{
            firebase.auth().signInWithEmailAndPassword(user.email, user.password);
            setUser({...user,email:firebase.auth().currentUser.email})
            setUser({...user,name:firebase.auth().currentUser.displayName})
            setUser({...user,userphoto:firebase.auth().currentUser.photoURL})
            }catch(e){
                console.warn(e);
            }
        };
  
    useEffect(()=>{
    readunFinishData();
    readFinishData();
    },[]);

    useEffect(()=>{
        listenData();
    },[]);


    const listenData = ()=>{
        try{
        firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Buyorder").child("unfinish").on('child_added',function(data){
            readunFinishData();
        });
        }catch(e){
            console.warn(e);
        };

        try{

        firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Buyorder").child("finish").on('child_added',function(data){
            readFinishData();
        });
        }catch(e){
            console.warn(e);
        }
    }

    const readFinishData = async () => {
        const FiniFoodDetail = [];
        try{
        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Buyorder").child("finish").once('value', function(snapshot) {
            if(snapshot.exists()){
                snapshot.forEach(function(childSnapshot) {
                    FiniFoodDetail.push({
                        food:childSnapshot.val().food,
                        name:childSnapshot.val().name,
                        img:childSnapshot.val().img,
                        SellerPhoto:childSnapshot.val().SellerPhoto,
                        foodDetail:childSnapshot.val().foodDetail,
                        date:childSnapshot.val().date,
                        time:childSnapshot.val().time,
                        orderID:childSnapshot.val().orderID  ,
                        transtime:childSnapshot.val().transtime,
                        confirmtime:childSnapshot.val().confirmtime      
                    });
                  });
                  setFinifoodData(FiniFoodDetail);
                  setFiniorder(true);
            }else{
                setFiniorder(false);
            }
        });
    }catch(e){
        console.warn(e);
    }
            
       
  
    };

    const readunFinishData = async () => {
        const FoodDetail = [];
        try{
        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Buyorder").child("unfinish").once('value', function(snapshot) {
            if(snapshot.exists()){
                snapshot.forEach(function(childSnapshot) {
                    FoodDetail.push({
                        food:childSnapshot.val().food,
                        name:childSnapshot.val().name,
                        img:childSnapshot.val().img,
                        SellerPhoto:childSnapshot.val().SellerPhoto,
                        foodDetail:childSnapshot.val().foodDetail,
                        date:childSnapshot.val().date,
                        confirmtime:childSnapshot.val().confirmtime,  //下定訂單時間
                        transtime:childSnapshot.val().transtime,
                        orderID:childSnapshot.val().orderID,
                        price:childSnapshot.val().price   
                    });
                    console.log(childSnapshot.val().transtime)
                  });
                  setFoodData(FoodDetail);
                  setOrder(true);
            }else{
                setOrder(false);
            }
        });
    }catch(e){
        console.warn(e);
    }
  
    };

    const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["取消", "打開相簿","打開相機"],
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          openImagePickerAsync();
        }
      }
    );

 

    return (
        <View style={{flex:1,backgroundColor:'#F0A202'}}>
            <View style={styles.user_profile}>
                <ImageBackground
                    style={styles.userbackgoundimg}
                    source={require("../img/account_bg.png")}
                >
                    <View style={{height:setheight(162),alignItems:'center'}}>
                    <TouchableOpacity onLongPress={onPress}>
                    <Image
                        style={styles.user_profile_img_}
                        source={{uri:user.userphoto}}
                    />
                    </TouchableOpacity>
    <Text style={styles.user_profile_name}>{user.name}</Text>
    <Text style={styles.user_profile_mail}>{user.email}</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:setWidth(30)}}>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity style={styles.btn4_touchable}
                            onPress={() => navigation.navigate('Coin')}>
                                <Image
                                source={require("../icon/coin.png")}
                                style={styles.btn4_img}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>想享幣</Text>
                        </View>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity style={styles.btn4_touchable}
                            onPress={() => navigation.navigate('Chat')}>
                                <Image
                                source={require("../icon/messege.png")}
                                style={styles.btn4_img}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>聊天紀錄</Text>
                        </View>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity style={styles.btn4_touchable}
                            onPress={() => navigation.navigate('Coupon')}>
                                <Image
                                source={require("../icon/coupon.png")}
                                style={styles.btn4_img}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>優惠券</Text>
                        </View>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity 
                            onPress={() => navigation.navigate('Setting')}
                            style={styles.btn4_touchable}>
                                <Image
                                source={require("../icon/setting.png")}
                                style={styles.btn4_img}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>設定</Text>
                        </View>
                        
                    </View>

                </ImageBackground>

                <View style={styles.user_profile_img}>
                    <Image
                        style={styles.user_profile_img_}
                        source={require("../img/user_img.png")}
                    />
                </View>
                <View style={styles.user_profile_name}>
                <Text style={styles.user_profile_name_}>{user.name}</Text>
                <Text style={styles.user_profile_name_}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.order_view}>
                
            <TabView
            style={{top:setheight(13)}}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props=>
                <TabBar
                    {...props}
                    style={{backgroundColor:'#fff',color:'#656565',shadowColor:'#fff'}}
                    indicatorStyle={{ backgroundColor: '#F0A202' ,width:setWidth(94),marginLeft:setheight(49)}}
                    labelStyle={{color:'#656565',fontSize:setSptext(17)}}
                />
            }

            />
            </View>
            
        </View>
    );
}
const styles = StyleSheet.create({
    order_view:{
        backgroundColor:'#fff',
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        flex:1
        
    },
    user_profile: {
        marginTop:setheight(44),
        width: devicewidth,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor:'#F0A202'
    },
    user_profile_img: {
        width: setWidth(114),
        height: setheight(132)
    },
    user_profile_img_: {
        width: setWidth(88),
        height: setheight(88),
        borderRadius: 50

    },
    user_profile_name:{
        color:'#fff',
        fontSize:setSptext(22)
    },
    user_profile_mail:{
        color:'#fff',
        fontSize:setSptext(14)
    },
    btn4_view:{
        flexDirection:'column',
        alignItems:'center',
        paddingLeft:setWidth(19)
    },
    btn4_touchable:{
        width:setWidth(55),
        height:setheight(55),
        borderRadius:30,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'#765104',
        shadowOpacity:0.4,
        shadowOffset:{width:10,height:10},
    },
    btn4_text:{
        color:'#fff',
        marginTop:setheight(10),
        fontSize:setSptext(12)
    },
    btn4_img:{
        width:setWidth(44),
        height:setheight(44)
    },
    userbackgoundimg:{
        width:devicewidth,
        height:setheight(312),
        paddingTop:setheight(22)
    }





});
export default User;