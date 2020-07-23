import React ,{useState,useEffect}from "react";
import {View, Text,FlatList,Image,StyleSheet} from "react-native";
import {Button} from "react-native-elements";
//import Unfinifhordercard from "../component/unfinishshordercard";
//import unfinishdata from "../json/order.json";
import * as firebase from 'firebase'; 


const Unfinifhordercard = ({post, navigation}) => {
    return(
        <View style={styles.thumbnailContainerStyle}>
            <Image
            source={{uri:post.img}}
            style={styles.imgstyle}
            />
            <View style={{flexDirection:'column',marginLeft:16}}>
                <Text>{post.name}</Text>
                <Text style={{marginTop:8,fontSize:18}}>{post.food}</Text>
                <Text style={{marginTop:8}}>領取期限:{post.date}前</Text>
            </View>
            <View style={styles.btnstyle}>
                <Button 
                buttonStyle={{
                    backgroundColor:"#F0A202",
                    borderRadius:10,
                    width:82,
                    height:36,
                    marginLeft:7
                }}
                titleStyle={{
                    color:'#000',
                    fontSize:14
                }}
                title="聯絡他" />
            </View>
        </View>
    )
};
const UnfinishorderScreen = ({navigation}) =>{
    const [foodData,setFoodData] = useState([]);

    /*useEffect(()=>{
    safefirebaseUnfinishShareorder();
    },[]);*/
    const safefirebaseUnfinishShareorder = async () => {
        const firebaseFoodDetail = [];
        
        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Shareorder").child("unfinish").once('value', function(snapshot) {
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
        });

        setFoodData(firebaseFoodDetail);
        
    };
    
    safefirebaseUnfinishShareorder();


    return (
        <View style={{backgroundColor:'#fff',height:812}}>
            <FlatList
                data = {foodData}
                renderItem = {({item}) => 
                <Unfinifhordercard
                post = {item}
                navigation = {navigation}
                />}
                keyExtractor = {item => item.orderID}
            />
        </View>
        
    )
}



const styles = StyleSheet.create({
    thumbnailContainerStyle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft:26,
        alignItems:'center',
        height:140,
        backgroundColor:'#fff'
    },
    imgstyle:{
        borderRadius:10,
        height:88,
        width:88
    },
    btnstyle:{
        width:82,
        height:88
    }
});

export default UnfinishorderScreen;