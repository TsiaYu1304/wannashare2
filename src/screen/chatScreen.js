import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,Switch } from 'react-native';

const chat = ({navigation}) => {
    return (
        <View style={{backgroundColor:'#fff',height:8850}}>
            {/* headerStart-------------------------- */}
            <View style={{
                height: 88,
                backgroundColor: '#F0A202',
                flexDirection: "row",
                justifyContent: 'flex-start',

            }}>
                <View style={{
                    //backgroundColor: 'red',
                    width: 42,
                    justifyContent: "flex-end",
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../img_yu/back_white.png')}
                            style={{
                                marginBottom: 8,
                                marginLeft: 16
                            }} /></TouchableOpacity>
                </View>
                <View style={{
                    // backgroundColor: 'blue',
                    width: 291,
                    justifyContent: 'flex-end',
                    alignItems: 'center',

                }}>
                    <Text style={{ fontSize: 20, color: '#fff', marginBottom: 12 }}>聊天</Text>
                </View>
                <View style={{
                    // backgroundColor: 'green',
                    width: 42
                }}></View>
            </View>
            {/* headerEnd-------------------------- */}
            
            <ScrollView style={{ height: 750 }}>
                {/* chat_1Start----------------------- */}
                <View style={{
                    height: 88,
                    // backgroundColor: 'pink',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderBottomWidth:'1',
                    borderBottomColor:"#E1E1E1"
                }}>
                    <View style={{
                        width: 74,
                        marginLeft: 16,
                        //backgroundColor:'red'
                    }}>
                        <Image source={require('../img_yu/wang.png')}
                            style={{ width: 64, height: 64, borderRadius: 50 }} />
                    </View>

                    <View>
                        <Text style={{ fontSize: 18, color: "#949494" }}>王先生</Text>
                        <Text></Text>
                        <Text style={{ fontSize: 14, color: "#949494" }}>掰掰＾＾</Text>
                    </View>
                </View>
                {/* chat_1End----------------------- */}
                {/* chat_2Start----------------------- */}
                 <View style={{
                    height: 88,
                    // backgroundColor: 'pink',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderBottomWidth:'1',
                    borderBottomColor:"#E1E1E1"
                }}>
                    <View style={{
                        width: 74,
                        marginLeft: 16,
                        //backgroundColor:'red'
                    }}>
                        <Image source={require('../img_yu/PPro.png')}
                            style={{ width: 64, height: 64, borderRadius: 50 }} />
                    </View>

                    <View>
                        <Text style={{ fontSize: 18, color: "#949494" }}>阿威手感烘焙房</Text>
                        <Text></Text>
                        <Text style={{ fontSize: 14, color: "#949494" }}>可以喔！</Text>
                    </View>
                </View>
                {/* chat_2End----------------------- */}
                




            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

});
export default chat;