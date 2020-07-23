import React ,{useState,useEffect,useContext}from "react";
import {View, Text, FlatList, Button, TextInput ,Image,ScrollView,StyleSheet,ImageBackground,Dimensions,PixelRatio} from "react-native"
import Shopdetail from "../json/Shopdetail.json"
import Fooddata from "../json/fooddetail.json"
import ShopFooddata from "../json/shopfooddetail.json"
import Foodcard from "../component/foodcard.js"
import * as firebase from 'firebase';
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import {StoreContext}from "../store/UserStore.js";
import "../component/ScreenUtil.js"
import { setSptext, scaleSize, setheight, setWidth } from "../component/ScreenUtil.js";

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

//let Auth = firebase.auth();
 
const HomeScreen = ({navigation}) =>{
    const [name,setName] = useState("");

    const {userState} = useContext(StoreContext);
    const [user,setUser] = userState;
    const [PersonalshareData,setFoodData] = useState("");

    const [lottiepath,setPath] = useState("../json/personal_store.json");
    const [saler, setSaler] = useState(true);
    
    useEffect(()=>{
    readData();
    setName(firebase.auth().currentUser.displayName);
    },[]);

    const readData = () => {
        console.log('切換');
        const FoodDetail = [];
        
            firebase.database().ref("Orders").once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    FoodDetail.push({
                        food:childSnapshot.val().food,
                        name:childSnapshot.val().name,
                        SellerPhoto:childSnapshot.val().SellerPhoto,
                        img:childSnapshot.val().img,
                        foodDetail:childSnapshot.val().foodDetail,
                        number:childSnapshot.val().number,
                        date:childSnapshot.val().date,
                        orderID:childSnapshot.val().orderID,
                        sellerUID:childSnapshot.val().sellerUID,
                        price:childSnapshot.val().price
                    });
                });
            });

            



        setFoodData(FoodDetail);
  
  
    };
   

    const Lottieanim = () => {
        return saler?(
            <LottieView
            source={require("../json/store_personal.json")}
            loop={false}
            speed={1}
            />
            
            
        ):(
            <LottieView
            source={require("../json/personal_store.json")}
            loop={false}
            speed={1}
            />
        )
    }

    
    const changesaler = () => {
        //readData();
    if(saler===true){
        setPath("../json/personal_store.json");
        setSaler(false);
        
        <Lottieanim/>
        

    }
    else{
        setSaler(true);
        
        setPath("../json/store_personal.json");
    }
    }



    const UserShopFoodcard =({navigation}) =>{
    return saler ? (
        <FlatList
            data = {Fooddata}
            renderItem = {({item})=>
            <Foodcard
            post = {item}
            navigation = {navigation}
            />}
            keyExtractor = {item => item.name}
            contentContainerStyle={{overflow: 'hidden'}}
        />
    ) :(
        <FlatList
            data = { PersonalshareData}
            renderItem = {({item})=>
            <Foodcard
            post = {item}
            navigation = {navigation}
            />}
            keyExtractor = {item => item.orderID}
            
        />
    )
    }
    return (
        <View style={{flex:1,backgroundColor:'#FDF8E1'}}>
            <ScrollView>
            <View style={styles.Top_section}>
            <ImageBackground source={require('../img/homebg1.png')} style = {{width:setWidth(375),height:setheight(325)}}>
                <View style={{height:0.112*deviceheight,paddingTop:setheight(22),paddingLeft:0.07*devicewidth}}>
                <Text style={{color:'#fff',fontSize:setSptext(22)}}>Hello,{name}!</Text>
                    <Text style={{color:'#fff',fontSize:setSptext(14),marginTop:0.001*deviceheight}}>歡迎使用想享!</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                   
                    <View style = {styles.Searchsection}>
                    <Image
                    source={require('../icon/search.png')}
                    style={styles.search_icon}
                    />
                    <TextInput
                    placeholder="找食物"
                    placeholderTextColor ="#fff"
                    />
                    </View>
                </View>
            
                <View style={styles.RowScrollsection}>
                    <View style={{alignItems:"center",height:setheight(56),justifyContent:'center'}}>
                    <Text style={styles.ScrollText}>精選商家</Text>
                    </View>
                    <View >
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollsection}
                    >
                    
                        <View style={styles.Scrollcard}>
                            <ImageBackground
                                imageStyle={{borderRadius:10}}
                                style={styles.shopimage}
                                source={{uri:Shopdetail[0].image}}
                            />
                            <Text style={styles.shopname}>{Shopdetail[0].name}</Text>
                            <Text style={styles.shopname}>{Shopdetail[0].addre}</Text>
                        </View>
                        <View style={styles.Scrollcard}>
                            <ImageBackground
                                imageStyle={{borderRadius:10}}
                                style={styles.shopimage}
                                source={{uri:Shopdetail[1].image}}
                            />
                            <Text style={styles.shopname}>{Shopdetail[1].name}</Text>
                            <Text style={styles.shopname}>{Shopdetail[1].addre}</Text>
                        </View>
                        <View style={styles.Scrollcard}>
                            <ImageBackground
                                imageStyle={{borderRadius:10}}
                                style={styles.shopimage}
                                source={{uri:Shopdetail[2].image}}
                            />
                            <Text style={styles.shopname}>{Shopdetail[2].name}</Text>
                            <Text style={styles.shopname}>{Shopdetail[2].addre}</Text>
                        </View>
                    </ScrollView>       
                    </View>
                </View>
            </ImageBackground>
            </View>
            <View style={styles.near_View}>
                <Text style={styles.FlatListtext}>離你最近</Text>
                <TouchableOpacity
                style={styles.switch_btn}
                onPress={changesaler}
                >
                <Lottieanim/>
                    
                </TouchableOpacity>
            </View>
            <UserShopFoodcard navigation = {navigation}/>
        </ScrollView>
             
        </View>
    )
};

