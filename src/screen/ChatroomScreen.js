import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,Dimensions} from 'react-native';
import { GiftedChat ,IMessage} from 'react-native-gifted-chat'
import * as firebase from 'firebase'; 
import {nanoid} from  'nanoid/async/index.native'
const {width} = Dimensions.get('window');

/*
{
            _id: 1,
            text: RoomID,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: SellerPhoto,
            },
},

*/

const ChatroomScreen = ({route,navigation}) => {

    let addnewmess = [];
    let accepttext = "";
    let giftchatnum = "0";
    let mess = [];
    let userData = [];
    let userphoto = "";
    let username = "";
    let text = "";
    let timestamp = "";
    let idnum = 0;
    const {name } = route.params;
    const {SellerPhoto} = route.params;
    const {RoomID} = route.params;
    
    
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])

      useEffect(() => {
        let ranid = nanoid(5);
          const onchildAdded = firebase.database().ref("ChatRoom").child(RoomID).child("Messege").once('child_added',snapshot =>{
            console.log("added");
              username = snapshot.val().username
              userphoto = snapshot.val().userURL
              text = snapshot.val().AddnewMessage
              timestamp = snapshot.val().timestamp

              if(username === firebase.auth().currentUser.displayName){  //如果是我的留言的話

                userData = [{
                    _id: 1,
                    name: username,
                    avatar: userphoto
                }]
              }else {
                userData [{
                    _id: 2,
                    name: username,
                    avatar: userphoto
                }]
              };

              addnewmess = [{
                _id: ranid,
                text: accepttext,
                createdAt: new Date(timestamp),
                user: userData
              }];
              setMessages(previousMessages => GiftedChat.append(previousMessages, addnewmess));
              username = "";
              userphoto = "";
              text = "";
              timestamp = "";              

          });
        
      },[text])


  
      

      const onSend = useCallback((messages = []) => {

        //確認資料形式
        firebase.database().ref("ChatRoom").child(RoomID).child("sendMessege").set({
            text:messages,
            username:firebase.auth().currentUser.displayName,
            userURL:firebase.auth().currentUser.photoURL
        });
        
        //抓取我的text
        firebase.database().ref("ChatRoom").child(RoomID).child("sendMessege").child("text").once("value",snapshot =>{
            snapshot.forEach(function(childsnashot){
                accepttext = childsnashot.val().text;
                console.log(` ${childsnashot.val().text}`);
            })
        })

        //存到聊天室資料庫
        firebase.database().ref("ChatRoom").child(RoomID).child("Messege").child(accepttext).set({
            text:accepttext,
            timestamp:firebase.database.ServerValue.TIMESTAMP,
            username:firebase.auth().currentUser.displayName,
            userURL:firebase.auth().currentUser.photoURL
        })

      }, [])
    
    
   

    return (
       <View style={{flex:1}}>
           <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            />
       </View>
    );
}

const styles = StyleSheet.create({

});
export default ChatroomScreen;