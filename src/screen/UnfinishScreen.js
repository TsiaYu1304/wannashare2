import React from "react";
import {View, Text, Button,FlatList} from "react-native";
import Unfinifhordercard from "../component/unfinishshordercard";
import unfinishdata from "../json/order.json";


const UnfinishorderScreen = ({navigation}) =>{

    return (
        <View style={{backgroundColor:'#fff',height:812}}>
            <FlatList
                data = {unfinishdata.unfinsishoreder}
                renderItem = {({item}) => 
                <Unfinifhordercard
                post = {item}
                navigation = {navigation}
                />}
                keyExtractor = {item => item.name}
            />
        </View>
        
    )
}

export default UnfinishorderScreen;