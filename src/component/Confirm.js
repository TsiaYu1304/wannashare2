import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";

const Confirm = ({ title, visible, onAccept, onDecline }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.containerStyle}>
        <Card containerStyle={styles.cardstyle} 
              dividerStyle={{top:20,width:268,right:15}} 
              titleStyle={{fontSize:17}}
              title={title}>
          <View style={{ flexDirection: "row" ,marginTop:10}}>
            <Button
              title="取消"
              titleStyle={{color:'#000'}}
              buttonStyle={{ bottom:5,backgroundColor: 'rgba(242,242,242,0)', width: 100,}}
              containerStyle={{marginRight: 30}}
              onPress={onDecline}
            />
            <Button
              title="確定"style={{color:'#000'}}
              titleStyle={{color:'#000'}}
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
        paddingTop:40,
        width:268,
        height:140,
        borderRadius:20,
        marginLeft:54
    },
  containerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "relative",
    flex: 1,
    justifyContent: "center",
    
  },
  buttonstyle:{ 
      width:134, 
      bottom:5,
      backgroundColor: 'rgba(242,242,242,0)', 
      width: 100, }
});

export default Confirm;
