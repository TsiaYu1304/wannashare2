import React, { useState } from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Image, Dimensions, TextInput,ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase'; 
import {nanoid} from  'nanoid/async/index.native'
import { set } from 'react-native-reanimated';

var {height,width} = Dimensions.get('window');

const Add = ({route,navigation}) => {
    const [food,setFood] = useState("");
    const [foodDetail,setFoodDetail] = useState("");
    const [number,setNumber] = useState("");
    const [date,setDate] = useState("");
    const [location,setLocation] = useState("");
    const { capturePhoto } = route.params;
    const [id,setId] = useState("");
    const [foodimgURL,setURL]=useState(""); 
    const [price,setPrice] = useState("免費");

    async function createID () {
        const iid = await nanoid(10);
        console.log(`enter`);
        console.log(`iid=${iid}`);
        setId(iid);
    }

    async function upLoadImage () {
        const response = await fetch(capturePhoto.uri);
        const blob = await response.blob();
    }

    const dowloadImage = async ()=> 
    {
        const uri = firebase.storage().ref(iid).child("foodpicture").getDownloadURL();
        console.log(`url=${uri}`);
    }    
    async function addunfinishShareorder2 () {
        const iid = await nanoid(10);
        const response = await fetch(capturePhoto.uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref(iid).child("foodpicture")
        var snapshot =  ref.put(blob);
        //blob.close();
        const imgURL = await (await snapshot).ref.getDownloadURL();
       
       console.log(`iid=${iid}`);
       console.log(`iid=${imgURL}`);
       
       //console.log(`URL=${firebase.storage().ref(iid).child("foodpicture").getDownloadURL()}`); 
       

        firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Shareorder").child("foodshop").child(iid).set({
            name:firebase.auth().currentUser.displayName,
            food:food,
            foodDetail:foodDetail,
            number:number,
            date:date,
            img:imgURL,
            time:firebase.database.ServerValue.TIMESTAMP,
            orderID:iid,
            price:price
          });

          firebase.database().ref("Orders").child(iid
            
            ).set({
            name:firebase.auth().currentUser.displayName,
            SellerPhoto:firebase.auth().currentUser.photoURL,
            food:food,
            foodDetail:foodDetail,
            number:number,
            date:date,
            img:imgURL,
            time:firebase.database.ServerValue.TIMESTAMP,
            orderID:iid,
            sellerUID:firebase.auth().currentUser.uid,
            price:price
          });

          navigation.goBack();  
          navigation.navigate('HomePage');  

        
    };

    return (
        <View style={{flex:1}}>
        <KeyboardAwareScrollView>
        <ScrollView>
            <View style={styles.add_img_box}>
                <Image
                    style={styles.add_img}
                    source={{uri:capturePhoto.uri}}
                />
            </View>
            <View style={styles.add_text_box}>
                <View style={styles.add_text_detail}>
                    <Text style={styles.add_text_detail_name}>名稱</Text>
                    <TextInput
                    placeholder="輸入食物名稱"
                    style={styles.add_text_detail_content}
                    value={food}
                    onChangeText={(food) =>setFood(food)}
                    />
                </View>
                <View style={styles.add_text_detail2}>
                    <Text style={styles.add_text_detail_name}>說明</Text>
                    <TextInput
                    
                    placeholder="輸入說明"
                    style={styles.add_text_detail_content}
                    value={foodDetail}
                    onChangeText={(foodDetail) =>setFoodDetail(foodDetail)}
                    />
                </View>
                <View style={styles.add_text_detail}>
                    <Text style={styles.add_text_detail_name}>期限</Text>
                    <TextInput
                    placeholder="輸入期限"
                    style={styles.add_text_detail_content}
                    value={date}
                    onChangeText={(date) =>setDate(date)}
                    />
                </View>
                <View style={styles.add_text_detail}>
                    <Text style={styles.add_text_detail_name}>數量</Text>
                    <TextInput
                    placeholder="輸入數量"
                    style={styles.add_text_detail_content}
                    value={number}
                    onChangeText={(number) =>setNumber(number)}
                    />
                </View>
                <View style={styles.add_text_detail}>
                    <Text style={styles.add_text_detail_name}>地點</Text>
                    <View style={styles.add_text_detail_content}>
                        <View style={styles.add_text_detail_content_button}>
                            <Image
                            style={{width:0.043*width,height:0.043*width}}
                            source={require('../img/pin.png')}
                            />
                            <Text style={{paddingLeft:0.021*width,fontSize:14}}>設定地點</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.add_text_detail}>
                    <Text
                        style={
                            {
                                paddingLeft: 0.11*width,
                                fontSize: 17,
                            }
                        }>台北市大安區和平東路2段360號</Text>
                </View>
                
                <TouchableOpacity 
                    onPress={()=>addunfinishShareorder2()}
                    style={styles.share_btn}
                    activeOpacity={0.5}
                    >
                    <Text style={{color:'#fff',fontSize:22}}>分享</Text>
                </TouchableOpacity>
               

            </View>

        </ScrollView>
        </KeyboardAwareScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    add_img_box: {
        width: width,
        height: 0.4*height,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 20

    },
    add_text_box: {
        width: width,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 25,
        bottom:0.018*height,
        paddingTop:0.05*height,
        flex:1,
        height:height*0.51
    },
    add_img: {
        width: width,
        height: 0.4*height

    },
    add_text_detail: {
        width:width,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop:0.027*height
        
    },
    add_text_detail2: {
        width:width,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop:0.027*height,
        height:0.07*height
        
    },
    add_text_detail_name: {
        paddingLeft: 0.11*width,
        fontSize: 17,
    },
    add_text_detail_content: {
        width:width*0.45,
        marginLeft:0.23*width,
        fontSize: 17,
        alignSelf:'flex-start'
        
        
    },
    add_text_detail_content_button:{
        flexDirection: "row"
    },
    share_btn:{
        height:0.064*height,
        backgroundColor:"#F0A202F0",
        alignItems:'center',
        justifyContent:'center',
        marginTop:0.04*height,
        top:18
    }

});
export default Add;