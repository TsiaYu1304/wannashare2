import React from "react";
import {View, Image, Button, Text, StyleSheet,TouchableOpacity ,Dimensions} from "react-native";
import { MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import './ScreenUtil'
import { setWidth,setheight ,setSptext} from "./ScreenUtil";
const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

const finifhordercard = ({post, navigation}) => {
    const { ordertime } = new Date(post.time).toString();
    return  (  
        <View style={styles.thumbnailContainerStyle}>
            <Image
            source={{uri:post.img}}
            style={styles.imgstyle}
            />
            <View style={{marginLeft:setWidth(16)}}>
                <Text style={{fontSize:setSptext(18),color:"#656565"}}>{post.food}</Text>
                <Text style={{fontSize:setSptext(14),color:"#656565",marginTop:setheight(16)}}>領取時間:</Text>
            </View>
           
        </View>
    )
};

const styles = StyleSheet.create({
    thumbnailContainerStyle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        height:setheight(146),
        paddingLeft:setWidth(26),
        marginTop:setheight(26)
    },
    imgstyle:{
        borderRadius:10,
        height:88,
        width:88
    },
    btnstyle:{
        width:82,
        height:36
    }
});

export default finifhordercard;