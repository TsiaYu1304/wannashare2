import React, { useState, useEffect ,useRef} from 'react';
import { Text, View, TouchableOpacity,Modal ,Image, Dimensions,StyleSheet} from 'react-native';
import { Camera } from 'expo-camera';
import {Entypo, FontAwesome,AntDesign,MaterialCommunityIcons} from "@expo/vector-icons"

var {height,width} = Dimensions.get('window');

const TakepictureScreen = ({navigation}) =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturePhoto,setCapturePhoto] = useState(null);
  const [open,setOpen] = useState(false);
  const camRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture(){
      if(camRef){
          const data = await camRef.current.takePictureAsync();
          console.log(data);
          setCapturePhoto(data);
      }
     setOpen(true);
  }

  function navtoAdd(){
    navigation.navigate('Add',{
        capturePhoto:capturePhoto
      })
   setOpen(false);
}
  
  return (
    <View style={{ flex: 1 ,backgroundColor:'#fff'}}>
      <View style={{height:height*0.18}}></View>
      <Camera style={styles.CameraStyle} type={type} ref={camRef}/>

      <View style={styles.BtnView}>
        <TouchableOpacity onPress={() => navigation.goBack() } style={{marginRight:0.146*width}}>
          <AntDesign name="back" size={width*0.1} color='#F0A202'/>
        </TouchableOpacity>
          <TouchableOpacity  onPress={() => takePicture()}>  
            <MaterialCommunityIcons name="circle-slice-8" size={width*0.21} color='#F0a202'/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:0.146*width}}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
          >
          <AntDesign name="sync" size={width*0.1} color='#F0A202'/>
        </TouchableOpacity>
      </View>
      { capturePhoto &&
        <Modal
        
        transparent = {false}
        visible = {open}
        >
            <View style={{alignItems:'center'}}>

               <View style={{height:height*0.11}}></View>
                <Image
                    style={styles.showImage}
                    source={{uri:capturePhoto.uri}}
                />
                <View style={styles.BtnView}>

                <TouchableOpacity
                style={{marginRight:0.15*width}}
                onPress={()=>{setOpen(false)}}>
                <AntDesign name="leftcircleo" size={width*0.17} color="#F0A202"/>
                </TouchableOpacity>


                <TouchableOpacity
                style={{marginLeft:0.15*width}}
                onPress={navtoAdd}>
                <AntDesign name="checkcircle" size={width*0.17} color="#F0A202"/>
                </TouchableOpacity>


                </View>
            </View>
        </Modal>
      }
    </View>
  );
}

const styles = StyleSheet.create({
CameraStyle:{
  width:width,
  height:0.4*height
},
BtnView:{
  marginTop:0.157*height,
  flexDirection:'row',
  height:width*0.21,
  alignItems:'flex-end',
  justifyContent:'center'
},
showImage:{
  width:width,
  height:0.4*height,
  marginTop:0.07*height
}

})

export default TakepictureScreen;