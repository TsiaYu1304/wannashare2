import React,{useContext, useState,useEffect}from 'react';
import { ActionSheetIOS,StyleSheet, Text, View, Image, ImageBackground ,TouchableOpacity,Dimensions,FlatList,ScrollView} from 'react-native';
import { OrderTabNavigation} from "./index"
import {Button} from "react-native-elements";
import {StoreContext}from "../store/UserStore.js";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import * as firebase from 'firebase'; 
import fakefoodfata from "../json/fooddetail.json"
import * as ImagePicker  from 'expo-image-picker'




const Foodcard = ({post, navigation}) => {
    return(
        <View style={{height:113 }}>
        <TouchableOpacity
            onPress={() => navigation.navigate('OrderDetail',{
                food:post.food,
                name:post.name,
                img:post.img,
                SellerPhoto:post.SellerPhoto,
                foodDetail:post.foodDetail,
                date:post.date,
                time:post.time,
                orderID:post.orderID  

              })}
        >
        <View style={{flexDirection:'row',marginTop:25}}>
            <Image
            source={{uri:post.img}}
            style={{height:88,width:88,borderRadius:10,marginLeft:26}}
            />
            <View style={{flexDirection:'column',marginTop:5,marginLeft:16}}>
                <Text>{post.name}</Text>
                <Text style={{fontSize:18,marginTop:8}}>{post.food}</Text>            
                <Text style={{marginTop:8}}>領取期限:{post.date}前</Text>
            </View>
            <View>
                <Button
                title="聯絡他"
                buttonStyle={{backgroundColor:'#F0A202',borderRadius:10,height:36,width:82}}
                titleStyle={{fontSize:14}}
                />
            </View>

        </View>
        </TouchableOpacity>
        
    </View>

    )
}


  
  
