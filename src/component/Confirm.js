import React , {useState} from "react";
import { Text, View, Modal, StyleSheet ,Dimensions ,TextInput} from "react-native";
import { Card, Button } from "react-native-elements";
import DatePicker from 'react-native-custom-datetimepicker'
import './ScreenUtil'
import { setWidth, setheight, setSptext } from "./ScreenUtil";
import {Fontisto} from "@expo/vector-icons"
const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;


const Confirm = ({ title, visible, onAccept, onDecline }) => {

  const [choseDate,setChoseDate] = useState(new Date());

  const setDate =(date) => {
    
    console.log(date);

    return setChoseDate(date);
  }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.containerStyle}>
        <Card containerStyle={styles.cardstyle} 
              dividerStyle={{width:0}} 
              titleStyle={{fontSize:setSptext(17),color:'#656565'}}
              title={title}
        >
          <View style={{flexDirection:'row',marginLeft:setWidth(18)}}>
          <Text style={{color:'#656565',fontSize:setSptext(18)}}>數量</Text>
          <TextInput
          value={"1"}
          style={{marginLeft:setWidth(82),fontSize:setSptext(18)}}
          />
          </View>
          <Text style={{color:'#656565',marginTop:setheight(53),fontSize:setSptext(18),marginLeft:setWidth(18)}}>領取時間</Text>
          
          <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
          <Fontisto name="date" size={setheight(24)} color='#000' style={{left:setWidth(24),top:setheight(8)}} /> 
          <DatePicker
            removeUnderline = {true}
            style={styles.pickStyles}
            date={choseDate}
            mode="datetime"
            format="YYYY-MM-DD a h:mm"
            minDate="2020-08-31"
            maxDate="2020-07-24"
            locale="zh"
            confirmBtnText="確定"
            cancelBtnText="取消"
            showIcon = {false}
            customStyles={{
              btnConfirm:{
                height:100,
                alignItems:'flex-star',
                paddingTop:10,
                
              },
              btnTextConfirm:{
                color:'#F0A202'
              },
              btnCancel:{
                height:100,
                alignItems:'flex-star',
                paddingTop:10
              },
              dateText:{
                fontSize:setSptext(18)
              }
            }}
            onDateChange={(date) => setDate(date)}
      />
          
          </View>
          <View style={{ flexDirection: "row" ,justifyContent:'center',marginTop:setheight(57)}}>
            <Button
              title="取消"
              titleStyle={{color:'#F0A202'}}
              buttonStyle={styles.cancelbtn}
              onPress={onDecline}
            />
            <Button
              title="確定"
              titleStyle={{color:'#fff'}}
              buttonStyle={styles.buttonstyle}
              onPress={onAccept}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    cardstyle:{
        paddingTop:setheight(40),
        width:setWidth(287),
        height:setheight(380),
        borderRadius:20
    },
  containerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems:'center'
    
  },
  buttonstyle:{ 
      backgroundColor: '#f0A202', 
      width: setWidth(103), 
      height:setheight(42),
      borderRadius:10,
      marginLeft:setWidth(9)
  },
  cancelbtn:{
    backgroundColor: '#fff', 
    width: setWidth(103), 
    height:setheight(42),
    borderRadius:10,
    borderColor:'#F0A202',
    borderWidth:1,
    marginRight:setWidth(9)

  },
  pickStyles:{
    width:setWidth(223),
    height:setheight(36),
    marginTop:setheight(14),
    right:setWidth(10)
  }
});

export default Confirm;
