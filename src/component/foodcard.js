import React from "react";
import {View, Image, Text, StyleSheet,TouchableOpacity ,ImageBackground,Dimensions} from "react-native";
import FooddetailScreen from "../screen/FooddetailScreen.js"
import "./ScreenUtil"
import { setSptext, setWidth, setheight } from "./ScreenUtil";

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

const foodcard = ({post, navigation}) => {
    return(
        <View style={{flex:1,alignItems:"center",backgroundColor:'#FDF8E1'}}>
            <TouchableOpacity
            onPress={() => navigation.navigate('Food',{
                name:post.name,
                SellerPhoto:post.SellerPhoto,
                food:post.food,
                userphoto:post.userphoto,
                img:post.img,
                number:post.number,
                foodDetail:post.foodDetail,
                orderID:post.orderID,
                date:post.date,
                sellerUID:post.sellerUID,
                price:post.price,
                location:post.location


                
              })}>
        <View style={styles.cardview}>
            <View   style={{flexDirection:'row'}}>
                <Image
                source={{uri:post.SellerPhoto}}
                style={styles.userphoto}
                />
                <Text style={{fontSize:setSptext(14),marginLeft:8,color:'#656565'}}>{post.name}</Text>
            </View>
            <View   style={{flexDirection:'row',marginTop:setheight(10)}}>
                <Image
                source={{uri:post.img}}
                style={{width:setWidth(88),height:setheight(88),borderRadius:20}}
                />
                <View style={{flexDirection:'column',marginLeft:setWidth(16)}}>
                    <Text style={{fontSize:setSptext(18),color:'#656565'}}>{post.food}</Text>
                    <View style={{flexDirection:'row',marginTop:setheight(8)}}>
                        <Image
                        source={require('../icon/pin.png')}
                        style={{width:setWidth(18),height:setheight(18) }}
                        />
                        <Text style={{color:'#656565'}}>{post.location}</Text>
                    </View>
            <Text style={{marginTop:setheight(8),color:'#656565'}}>領取期限:{post.date}</Text>
                </View>
            
            </View>
        </View>
        </TouchableOpacity>
        </View>

    )
}

 
const styles = StyleSheet.create({
    cardview:{
        width:setWidth(323),
        height:setheight(160),
        borderRadius:20,
        shadowColor:"#765104",
        shadowOffset:{width:3,height:8},
        shadowOpacity:0.2,
        shadowRadius:5,
        elevation:10,
        backgroundColor:'#fff',
        paddingLeft:setWidth(16),
        paddingTop:setheight(14),
        marginBottom:setheight(12),
        top:setheight(2)

    },
    userphoto:{
        width:setWidth(26),
        height:setheight(26),
        borderRadius:22,
        
        
    },
    fooddetailname:{
        flexDirection:"column",
        marginLeft:setWidth(5),
        bottom:setheight(12),
        width:setWidth(108),
    },

    disandprice:{
        alignItems:'flex-end',
        flex:1,
        flexDirection: "row",
        height:28,
        bottom:2

        
    }
});

export default foodcard;