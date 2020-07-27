import React ,{useState,useEffect}from "react";
import {View, Text,FlatList,Image,StyleSheet,Dimensions,TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
//import Unfinifhordercard from "../component/unfinishshordercard";
//import unfinishdata from "../json/order.json";
import * as firebase from 'firebase'; 
import '../component/ScreenUtil';
import { setWidth, setSptext, setheight } from "../component/ScreenUtil";

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;


const FoodShophordercard = ({post, navigation}) => {
    return(
        
        <View style={styles.thumbnailContainerStyle}>
            <View style={styles.content_section}>
            <Image
            source={{uri:post.img}}
            style={styles.imgstyle}
            />
            <View style={{marginLeft:setWidth(12)}}>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:setSptext(18),width:setWidth(140)}}>{post.food}</Text>
                <View style={styles.btnstyle}>
                <Button 
                buttonStyle={{
                    backgroundColor:"#F0A202",
                    borderRadius:10,
                    width:setWidth(82),
                    height:setheight(36),
                    
                }}
                titleStyle={{
                    color:'#fff',
                    fontSize:setSptext(14)
                }}
                title="編輯" />
            </View>
                </View>
                
                <Text style={styles.deadline}>領取期限:{post.date}前</Text>
            </View>
           
            </View>
        </View>
    )
};
const FoodShopScreen = ({navigation}) =>{
    const [exist,setExist] = useState(false);
    const [foodData,setFoodData] = useState([]);

    const safefirebaseUnfinishShareorder = async () => {
        const firebaseFoodDetail = [];
        
        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Shareorder").child("foodshop").once('value', function(snapshot) {
            if(snapshot.exists()){
                snapshot.forEach(function(childSnapshot) {
                    firebaseFoodDetail.push({
                        food:childSnapshot.val().food,
                        name:childSnapshot.val().name,
                        img:childSnapshot.val().img,
                        foodDetail:childSnapshot.val().foodDetail,
                        number:childSnapshot.val().number,
                        date:childSnapshot.val().date,
                        orderID:childSnapshot.val().orderID
                    });
                });
                setFoodData(firebaseFoodDetail);
                setExist(true);
            }
        });

        
        
    };

   
      useEffect(()=>{
        safefirebaseUnfinishShareorder();
      },[]);

    if(exist){
        return (
            <View style={{backgroundColor:'#fff',height:812}}>
                <FlatList
                    data = {foodData}
                    renderItem = {({item}) => 
                    <FoodShophordercard
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
                <Text style={{color:'#656565',fontSize:setSptext(18)}}>尚無已發布訂單</Text>
    
            </View>
        )

    }


}



const styles = StyleSheet.create({
    thumbnailContainerStyle: {
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
        height:setheight(146),
        backgroundColor:'#fff',
    },
    content_section:{
        flexDirection: "row",
        justifyContent:'flex-start'
    },
    imgstyle:{
        borderRadius:10,
        height:setheight(88),
        width:setWidth(88),
        marginLeft:setWidth(26)
    },
    deadline:{
        marginTop:setheight(28),
        fontSize:setSptext(14)
        
    },
    
});

export default FoodShopScreen;