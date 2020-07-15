import React from "react";
import {View, Image, Text, StyleSheet,TouchableOpacity ,ImageBackground} from "react-native";
import FooddetailScreen from "../screen/FooddetailScreen.js"

const foodcard = ({post, navigation}) => {
    return(
        <View style={{flex:1,alignItems:"center",backgroundColor:'#FDF8E1'}}>
            <TouchableOpacity
            onPress={() => navigation.navigate('Food',{
                name:post.name,
                food:post.food,
                userphoto:post.userphoto,
                img:post.img,

                
              })}>
        <View style={styles.cardview}>
            <View   style={{flexDirection:'row'}}>
                <Image
                source={{uri:post.userphoto}}
                style={styles.userphoto}
                />
                <Text style={{fontSize:14,marginLeft:8,color:'#656565'}}>{post.name}</Text>
            </View>
            <View   style={{flexDirection:'row',marginTop:10}}>
                <Image
                source={{uri:post.img}}
                style={{width:88,height:88,borderRadius:20}}
                />
                <View style={{flexDirection:'column',marginLeft:16}}>
                    <Text style={{fontSize:18,color:'#656565'}}>{post.food}</Text>
                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Image
                        source={require('../icon/pin.png')}
                        style={{width:18,height:18 }}
                        />
                        <Text style={{color:'#656565'}}>{post.distance}</Text>
                    </View>
                    <Text style={{marginTop:8,color:'#656565'}}>領取期限</Text>
                </View>
            
            </View>
        </View>
        </TouchableOpacity>
        </View>

    )
}

const foodcard2 = ({post, navigation}) => {
    return(
        <View style={{flex:1,alignItems:"center",backgroundColor:'#FDF8E1'}}>
            <TouchableOpacity
            onPress={() => navigation.navigate('Food')}
            >
        <View style={styles.cardview}>
            <ImageBackground
            source={{uri:post.img}}
            style={{width:312,height:184,borderRadius:10}}
            imageStyle={{ borderRadius: 10 }}
            >
            <View style={{flex:1,
            justifyContent:'flex-end',
            borderRadius:10
            }}>
            <View style={styles.thumbnailContainerStyle}>
                <Image
                source={{uri:post.userphoto}}
                style={styles.userphoto}
                />
                <View style={styles.fooddetailname}>
                    <Text style={{color:'#fff',fontSize:10}}>{post.name}</Text>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'600'}}>{post.food}</Text>
                </View>
                <View style={styles.disandprice}>
                <Image
                source={require('../icon/pin.png')}
                style={{width:26,height:26}}
                />
                <Text style={{color:'#fff'}}>{post.distance}</Text>
                <Image
                source={require('../icon/tag-black-shape.png')}
                style={{width:26,height:26}}
                />
                <Text style={{color:'#fff'}}>{post.price}</Text>
                </View>
            </View>
            </View>
            </ImageBackground>
        </View>
        </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    thumbnailContainerStyle: {
        flexDirection: "row",
        height:38
    },
    cardview:{
        width:323,
        height:160,
        borderRadius:20,
        shadowColor:"#765104",
        shadowOpacity:0.2,
        shadowRadius:20,
        elevation:10,
        backgroundColor:'#fff',
        paddingLeft:26,
        paddingTop:14,
        marginBottom:12,
        top:2

    },
    userphoto:{
        width:26,
        height:26,
        borderRadius:22,
        
        
    },
    fooddetailname:{
        flexDirection:"column",
        marginLeft:5,
        bottom:12,
        width:108
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