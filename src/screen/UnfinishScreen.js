import React ,{useState,useEffect}from "react";
import {View, TouchableOpacity,Text, Button,FlatList,Dimensions,Image,StyleSheet} from "react-native"
import Finifhordercard from "../component/finishordercard";
import finishdata from "../json/order.json";
import * as firebase from 'firebase'; 
import { setWidth, setheight, setSptext } from "../component/ScreenUtil";

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

const Unfinishordercard = ({post, navigation}) => {
    return(
        <TouchableOpacity onPress={()=>navigation.navigate('SellerOrderDetail',{
            food:post.food,
            name:post.name,
            Buyerphoto:post.Buyerphoto,
            Buyername: post.Buyername,
            BuyerID: post.BuyerID,
            img:post.img,
            foodDetail:post.foodDetail,
            number:post.number,
            date:post.date,
            orderID:post.orderID,
            confirmtime:post.confirmtime,
            transtime:post.transtime

          })}>
        <View style={styles.thumbnailContainerStyle}>
            <View style={styles.content_section}>
            <Image
            source={{uri:post.img}}
            style={styles.imgstyle}
            />
            <View style={{marginLeft:setWidth(12)}}>
                <Text style={{fontSize:setSptext(18),color:'#656565'}}>{post.food}</Text>
                <Text style={styles.deadline}>領取人:{post.Buyername}</Text>
                <Text style={styles.deadline}>數量:1</Text>
                <Text style={styles.deadline}>領取期限:{post.date}前</Text>
            </View>
           
            </View>
        </View>
        </TouchableOpacity>
    )
};

const UnfinishorderScreen = ({navigation}) =>{
    
    const [foodData,setFoodData] = useState([]);
    const [exist,setExist] = useState(false);

  

    const safefirebaseUnfinishShareorder = async () => {
        const firebaseFoodDetail = [];
        try{
        
        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Shareorder").child("unfinish").once('value', function(snapshot) {
            if(snapshot.exists()){
                snapshot.forEach(function(childSnapshot) {
                    firebaseFoodDetail.push({
                        food:childSnapshot.val().food,
                        name:childSnapshot.val().name,
                        Buyerphoto:childSnapshot.val().Buyerphoto,
                        Buyername: childSnapshot.val().Buyername,
                        BuyerID: childSnapshot.val().BuyerID,
                        img:childSnapshot.val().img,
                        foodDetail:childSnapshot.val().foodDetail,
                        number:childSnapshot.val().number,
                        date:childSnapshot.val().date,
                        orderID:childSnapshot.val().orderID,
                        confirmtime:childSnapshot.val().confirmtime,
                        transtime:childSnapshot.val().transtime
    
                    });
                });
                setFoodData(firebaseFoodDetail);
                setExist(true);
            }else{
                setExist(false);
            }
            
        });
    }catch(e){
        console.log(e);
    }

        
    }
    

   
      useEffect(()=>{
        safefirebaseUnfinishShareorder();
      },[]);
        
        
    if(exist){
        
        return (
            <View style={{backgroundColor:'#fff',height:812}}>
            <FlatList
                data = {foodData}
                renderItem = {({item}) => 
                <Unfinishordercard
                post = {item}
                navigation = {navigation}
                />}
                keyExtractor = {item => item.orderID}
            />
        </View>
        )
    }
    else {
        return (
            <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                <Image
                source={require('../img/No_shareorder.png')}
                style={{width:setWidth(235),height:setheight(235)}}
                />
                <Text style={{color:'#656565',fontSize:setSptext(18)}}>尚無已下單訂單</Text>
            </View>
        )
    }

   
};

const styles = StyleSheet.create({
    thumbnailContainerStyle: {
        flex:1,
        justifyContent:'center',
        height:setheight(146),
        backgroundColor:'#fff',
        paddingLeft:setWidth(26)
    },
    content_section:{
        flexDirection: "row"
    },
    imgstyle:{
        borderRadius:10,
        height:setheight(88),
        width:setWidth(88)
    },
    btnstyle:{
        marginLeft:setWidth(7)
    },
    deadline:{
        fontSize:setSptext(14),
        color:'#656565',
        marginTop:setheight(8)
    }
});

export default UnfinishorderScreen;