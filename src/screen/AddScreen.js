import React, { useState } from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Image, Dimensions, TextInput,ScrollView, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase';
import {nanoid} from  'nanoid/async/index.native'
import {MaterialCommunityIcons} from "@expo/vector-icons"

import { setWidth, setSptext, setheight } from "../component/ScreenUtil";

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

/*
<TextInput
                    placeholder="輸入期限"
                    style={styles.add_text_detail_content}
                    value={date}
                    onChangeText={(date) =>setDate(date)}
                    />
*/
var {height,width} = Dimensions.get('window');

const Add = ({route,navigation}) => {
    

    const [btncolor,setBtncolor] = useState('#949494')
    const [touch,setTouch] = useState(false);
    const [food,setFood] = useState("");
    const [foodDetail,setFoodDetail] = useState("");
    const [number,setNumber] = useState("");
    const [date,setDate] = useState("");
    const [location,setLocation] = useState("");
    const { capturePhoto } = route.params;
    const [id,setId] = useState("");
    const [foodimgURL,setURL]=useState(""); 
    const [price,setPrice] = useState("免費");
    const [choseDate,setChoseDate] = useState("");

    const changbtncolor = () => {
        if(touch) {
            setBtncolor('#949494')
            setTouch(false)
        }
        else {
            setBtncolor('#F0A202')
            setTouch(true)
        };
    }

    const UpdateDate =(date) => {
      
    
        return setChoseDate(date);
      }

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

    const uplLoadImage = async() =>{
        const blob = await new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            }
            xhr.onerror = function(e){
                console.log(e);
                reject(new TypeError('NetWork request faild'));
            };
            xhr.responseType = 'blob';
            xhr.open('Get',uri,true);
            xhr.send(null);
        });

            /*
        const response = await fetch(capturePhoto.uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref(iid).child("foodpicture")
        var snapshot =  ref.put(blob);
        //blob.close();
        const imgURL = await (await snapshot).ref.getDownloadURL();
       
        */
    }

    async function addunfinishShareorder2 () {
        const iid = await nanoid(10);
        
       const blob = await new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        }
        xhr.onerror = function(e){
            console.log(e);
            reject(new TypeError('NetWork request faild'));
        };
        xhr.responseType = 'blob';
        xhr.open('Get',capturePhoto.uri,true);
        xhr.send(null);
    });
        const ref = firebase.storage().ref(iid).child("foodpicture")
        var snapshot =  ref.put(blob);
        const imgURL = await (await snapshot).ref.getDownloadURL();

       try{
       
        firebase.database().ref("Users").child(firebase.auth().currentUser.uid).child("Shareorder").child("foodshop").child(iid).set({
            name:firebase.auth().currentUser.displayName,
            food:food,
            foodDetail:foodDetail,
            number:number,
            date:choseDate,
            img:imgURL,
            orderID:iid,
            price:price,
            location:location,
            time:firebase.database.ServerValue.TIMESTAMP,
          });
        }catch(e){
            console.warn(e)
        };

        try{
          firebase.database().ref("Orders").child(iid
            
            ).set({
            name:firebase.auth().currentUser.displayName,
            SellerPhoto:firebase.auth().currentUser.photoURL,
            sellerUID:firebase.auth().currentUser.uid,
            img:imgURL,
            orderID:iid,
            food:food,
            foodDetail:foodDetail,
            number:number,
            date:choseDate,
            price:price,
            location:location,
            time:firebase.database.ServerValue.TIMESTAMP,

          });

        }catch(e){
            console.warn(e);
        }

          navigation.goBack();  
          navigation.navigate('HomePage');  

        
    };

    return (
        <View style={{flex:1}}>
        <KeyboardAwareScrollView style={{flex:1}}>
        <ScrollView style={{flex:1}}>
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
                    placeholder="2020-08-11"
                    style={styles.add_text_detail_content}
                    value={choseDate}
                    onChangeText={(choseDate) =>setChoseDate(choseDate)}
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
                            style={{width:setWidth(16),height:setheight(16)}}
                            source={require('../img/pin.png')}
                            />
                            <Text style={{fontSize:setSptext(14)}}>設定地點</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.add_text_detail}>
                    <TextInput
                        onChangeText={(location) =>setLocation(location)}
                        placeholder='輸入地點'
                        style={
                            {
                                paddingLeft: 0.11*width,
                                fontSize: setSptext(18),
                            }
                        }></TextInput>
                </View>
                <View style={{marginLeft:setWidth(45),flexDirection:'row',marginTop:setheight(36)}}>

                    <TouchableOpacity onPress={changbtncolor}>
                    <MaterialCommunityIcons name='circle-slice-8' size={setWidth(18)} color={btncolor} />
                    </TouchableOpacity>

                    <Text style={{marginLeft:setWidth(13),fontSize:setSptext(18),color:'#656565'}}>根據</Text>
                    <TouchableOpacity onPress={()=> Linking.openURL("https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=l0040001")}>
                            <Text style={{fontSize:setSptext(18),color:'#F0A202'}}>
                                食安法
                             </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:setSptext(18),color:'#656565'}}>, 不得分享超過有效期</Text>
                </View>
                <Text style={{marginLeft:setWidth(76),fontSize:setSptext(18),color:'#656565'}}>限或變質之食品, 否則後果自負</Text>
                
                
                <TouchableOpacity 
                    onPress={()=>addunfinishShareorder2()}
                    style={styles.share_btn}
                    activeOpacity={0.5}
                    >
                    <Text style={{color:'#fff',fontSize:setSptext(22)}}>分享</Text>
                </TouchableOpacity>
               

            </View>

        </ScrollView>
        </KeyboardAwareScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    add_img_box: {
        width: devicewidth,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 20,
        position:'absolute'

    },
    add_text_box: {
        width: devicewidth,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 25,
        paddingTop:setheight(40),
        marginTop:setheight(318)
    },
    add_img: {
        width: devicewidth,
        height: setheight(360)

    },
    add_text_detail: {
        width:devicewidth,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop:setheight(20)
        
    },
    add_text_detail2: {
        width:devicewidth,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop:setheight(20),
        height:setheight(20)
        
    },
    add_text_detail_name: {
        paddingLeft: setWidth(40),
        fontSize: setSptext(18),
    },
    add_text_detail_content: {
        width:setWidth(300),
        marginLeft:setWidth(80),
        fontSize: setSptext(18),
        alignSelf:'flex-start'
        
        
    },
    add_text_detail_content_button:{
        flexDirection: "row"
    },
    share_btn:{
        height:setheight(52),
        backgroundColor:"#F0A202F0",
        alignItems:'center',
        justifyContent:'center',
        marginTop:setheight(32),
        borderRadius:10
    },
    pickStyles:{
        width:setWidth(223),
        height:setheight(36),
        marginLeft:setWidth(82)
      },

});
export default Add;