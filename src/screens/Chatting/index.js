import {StyleSheet, Text, View, ScrollView, Keyboard} from 'react-native';
import React, { useState, useEffect } from 'react';
import {Header, ChatItem, InputChat} from '../../components';
import {colors, fonts, getChatTime, getData, setDateChat, showError} from '../../utils';
import {DummyUser} from '../../assets';
import { Firebase } from '../../config'

const Chatting = ({navigation, route}) => {
  const mentorData = route.params;
  const [ chatContent, setChatContent ] = useState("")
  const [user, setUser] = useState({})
  const [chatData, setChatData] = useState([])

  useEffect(() => {
    getDataUserFromLocal();
    Firebase.database().ref(`chatting/${user.uid}_${mentorData.data.uid}/allChat/`).on('value', (snapshot) => {
      if(snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];
        Object.keys(dataSnapshot).map(key => {
          const dataChat = dataSnapshot[key]
          const newDataChat = []
          Object.keys(dataChat).map(itemChat => {
            newDataChat.push({
              id: itemChat,
              data: dataChat[itemChat]
            })
          })
          allDataChat.push({
            id: key,
            data: newDataChat
          })
        });
        setChatData(allDataChat)
      }
    })
  }, [user.uid, mentorData.data.uid])

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    })
  }

  
    
  const chatSend = () => {
    const today = new Date();
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent
    }
    const chatID = `${user.uid}_${mentorData.data.uid}`
    const urlMessageUser = `messages/${user.uid}/${chatID}`
    const urlMessageMentor = `messages/${mentorData.data.uid}/${chatID}`
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: mentorData.data.uid
  }
  const dataHistoryChatForMentor = {
    lastContentChat: chatContent,
    lastChatDate: today.getTime(),
    uidPartner: user.uid
}
    Firebase.database().ref(`chatting/${chatID}/allChat/${setDateChat(today)}/`).push(data).then(res => {
      setChatContent('')
      // set history for the user
      Firebase.database().ref(urlMessageUser).set(dataHistoryChatForUser)
      Firebase.database().ref(urlMessageMentor).set(dataHistoryChatForMentor)
    }).catch(err => {
      showError(err.message)
    })
    setChatContent('')
    Keyboard.dismiss()
    
  }
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        avatar={
          mentorData.data.hasOwnProperty('photo')
            ? {uri: mentorData.data.photo}
            : DummyUser
        }
        desc={mentorData.data.subject}
        title={mentorData.data.fullName}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            chatData.map(chat => {
              return (
                <View>
                  <Text style={styles.chatDate}>{chat.id}</Text>
                  {chat.data.map((itemChat, index) => {
                    return <ChatItem key={index} text={itemChat.data.chatContent} date={itemChat.data.chatTime} isMe={itemChat.data.sendBy === user.uid ? true : false} />
                  })}
                </View>
            )})
          }
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  chatDate: {
    fontSize: 12,
    fontFamily: fonts.primary[700],
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
  
  },
});
