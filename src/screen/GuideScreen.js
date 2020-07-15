import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import LottieView from "lottie-react-native";
import Swiper from "react-native-swiper";

const intro = ({navigation}) =>{
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.swiper}>
        <Swiper
          style={styles.swiper_detail}
          height={500}
          //backgroundColor="red"
          horizontal={true}
          paginationStyle={{ bottom: -50 }}
          showsButtons={false}
          activeDotColor="#F0A202"
        >
          <View style={{ flex: 1 }}>
            <LottieView
              style={{
                height: 400
              }}
              source={require("../json/00.json")}
              autoPlay loop
              speed={1}
            //backgroundColor='blue'
            />
            <View style={{
              height: 100,
              //backgroundColor: 'pink',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 20,
                width: 233,
                lineHeight:30,
                color:'#949494'
              }}>每天，從家庭到商店、餐廳，都會丟棄許多完整的食物</Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <LottieView
              style={{
                height: 400
              }}
              source={require("../json/02.json")}
              autoPlay loop
              speed={1}
            //backgroundColor='blue'
            />
            <View style={{
              height: 100,
              //backgroundColor: 'pink',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 20,
                width: 233,
                lineHeight:30,
                color:'#949494'
              }}>還可以吃的食物，是否能再利用呢？</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <LottieView
              style={{
                height: 400
              }}
              source={require("../json/03.json")}
              autoPlay loop
              speed={1}
            //backgroundColor='blue'
            />
            <View style={{
              height: 100,
              //backgroundColor: 'pink',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 20,
                width: 233,
                lineHeight:30,
                color:'#949494'
              }}>開始使用想享，讓食物不再被浪費！</Text>
            </View>
          </View>



        

        </Swiper>
      </View>

      <View style={{
        height: 200,
        //flex:1,
        //justifyContent:"center",
        alignItems: "center",
        //backgroundColor:'skyblue'
      }}>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Signin')}
        
        >
          <View style={{
            height: 44,
            width: 279,
            backgroundColor: "#F0A202",
            marginTop: 75,
            //flex:1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}>
            <Text style={{
              color: "#fff",
              fontSize: 20,
            }}>開始使用</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //width:300,
    // height:300
  },
  img: {
    height: 300,
    width: 300,
    //justifyContent: 'center',
  },
  swiper: {
    marginTop: 75
  },
  swiper_detail: {
    // margin:50
  }
});
export default intro;