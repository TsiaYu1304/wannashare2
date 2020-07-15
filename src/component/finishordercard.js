import React from "react";
import {View, Image, Button, Text, StyleSheet,TouchableOpacity ,ImageBackground} from "react-native";
import { MaterialTopTabBar } from "@react-navigation/material-top-tabs";

const finifhordercard = ({post, navigation}) => {
    return(  
        <View style={styles.thumbnailContainerStyle}>
            <Image
            source={{uri:post.img}}
            style={styles.imgstyle}
            />
            <View style={{flexDirection:'column',height:88,justifyContent:'center',marginLeft:16}}>
                <Text>{post.name}</Text>
                <Text style={{fontSize:18,marginTop:8}}>{post.food}</Text>
                <Text style={{marginTop:8}}>{post.time}訂購</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    thumbnailContainerStyle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        height:114,
        paddingLeft:26,
        marginTop:26
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