import React from "react";
import {View, Text, Button,FlatList,Image,StyleSheet} from "react-native";
import Unfinifhordercard from "../component/unfinishshordercard";
import Coincard from "../component/coincard"
import coinshopdetail from "../json/coinshopdetail.json";


const SharecoinScreen = ({navigation}) =>{

    return (
        <View style={{backgroundColor:'#fff',height:812}}>
            <View style={styles.mycoin_view}>
                <Image
                source={require('../icon/coin.png')}
                style={{width:92,height:92}}
                />
                <View style={{flexDirection:'column'}}>
                    <Text>6枚想享幣</Text>
                    <Text>已捐贈物資給xx機構2次</Text>
                </View>
            </View>
            <FlatList
                data = {coinshopdetail.coin}
                renderItem = {({item}) => 
                <Coincard 
                post = {item}
                navigation = {navigation}
                />}
                keyExtractor = {item => item.name}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    mycoin_view:{
        height:150,
        flexDirection:'row',
        paddingTop:27
    }
});

export default SharecoinScreen;