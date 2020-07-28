import React, { useState, useEffect ,useRef} from 'react';
import { Text, View, TouchableOpacity,Modal ,Image, Dimensions,StyleSheet} from 'react-native';
import { Camera } from 'expo-camera';
import {AntDesign,MaterialCommunityIcons} from "@expo/vector-icons"
import { setheight, setWidth, setSptext ,scaleSize} from '../component/ScreenUtil';
import * as ImagePicker  from 'expo-image-picker'

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

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

let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required!');
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  setCapturePhoto(pickerResult);
  setOpen(true);
}

  
  return (
    <View style={{ flex: 1 ,backgroundColor:'#fff'}}>
      <View style={styles.close_btn}>
        <TouchableOpacity onPress={() => navigation.goBack() } >
        <AntDesign name="close" size={setWidth(32)} color="#F0A202" />
        </TouchableOpacity>
      </View>
      <Camera style={styles.CameraStyle} type={type} ref={camRef}/>

      <View style={styles.BtnView}>
        <TouchableOpacity onPress={()=>openImagePickerAsync()} style={{marginRight:setWidth(50)}}>
        <Image
            source={require('../icon/album.png')}
            style={{width:setWidth(32),height:setheight(32)}}
            />
        </TouchableOpacity>
          <TouchableOpacity  onPress={() => takePicture()}>  
            <MaterialCommunityIcons name="circle-slice-8" size={setWidth(76)} color='#F0a202'/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:setWidth(50)}}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
          >
          <Image
            source={require('../icon/refresh.png')}
            style={{width:setWidth(32),height:setheight(32)}}
            />
        </TouchableOpacity>
      </View>
      { capturePhoto &&
        <Modal
        
        transparent = {false}
        visible = {open}
        >
            <View style={{flex:1,alignItems:'center'}}>

               <View style={{height:setheight(144)}}></View>
                <Image
                    style={styles.showImage}
                    source={{uri:capturePhoto.uri}}
                />
                <View style={styles.BtnView}>

                <TouchableOpacity
                style={styles.undo_btn}
                onPress={()=>{setOpen(false)}}>
                <Image
                source={require('../icon/undo.png')}
                style={{width:setWidth(24),height:setheight(24)}}
                />
                </TouchableOpacity>


                <TouchableOpacity
                style={styles.tick_btn}
                onPress={navtoAdd}>
                <Image
                source={require('../icon/tick.png')}
                style={{width:setWidth(24),height:setheight(24)}}
                />
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
  width:devicewidth,
  height:devicewidth
},
BtnView:{
  marginTop:0.157*height,
  flexDirection:'row',
  height:setheight(76),
  alignItems:'center',
  justifyContent:'center'
},
showImage:{
  width:devicewidth,
  height:devicewidth
},
close_btn:{
  height:setheight(144),
  paddingTop:setheight(94),
  paddingLeft:setWidth(32)

},
undo_btn:{
  marginRight:setWidth(62),
  borderColor:'#F0A202',
  borderWidth:3,
  borderRadius:40,
  width:setWidth(64),
  height:setheight(64),
  justifyContent:'center',
  alignItems:'center'
}
,
tick_btn:{
  marginLeft:setWidth(62),
  backgroundColor:'#F0A202',
  borderRadius:40,
  width:setWidth(64),
  height:setheight(64),
  justifyContent:'center',
  alignItems:'center'

}

})

export default TakepictureScreen;