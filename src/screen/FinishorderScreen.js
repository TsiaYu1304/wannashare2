import React ,{useState,useEffect}from "react";
import {View, Text, Button,FlatList} from "react-native"
import Finifhordercard from "../component/finishordercard";
import finishdata from "../json/order.json";
import * as firebase from 'firebase'; 

const FinishorderScreen = ({navigation}) =>{

    const [foodData,setFoodData] = useState([]);

    useEffect(()=>{
    safefirebaseUnfinishShareorder();
    },[]);

    const safefirebaseUnfinishShareorder = async () => {
        const firebaseFoodDetail = [];
        
        await firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Shareorder").child("finish").once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                firebaseFoodDetail.push({
                    food:childSnapshot.val().food,
                    name:childSnapshot.val().name,
                    Buyerphoto:childSnapshot.val().Buyerphoto,
                    img:childSnapshot.val().img,
                    foodDetail:childSnapshot.val().foodDetail,
                    number:childSnapshot.val().number,
                    date:childSnapshot.val().date,
                    orderID:childSnapshot.val().orderID,
                    finish:childSnapshot.val().finish

                });
            });
        });

        setFoodData(firebaseFoodDetail);
    }

        
        

    return (
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
    )
}

export default FinishorderScreen;