const User = ({navigation}) => {
    const [finifoodData,setFinifoodData] = useState([]);
    const [foodData,setFoodData] = useState([]);
    const {userState} = useContext(StoreContext);
    const [user,setUser] = userState;
    const [Orderexist,setOrder] = useState(false);
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

    const response = await fetch(pickerResult.uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref(firebase.auth().currentUser.uid)
    var snapshot =  ref.put(blob);
    const imgURL = await (await snapshot).ref.getDownloadURL();

    await firebase.auth().currentUser.updateProfile({
        photoURL:imgURL
    })

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
    <View></View>
    )
    
  );

  const SecondRoute = () => (
    <View><View style={{flexDirection:'row',height:88,marginTop:25}}>
    <Image
    source={require('../img/user_tomato.png')}
    style={{height:88,width:88,borderRadius:10,marginLeft:26}}
    />
    <View style={{flexDirection:'column',marginTop:5,marginLeft:16}}>
        <Text>小明</Text>
        <Text style={{fontSize:18,marginTop:8}}>聖女小番茄</Text>            
        <Text style={{marginTop:8}}>領取時間：4/25 20:00</Text>
    </View>
    

</View></View> 
  );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        
      });



    useEffect(()=>{
        storefirebaseauth();
        },[]);
        const storefirebaseauth = () => {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password);
            setUser({...user,email:firebase.auth().currentUser.email})
            setUser({...user,name:firebase.auth().currentUser.displayName})
            setUser({...user,userphoto:firebase.auth().currentUser.photoURL})
            console.log(`user photoURL=${user.email}`);
        };
  
    useEffect(()=>{
    readData();
    },[]);
    const readData = async () => {
        const FoodDetail = [];
        
        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Buyorder").child("unfinish").once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                FoodDetail.push({
                    food:childSnapshot.val().food,
                    name:childSnapshot.val().name,
                    img:childSnapshot.val().img,
                    SellerPhoto:childSnapshot.val().SellerPhoto,
                    foodDetail:childSnapshot.val().foodDetail,
                    date:childSnapshot.val().date,
                    time:childSnapshot.val().time,
                    orderID:childSnapshot.val().orderID,
                    price:childSnapshot.val().price   
                });
              });
            });

        
        setFoodData(FoodDetail);

        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Buyorder").child("finish").once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                finifoodData.push({
                    food:childSnapshot.val().food,
                    name:childSnapshot.val().name,
                    img:childSnapshot.val().img,
                    SellerPhoto:childSnapshot.val().SellerPhoto,
                    foodDetail:childSnapshot.val().foodDetail,
                    date:childSnapshot.val().date,
                    time:childSnapshot.val().time,
                    orderID:childSnapshot.val().orderID         
                });
              });
            });
            
        setFinifoodData(finifoodData);

        setOrder(true);
  
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
        <View style={{bottom:20}}>
            <View style={{ height: 70, width: 375, backgroundColor: '#F0A202F0', }}>

            </View>
            <View style={styles.user_profile}>
                <ImageBackground
                    style={{width:376,height:321,paddingTop:66}}
                    source={require("../img/userbg.png")}
                >
                    <View style={{height:162,alignItems:'center'}}>
                    <TouchableOpacity onLongPress={onPress}>
                    <Image
                        style={styles.user_profile_img_}
                        source={{uri:user.userphoto}}
                    />
                    </TouchableOpacity>
    <Text style={styles.user_profile_name}>{user.name}</Text>
    <Text style={styles.user_profile_mail}>{user.email}</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:30}}>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity style={styles.btn4_touchable}
                            onPress={() => navigation.navigate('Coin')}>
                                <Image
                                source={require("../icon/coin.png")}
                                style={{width:44,height:44}}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>想享幣</Text>
                        </View>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity style={styles.btn4_touchable}
                            onPress={() => navigation.navigate('Chat')}>
                                <Image
                                source={require("../icon/messege.png")}
                                style={{width:44,height:44}}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>聊天紀錄</Text>
                        </View>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity style={styles.btn4_touchable}
                            onPress={() => navigation.navigate('Coupon')}>
                                <Image
                                source={require("../icon/coupon.png")}
                                style={{width:44,height:44}}
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
                                style={{width:44,height:44}}
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
            <ScrollView style={styles.order_view}>
            <TabView
            style={{top:13}}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props=>
                <TabBar
                    {...props}
                    style={{backgroundColor:'#fff',color:'#656565',shadowColor:'#fff',elevation:0}}
                    indicatorStyle={{ backgroundColor: '#F0A202' ,width:94,marginLeft:49}}
                    labelStyle={{color:'#656565',fontSize:17}}
                />
            }

            />
            
            </ScrollView>
            
        </View>
    );
}
const styles = StyleSheet.create({
    order_view:{
        backgroundColor:'#fff',
        borderRadius:16,
        height:1000,
        bottom:20
    },
    user_profile: {
        width: 375,
        height:356,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor:'#F0A202'
    },
    user_profile_img: {
        width: 114,
        height: 132,
        // backgroundColor:'tomato',
    },
    user_profile_img_: {
        width: 88,
        height: 88,
        borderRadius: 50


    },
    user_profile_name:{
        color:'#fff',
        fontSize:22
    },
    user_profile_mail:{
        color:'#fff',
        fontSize:14
    },
    user_list: {
        width: 323,
        height: 130,
        backgroundColor: '#fff',
        top: -52,
        left: 26,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop:16,

    },
    user_list_img: {
        width: 114,
        height: 130,
       // backgroundColor:'purple',
    },
    user_list_detail: {
        width: 209,
        height: 130,
        paddingTop:26,
        paddingLeft:16,
       // backgroundColor:'blue',
    },
    user_list_detail_medal:{
        width:323,
        height:130,
        left:-130,
        top:-95,
        //backgroundColor:'black',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    user_list_detail_medal_:{
        width:60,
        height:60,
        backgroundColor:'red',
        top:16,
        
        right:16
    },
    btn4_view:{
        flexDirection:'column',
        alignItems:'center',
        paddingLeft:19
    },
    btn4_touchable:{
        width:55,
        height:55,
        borderRadius:30,
        backgroundColor:'#fff',
        alignItems:'center',
        paddingTop:5,
        shadowColor:'#765104',
        shadowOpacity:0.4,
        elevation:24,
        shadowOffset:{width:10,height:10},
    },
    btn4_text:{
        color:'#fff',
        marginTop:10,
        fontSize:12
    }





});
export default User;