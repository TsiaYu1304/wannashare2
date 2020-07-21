import React,{useState,useEffect} from "react";
import {View, Text,TouchableOpacity,Image,ScrollView,StyleSheet,ImageBackground} from "react-native"
import MapView,{Marker} from "react-native-maps";
import { AntDesign } from "@expo/vector-icons"
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase'; 



const SellerOrderDetailScreen = ({route,navigation}) =>{
    const [hasPermission, setHasPermission] = useState(null);
    const [isScan,setisScan] = useState(false);
    const [useruid, setUid] = useState("");
    const { name } = route.params;
    const { food } = route.params;
    const { Buyerphoto } = route.params;
    const { img } = route.params;
    const { foodDetail } = route.params;
    const { orderID } = route.params;
    const { date } = route.params;
    const { number } = route.params;
    console.log(`${isScan}`);
   
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const handleBarCodeScanned = ({ type, data }) => {

        if(data === orderID) {
        setisScan(false);
        alert(`finish`);
        
        }
      };
    


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
    return isScan ? (
        <View
        style={{
          flex:1,
          flexDirection: 'column',
          alignItems:'center',
          justifyContent:'center'
          
        }}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject,{alignItems:'center',width:'100%',height:'100%',justifyContent:'center'}}
          >
            <TouchableOpacity onPress={()=>setisScan(false)}>
            <AntDesign name="close" size={24} color='#fff' />
            </TouchableOpacity>

          <View style={{height:300}} >
          <View style={{flexDirection:'row',height:100}}>
          <View style={styles.topLeftSquare}></View>
          <View style={{flex:1}}></View>
          <View style={styles.toprightSquare}></View>
          </View>
  
          <View style={{width:300, height:100,flex:1}}></View>
  
          <View style={{flexDirection:'row',height:100}}>
          <View style={styles.bottomLeftSquare}></View>
          <View style={{flex:1}}></View>
          <View style={styles.bottomrightSquare}></View>
          </View>
          </View>
        </BarCodeScanner>
 
      </View>

    ):(

        <ScrollView style={{backgroundColor:'#fff'}}>
            
            <View style={styles.detailView}> 
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={{width:42,height:42,backgroundColor:'#fff',borderRadius:10,alignItems:'center',paddingTop:12,marginLeft:16}}>
                    <Image
                    source={require('../icon/back.png')}
                    style={{width:18,height:18}}
                    />
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>setisScan(true)}
            style={{backgroundColor:'#fff',borderRadius:10,width:42,height:42,alignItems:'center',justifyContent:'center'}}>
            <AntDesign name="scan1" size={24} color="#F0A202"/>
            </TouchableOpacity>
            </View>
            <View style={{marginTop:16,alignItems:'center'}}>
            
            <Text style={{fontSize:22,marginTop:8,color:'#fff'}}>{food}</Text>
            </View>
            <View style={{backgroundColor:'#fff',borderRadius:25,marginTop:8,paddingTop:40}}>
    
            <View >
            <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>分享者</Text>
                        <Text>{name}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>說明</Text>
                        <Text >{foodDetail}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>期限</Text>
                        <Text>{date}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>數量</Text>
                        <Text>{number}</Text>
                </View>
                <View style={styles.FooddetailList}>
                    <Text style={{fontSize:14,width:62}}>地點</Text>
                    <Text >台北市大安區和平東路360號</Text>
                </View>
            </View>
            <View style={{height:372,justifyContent:'center',alignItems:'center'}}>
                <MapView
                region={region}
                style={{width:340,height:340}}
                showsTraffic
                provider="google"
                >
                    <Marker
                    coordinate={marker.coord}
                    title={marker.name}
                    description={marker.address}
                    />
                </MapView>
                
            
            </View>
            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    topLeftSquare:{
        flex:1,
        width:100,
        borderColor:'#F0A202',
        borderTopStartRadius:40,
        borderLeftWidth:10,
        borderTopWidth:10
      },
      toprightSquare:{
        flex:1,
        width:100,
        borderColor:'#F0A202',
        borderTopRightRadius:40,
        borderRightWidth:10,
        borderTopWidth:10,
      },
      bottomLeftSquare:{
        flex:1,
        width:100,
        borderColor:'#F0A202',
        borderBottomLeftRadius:40,
        borderLeftWidth:10,
        borderBottomWidth:10
      },
      bottomrightSquare:{
        flex:1,
        width:100,
        borderColor:'#F0A202',
        borderBottomRightRadius:40,
        borderRightWidth:10,
        borderBottomWidth:10
      },
    detailView:{
        backgroundColor:'#F0A202',
        paddingTop:62

    },
    Foodimg:{
        width:375,
        height:327,
        paddingTop:48,
        paddingLeft:16
    },
    Userphoto:{
        width:64,
        height:64,
        borderRadius:35,
        marginLeft:16
    },
    FooddetailList:{
        height:42,
        width:375,
        marginLeft:60,
        flexDirection:'row',
        alignItems:'center'  
    },
    SellerSection:{
        justifyContent:'flex-start',
        flexDirection:'row',
        height:64,
        alignItems:'center',
        marginTop:32
    },
    Disandprice:{
        flexDirection:'row',
        marginLeft:95
    },
    Twobutton:{
        flexDirection:'row'
    },
    btn:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:163,
        height:42,
        marginLeft:16,
        backgroundColor:'#F0A202',
        borderRadius:10,
        marginTop:32,
        marginBottom:32
    }


})

export default SellerOrderDetailScreen;