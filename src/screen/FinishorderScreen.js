import React ,{useState,useEffect}from "react";
import {View, Text, Button,FlatList,Image,Dimensions} from "react-native"
import Finifhordercard from "../component/finishordercard";
import finishdata from "../json/order.json";
import * as firebase from 'firebase'; 
import '../component/ScreenUtil'
import { setWidth, setheight, setSptext } from "../component/ScreenUtil";

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

const FinishorderScreen = ({navigation}) =>{
    const [exist,setExist] = useState(false);
    const [foodData,setFoodData] = useState([]);

    /*useEffect(()=>{
    safefirebaseUnfinishShareorder();
    },[]);*/

    const safefirebaseUnfinishShareorder = async () => {
        const firebaseFoodDetail = [];
        
        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Shareorder").child("finish").once('value', function(snapshot) {
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
            }
        });

        
    }
  
      useEffect(()=>{
        safefirebaseUnfinishShareorder();
      },[]);
   

    return exist? (
        <View style={{backgroundColor:'#fff',height:812}}>
        <FlatList
            data = {foodData}
            renderItem = {({item}) => 
            <Finifhordercard
            post = {item}
            navigation = {navigation}
            />}
            keyExtractor = {item => item.orderID}
        />
        </View>
    ):(
        <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <Image
            source={require('../img/No_shareorder.png')}
            style={{width:setWidth(235),height:setheight(235)}}
            />
            <Text style={{color:'#656565',fontSize:setSptext(18)}}>尚無已完成訂單</Text>

        </View>
    )
}

export default FinishorderScreen;