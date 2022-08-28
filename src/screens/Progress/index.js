import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts, getData, showError} from '../../utils';
import {Gap, Header, Modal} from '../../components';
import React, {useEffect, useState} from 'react';
import {IconChemistry, IconDelete} from '../../assets';
import Firebase from 'firebase';
import { showMessage } from 'react-native-flash-message';
import { BannerAd, TestIds, BannerAdSize, AdEventType } from '@react-native-firebase/admob';

const Progress = ({route, navigation}) => {
  let subjectChange = route.params;
  const [user, setUser] = useState({});
  const [subject, setSubject] = useState([]);
  const [task, setTask] = useState([])
  let toDo = getData('task')
  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  useEffect(() => {
    getDataUserFromLocal();
    Firebase.database()
      .ref('userSubject/' + user.uid + '/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const response = res.val();
          const mainData = [];
          Object.keys(response).map(key => {
            mainData.push(response[key]);
          });
          setSubject(mainData);
        } else {
          setSubject([]);
        }
      })
      .catch(err => {
        showError(err.message);
      });
    
      Firebase.database().ref('userTask/' + user.uid + '/').on('value', async (res) => {
        if(res.val()) {
          const response = res.val();
          const data = []
          Object.keys(response).map(item => {
            data.push({
              id: item,
              detail: response[item]
            })
          })
          setTask(data)
        }
      })
  }, [subjectChange, navigation, user.uid]);

  const deleteTask = (taskID) => {
    Firebase.database().ref('userTask/' + user.uid + '/' + taskID + '/').remove().then(res => {
      showMessage("Successfully removed")
      setTask(task.filter(el => el.id !== taskID))
    })
  }


  return (
    <View style={styles.page}>
      <Modal
        text="Click here to edit or set up the subjects you take"
        onPress={() => navigation.navigate('UserProfile')}
      />
      <ScrollView>
        {subject.map((subject, index) => {
          const subjectTaken = {
            name: subject.name,
            id: subject.id,
            topics: subject.topics,
            user: user.uid,
          };
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => {
                navigation.navigate('TopicProgress', subjectTaken);
              }}>
              <View style={styles.box}>
                <View>
                  <Text style={styles.subject}>{subject.name}</Text>
                  <Text style={styles.progress}>Update progress</Text>
                </View>
                <IconChemistry />
              </View>
              <Gap height={20} />
            </TouchableOpacity>
          );
        })}
         {task.map((task, index) => {
          return (
            <View
            key={index}
              style={styles.card}>
              <View style={styles.box}>
                <View>
                  <Text style={styles.subject}>{task.detail.taskTitle}</Text>
                  <Text style={styles.progress}>To be completed by: {task.detail.time}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteTask(task.id)}>
                  <IconDelete />
                </TouchableOpacity>
              </View>
              <Gap height={20} />
            </View>
          );
        })}
        <BannerAd requestOptions={{requestNonPersonalizedAdsOnly: true,}} size={BannerAdSize.FULL_BANNER} unitId='ca-app-pub-4463676007154844/9423539198' />
      </ScrollView>
      <TouchableOpacity style={styles.addContainer} onPress={() => {navigation.navigate('NewProgress', user.uid)}}>
        <Text style={styles.textAdd}>+ Add more Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 15,
    paddingTop: 15,
    paddingBottom: 10,
    margin: 20,
  },
  subject: {
    color: colors.secondary,
    fontSize: 22,
    marginBottom: 10,
    fontFamily: fonts.primary[800],
  },
  addContainer: {
    backgroundColor: colors.primary,
    height: 40, 
    borderRadius: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textAdd: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.primary[400]
  },
  progress: {
    color: colors.primary,
    fontSize: 20,
    fontFamily: fonts.primary[400],
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
