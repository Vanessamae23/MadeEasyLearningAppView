import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {DummyUser} from '../../assets';
import {Firebase} from '../../config';

const Messages = ({navigation}) => {
  const [user, setUser] = useState({});
  const [ historyChat, setHistoryChat ] = useState([])
  const getDataFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  useEffect(() => {
    getDataFromLocal();
    Firebase.database()
      .ref(`messages/${user.uid}/`)
      .on('value', async (snapshot) => {
        if(snapshot.val()) {
            
            const oldData = snapshot.val()
            const data = [];
            const promises = await Object.keys(oldData).map(async key => {
                const urlUidMentor = `mentor/${oldData[key].uidPartner}`
                const detailMentor = await Firebase.database().ref(urlUidMentor).once('value')
                data.push({
                    id: key,
                    detailMentor: detailMentor.val(),
                    ...oldData[key]
                })
            })
            await Promise.all(promises)
            setHistoryChat(data)
        }
      });
  }, [user.uid]);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Messages</Text>
      {historyChat.map((chat,index) => {
          const dataMentor = {
              id: chat.detailMentor.uid,
              data: chat.detailMentor
          }
        return (
          <List
            onPress={() => navigation.navigate('Chatting', dataMentor)}
            key={index}
            profile={
              chat.detailMentor.hasOwnProperty('photo')
                ? {uri: chat.detailMentor.photo}
                : DummyUser
            }
            name={chat.detailMentor.fullName}
            desc={chat.lastContentChat}
          />
        );
      })}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.primary[800],
    letterSpacing: 2,
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 12,
  },
});
