/*
    import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {nanoid} from 'nanoid/async/index.native'

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id,setId] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function createid () {
    const iid = await nanoid(10)
    setId(iid);
  }

  const handleBarCodeScanned = ({ type, data }) => {
   
    console.log(`${id}`);
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

 

  return (
    <View
      style={{
        flex:1,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center'
        
      }}>
        
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject,{alignItems:'center',width:'100%',height:'100%',justifyContent:'center'}}
        >
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

      {scanned && <Button  title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
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
  }

})
*/