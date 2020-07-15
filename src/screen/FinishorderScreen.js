import React from "react";
import {View, Text, Button,FlatList} from "react-native"
import Finifhordercard from "../component/finishordercard";
import finishdata from "../json/order.json";

const FinishorderScreen = ({navigation}) =>{

    return (
        <View style={{backgroundColor:'#fff',height:812}}>
        <FlatList
            data = {finishdata.finsishoreder}
            renderItem = {({item}) => 
            <Finifhordercard
            post = {item}
            navigation = {navigation}
            />}
            keyExtractor = {item => item.name}
        />
    </View>
    )
}

export default FinishorderScreen;