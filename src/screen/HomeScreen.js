import React ,{useState,useEffect,useContext}from "react";
import {View, Text, FlatList, Button, TextInput ,Image,ScrollView,StyleSheet,ImageBackground} from "react-native"
import Shopdetail from "../json/Shopdetail.json"
import Fooddata from "../json/fooddetail.json"
import ShopFooddata from "../json/shopfooddetail.json"
import Foodcard from "../component/foodcard.js"
import * as firebase from 'firebase';
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import {StoreContext}from "../store/UserStore.js";

//let Auth = firebase.auth();
 
const HomeScreen = ({navigation}) =>{

    const {userState} = useContext(StoreContext);
    const [user,setUser] = userState;
    const [PersonalshareData,setFoodData] = useState("");

    const [lottiepath,setPath] = useState("../json/personal_store.json");
    const [name,setName] = useState(null);
    const [saler, setSaler] = useState(true);
    
    useEffect(()=>{
    readData();
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

    const storefirebaseauth = () => {
       
        firebase.auth().signInWithEmailAndPassword(user.email, user.password);
        setUser({...user,name:firebase.auth().currentUser.displayName})
        
    };

    
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
            <ScrollView scrollEventThrottle = {16} style={{height:450}}>
            <View style={{backgroundColor:'#F0A202',height:422,paddingTop:28}}>
            <ImageBackground source={require('../img/homebg1.png')} style = {{width:375,height:422}}>
                <View style={{height:91,paddingTop:17,paddingLeft:26}}>
                <Text style={{color:'#fff',fontSize:22}}>Hello,{user.name}!</Text>
                    <Text style={{color:'#fff',fontSize:14,marginTop:8}}>歡迎使用想享!</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                   
                    <View style = {styles.Searchsection}>
                    <Image
                    source={require('../icon/search.png')}
                    style={{width:12,height:12,marginTop:12,marginLeft:12,marginRight:12}}
                    />
                    <TextInput
                    placeholder="找食物"
                    placeholderTextColor ="#fff"
                    />
                    </View>
                </View>
            
                <View style={styles.RowScrollsection}>
                    <View style={{alignItems:"center",paddingTop:16}}>
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
                style={{marginLeft:135,width:120,height:30}}
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
    near_View:{
        height:80,
        marginTop:28,
        paddingTop:26,
        backgroundColor:'#FDF8E1',
        flexDirection:'row'
    },
    Searchsection:{
        flex:1,
        fontWeight:"700",
        backgroundColor:'#F6C45D',
        width:1,
        height:36,
        marginLeft:26,
        marginRight:26,
        flexDirection:'row',
        borderRadius:10
    },
    Searchinput:{},
    RowScrollsection:{
        flex:1,
        
    },
    FlatListtext:{
        fontSize:18,
        fontWeight:'600',
        color:'#F0A202',
        marginLeft:26,
    },
    ScrollText:{
        fontSize:18,
        fontWeight:'600',
        color:'#fff',
        height:40,
        
    },
    Scrollcard:{
        height:192,
        width:278,
        marginRight:16,
        shadowColor:"#9A9A9A",
        elevation:24,
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.4,

        
    },
    shopimage:{
        flex:1,
        width:278,
        height:192,
        resizeMode:'cover',
        borderRadius:10
        
    },
    shopname:{
        bottom:30,
        color:'white',
        marginLeft:16,
        fontSize:18

    },
    scrollsection:{
        marginTop:20,
        paddingLeft:48,
        
    }

})

export default HomeScreen;