import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const Add = () => {
    const TakePhoto =() =>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
          });
    }
    return (
        <ScrollView>
            <View style={styles.add_img_box}>
                <TouchableOpacity>
                <Image
                    style={styles.add_img}
                    source={require("../img/add_cookie.png")}
                />
                </TouchableOpacity>
            </View>
            <View style={styles.add_text_box}>
                <View style={styles.add_text_detail}>
                    <Text style={styles.add_text_detail_name}>名稱</Text>
                    <Text style={styles.add_text_detail_content}>蘇打餅乾</Text>
                </View>
                <View style={styles.add_text_detail}>
                    <Text style={styles.add_text_detail_name}>說明</Text>
                    <Text style={styles.add_text_detail_content}>前兩天買的，歡迎找我拿！</Text>
                </View>
                <View style={styles.add_text_detail}>
                    <Text style={styles.add_text_detail_name}>期限</Text>
                    <Text style={styles.add_text_detail_content}>2020年4月28日 23:00</Text>
                </View>
                <View style={styles.add_text_detail}>
                    <Text style={styles.add_text_detail_name}>數量</Text>
                    <Text style={styles.add_text_detail_content}>1</Text>
                </View>
                <View style={styles.add_text_detail}>
                    <Text style={styles.add_text_detail_name}>地點</Text>
                    <View style={styles.add_text_detail_content}>
                        <View style={styles.add_text_detail_content_button}>
                            <Image
                            style={{width:16,height:16}}
                            source={require('../img/pin.png')}
                            />
                            <Text style={{paddingLeft:8,fontSize:14}}>設定地點</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.add_text_detail}>
                    <Text
                        style={
                            {
                                height: 44,
                                width: 375,
                                //backgroundColor: 'pink',
                                paddingLeft: 26,
                                paddingTop: 11,
                                fontSize: 17,
                            }
                        }>台北市大安區和平東路2段360號</Text>
                </View>

            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    add_img_box: {
        width: 323,
        height: 323,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        top: 52,
        left: 26,
        borderRadius: 20,
        zIndex: 10,

    },
    add_text_box: {
        width: 375,
        height: 400,
        backgroundColor: '#fff',
        top: -50,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 20,
    },
    add_img: {
        width: 323,
        height: 323,
        borderRadius: 20,

    },
    add_text_detail: {
        height: 44,
        width: 375,
        // backgroundColor: 'red',
        top: 128,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    add_text_detail_name: {
        height: 44,
        width: 120,
        //backgroundColor: 'pink',
        paddingLeft: 26,
        paddingTop: 11,
        fontSize: 17,
    },
    add_text_detail_content: {
        height: 44,
        width: 255,
        //backgroundColor: 'green',
        fontSize: 17,
        paddingTop: 11,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    add_text_detail_content_button:{
        height: 44,
        width:120,
        //backgroundColor:'tomato',
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight:16,
    }

});
export default Add;