const styles = StyleSheet.create({
    Top_section:{
        backgroundColor:'#F0A202',
        height:setheight(325),
        paddingTop:setheight(44)
    },
    search_icon:{
        width:0.032*devicewidth,
        height:0.032*devicewidth,
        marginTop:0.032*devicewidth,
        marginLeft:0.032*devicewidth,
        marginRight:0.032*devicewidth
    },
    near_View:{
        height:setheight(56),
        marginTop:setheight(138),
        backgroundColor:'#FDF8E1',
        flexDirection:'row'
    },
    Searchsection:{
        width:0.86*devicewidth,
        fontWeight:"700",
        backgroundColor:'#F6C45D',
        height:0.044*deviceheight,
        flexDirection:'row',
        borderRadius:10
    },
    RowScrollsection:{
        flex:1,
        
    },
    FlatListtext:{
        fontSize:setSptext(18),
        fontWeight:'600',
        color:'#F0A202',
        marginLeft:0.07*devicewidth,
    },
    ScrollText:{
        fontSize:setSptext(18),
        fontWeight:'600',
        color:'#fff'
        
    },
    Scrollcard:{
        height:setheight(192),
        width:setWidth(278),
        marginRight:0.04*devicewidth,
        shadowColor:"#9A9A9A",
        //elevation:24,
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.4,

        
    },
    shopimage:{
        flex:1,
        width:setWidth(278),
        height:setheight(192),
        resizeMode:'cover',
        borderRadius:10
        
    },
    shopname:{
        bottom:0.037*deviceheight,
        color:'white',
        marginLeft:0.04*devicewidth,
        fontSize:setSptext(18)

    },
    scrollsection:{
        paddingLeft:0.128*devicewidth,
        
    },
    switch_btn:{
        marginLeft:setWidth(135),
        width:setWidth(118),
        height:setheight(28),
        shadowColor:"#F0A20280",
        shadowOffset:{width:4,height:2},
        shadowOpacity:0.5,
        shadowRadius:3

    }

})

export default HomeScreen;