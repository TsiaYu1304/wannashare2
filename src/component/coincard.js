import React from "react";
import {View, Image, Text, StyleSheet,TouchableOpacity ,ImageBackground} from "react-native";
import {Button} from "react-native-elements";

const coincard = ({post, navigation}) => {
    return(
        <View style={styles.thumbnailContainerStyle}>
            <Image
            source={{uri:post.img}}
            style={styles.imgstyle}
            />
            <View style={{flexDirection:'column',marginLeft:16}}>
                <Text>{post.name}</Text>
                <Text style={{marginTop:8,fontSize:18}}>{post.food}</Text>
                <Text style={{marginTop:8}}>領取期限:{post.time}前</Text>
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

export default coincard;