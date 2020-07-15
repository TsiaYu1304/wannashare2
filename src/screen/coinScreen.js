import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

function ICanUse() {
  return (
    <ScrollView style={{height:500}}>
      <View style={{
        height: 146,
        //backgroundColor: 'tomato',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //alignItems: 'center',
        paddingTop: 32
      }}>
        <View style={{
          width: 100,
          marginLeft: 26,
          //backgroundColor: 'red'
        }}>
          <Image
            source={require('../img_yu/seven.png')}
            style={{ borderRadius: 10 }} />
        </View>
        <View>
          <Text style={{ fontSize: 14, color: "#949494", lineHeight: 25 }}>7-11</Text>
          <Text style={{ fontSize: 18, color: "#949494", lineHeight: 25 }}>飲料第二件6折</Text>
          <Text style={{ fontSize: 14, color: "#949494", lineHeight: 25 }}>兌換期限：4/27 5:00前</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../img_yu/cuteCoin.png')}
              style={{ borderRadius: 10 }} />
            <Text style={{ fontSize: 14, color: "#949494", marginLeft: 10 }}>5</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            //onPress={}
            style={{
              width: 82,
              height: 36,
              backgroundColor: '#F0A202',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 14, color: "#fff" }}>兌換</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ============================== */}
      <View style={{
        height: 146,
        //backgroundColor: 'tomato',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //alignItems: 'center',
        paddingTop: 32
      }}>
        <View style={{
          width: 100,
          marginLeft: 26,
          //backgroundColor: 'red'
        }}>
          <Image
            source={require('../img_yu/sansun.png')}
            style={{ borderRadius: 10 }} />
        </View>
        <View>
          <Text style={{ fontSize: 14, color: "#949494", lineHeight: 25 }}>三商巧福</Text>
          <Text style={{ fontSize: 18, color: "#949494", lineHeight: 25 }}>牛肉壽喜飯75折</Text>
          <Text style={{ fontSize: 14, color: "#949494", lineHeight: 25 }}>兌換期限：4/27 5:00前</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../img_yu/cuteCoin.png')}
              style={{ borderRadius: 10 }} />
            <Text style={{ fontSize: 14, color: "#949494", marginLeft: 10 }}>10</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            //onPress={}
            style={{
              width: 82,
              height: 36,
              backgroundColor: '#F0A202',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 14, color: "#fff" }}>兌換</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


const coin = ({navigation}) => {
  return (
    <View style={{backgroundColor:'#fff',height:8850}}>
      {/* -------------------header */}
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
          <TouchableOpacity
          onPress={() => navigation.goBack()}>
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
          <Text style={{ fontSize: 20, color: '#fff', marginBottom: 12 }}>想享幣</Text>
        </View>
        <View style={{
          // backgroundColor: 'green',
          width: 42
        }}></View>
      </View>
      {/* ------------headerEnd */}
      <View style={{
        height: 150,
        // backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <View style={{
          width: 120,
          marginLeft: 26
          // backgroundColor:'red'
        }}>
          <Image source={require('../img_yu/coin.png')} />
        </View>

        <View>
          <Text style={{ fontSize: 18, color: "#949494" }}>6枚想享幣</Text>
          <Text></Text>
          <Text style={{ fontSize: 14, color: "#949494" }}>已捐贈物資給xx機構2次</Text>
        </View>
      </View>
      {/* ------------listStart */}
      <ICanUse />
      {/* ------------listEnd */}




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
export default coin;