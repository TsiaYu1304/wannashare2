import React,{useState,useEffect} from "react";
import {View, Text,TouchableOpacity,Image,ScrollView,StyleSheet,ImageBackground,Modal,Dimensions} from "react-native"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { setheight, setWidth, setSptext } from '../component/ScreenUtil';
import moment from "moment";

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;


const BuyerFinishOrder = ({route,navigation}) =>{
    const [showfinish,setshowfinish] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [isScan,setisScan] = useState(false);
    const [useruid, setUid] = useState("");

    const { food } = route.params;
    const { name } = route.params;
    const { SellerPhoto } = route.params;
    const { img } = route.params;
    const { foodDetail } = route.params;
    const { number } = route.params;
    const { date } = route.params;
    const { orderID } = route.params;
    const { confirmtime } = route.params;
    const {transtime} = route.params;


    
    var Datetimestamp = moment(new Date(confirmtime*1000)).format('MM-DD HH:MM');

   
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const handleBarCodeScanned = ({ type, data }) => {

        if(data === orderID) {
        setisScan(false);
        setshowfinish(true);
        }else {
            setisScan(false);
            alert(`unfinish`);
            }
      };
      const HandleConfirm = () => {
          Addnifnishorder();
          setshowfinish(false);
          navigation.navigate('User');  
      }

      

    


    const [region,setRegion] = useState({
        longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.01,
    latitudeDelta: 0.02,
    });

    const [marker,setMaker] = useState({
        coord:{
            longitude: 121.544637,
            latitude: 25.024624,
        },
        name:'NTUE',
        address:'Eat-Eat'
    });

    const onRegionChangeComplete = (rgn) => {
        setRegion(rgn);
        setMaker({...marker,coord:{
            longitude: rgn.longitude,
            latitude: rgn.latitude
        }});
    }
    return (

        <ScrollView style={{backgroundColor:'#fff'}}>
            
            <View style={styles.detailView}> 
            <View style={{flexDirection:'row',height:setheight(196)}}>
                <ImageBackground 
                source={require('../img/account_bg.png')}
                style={{zIndex:5,height:setheight(252),width:devicewidth}}
                >
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={{width:42,height:42,backgroundColor:'#fff',borderRadius:10,alignItems:'center',paddingTop:12,marginLeft:16}}>
                    <Image
                    source={require('../icon/back.png')}
                    style={{width:18,height:18}}
                    />
            </TouchableOpacity>
            
            </ImageBackground>
            
            </View>
            <View style={{top:setheight(126),position:'absolute',alignSelf:'center',zIndex:5}}>
                <Image
                source={{uri:img}}
                style={{borderRadius:15,width:setWidth(195),height:setheight(195)}}
                />
                <Text style={{fontSize:setSptext(22),marginTop:setheight(16),alignSelf:'center',}}>{food}</Text>
            </View>


            <View style={styles.fooddetailcard}>
            <View style={{marginTop:setheight(108)}}>

           
            
            <View style={styles.fooddetailcontent}>

                <View style={styles.FooddetailList}>
                    <Text style={styles.buyer_detail_text}>領取人</Text>
                    <Image
                    style={{width:setWidth(32),height:setheight(32),borderRadius:20,bottom:5}}
                    source={{uri:SellerPhoto}}
                    />
                    <Text style={styles.buyer_detail_text_namecontent}>{name}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>價格</Text>
                        <Text style={styles.fooddetailcontent_text}>免費</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>數量</Text>
                    <Text style={styles.buyer_detail_text_content}>1</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>期限</Text>
                        <Text style={styles.fooddetailcontent_text}>{date}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>說明</Text>
                        <Text style={styles.fooddetailcontent_text}>{foodDetail}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>地點</Text>
                    <Text style={styles.fooddetailcontent_text}>捷運科技大樓站</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>下訂時間</Text>
                    <Text style={styles.buyer_detail_text_content}>2020-{Datetimestamp}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:setSptext(18),width:setWidth(86),color:'#656565'}}>領取時間</Text>
                    <Text style={styles.buyer_detail_text_content}>{transtime}</Text>
                </View>
            </View>

            </View>
            <View style={{marginTop:setheight(16),flexDirection:'row',justifyContent:'center'}}>
                <TouchableOpacity style={styles.btn_touchable}>
                    <Image source={require('../icon/chat2x.png')} style={{width:setWidth(18),height:setheight(18)}} />
                    <Text style={{color:'#fff',fontSize:setSptext(15),marginLeft:setSptext(8)}}>聯絡領取人</Text>
                </TouchableOpacity>
                
            </View>
            </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    cancel_btn:{
        width:setWidth(340),
        height:setheight(42),
        backgroundColor:'#F0A202',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    mapstyle:{
        marginTop:setheight(8),
        width:setWidth(340),
        height:setheight(318),
        borderRadius:10
    }, 
    confirmbutton:{ 
        backgroundColor: '#f0A202', 
        width: setWidth(103), 
        height:setheight(42),
        borderRadius:10,
        marginTop:setheight(24)
    },
    finish_cardstyle:{
        paddingTop:setheight(40),
        width:setWidth(287),
        height:setheight(393),
        borderRadius:20,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    containerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "relative",
        flex: 1,
        justifyContent: "center",
        alignItems:'center'
        
      },
    buyer_detail_text_namecontent:{
        fontSize:setSptext(18),
        color:'#656565',
        marginLeft:setWidth(8)
    },
    buyer_detail_text_content:{
        fontSize:setSptext(18),
        color:'#656565',

    },
    buyer_detail_text:{
        fontSize:setSptext(18),
        color:'#656565',
        width:setWidth(86)

    },
    buyer_detail_card:{
        width:setWidth(311),
        height:setheight(222),
        borderRadius:20,
        shadowColor:'#76510466',
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.4,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        marginTop:setheight(33)
        
    },
    btn_touchable:{
        flexDirection:'row',
        width:setWidth(310),
        height:setheight(42),
        backgroundColor:'#f0A202',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    
    fooddetailcard:{
        flex:1,
        backgroundColor:'#fff',
        borderTopEndRadius:25,
        borderTopStartRadius:25
    },
    fooddetailcontent:{
        backgroundColor:'#fff',
        marginTop:setheight(32)

    },
    fooddetailcontent_text:{
        color:'#656565',
        fontSize: setSptext(18)

    },
    fooddetailcontent_text2:{
        color:'#656565',
        fontSize: setSptext(15)

    },
    
    detailView:{
        backgroundColor:'#F0A202',
        flex:1,
        paddingTop:setheight(44)

    },
    Userphoto:{
        width:setheight(64),
        height:setheight(64),
        borderRadius:35,
        marginLeft:setWidth(16)
    },
    FooddetailList:{
        height:setheight(42),
        width:devicewidth,
        marginLeft:setWidth(64),
        flexDirection:'row',
        alignItems:'center'  
    },
    Twobutton:{
        flexDirection:'row'
    }


})

export default BuyerFinishOrder;