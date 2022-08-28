import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Gap, HomeProfile, MentorCategory, RatedMentor} from '../../components';
import {colors, fonts, showError } from '../../utils';
import { DummyUser } from '../../assets';
import { Firebase } from '../../config'


const Mentors = ({ navigation }) => {
  const [ category, setCategory] = useState([])
  const [ mentor, setMentor ] = useState([])
  useEffect(() => {
    Firebase.database().ref('category/').once('value').then(res => {
      if(res.val()) {
        setCategory(res.val())
        getMentors()
      }
    })
  }, [])

  // obj to array
  const parseArray = (listObject) => {
    const data = [];
    Object.keys(listObject).map(key => {
      data.push({
        id: key,
        data: listObject[key]
      })
    })
    return data;
  }

  const getMentors = () => {
    Firebase.database().ref('mentor/').limitToLast(5).once('value').then(res => {
      if(res.val()) {
        const data = parseArray(res.val())
        const filterData = data.filter(el => el !== null)
        setMentor(filterData)
      }
    }).catch(err => {
      showError(err.message)
    })
  }

  return (
    <View style={styles.page}>
      <HomeProfile onPress={() => navigation.navigate('UserProfile')}/>
      <ScrollView  showsVerticalScrollIndicator={false}>
      <Text style={styles.welcome}>
        Which mentor do you want to consult with today?
      </Text>
      <View style={styles.wrapperScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.category}>
            <Gap width={16} />
            { category.map(item => {
              return <MentorCategory onPress={() => navigation.navigate('ChooseMentor', item)} category={item.category} key={item.id} />
            })}
            <Gap width={6} />
          </View>
        </ScrollView>
      </View>
      <Text style={styles.sectionLabel}>Our Mentors</Text>
      
        {mentor.map(mentor => {
          return <RatedMentor key={mentor.id} name={mentor.data.fullName} desc={mentor.data.subject} avatar={mentor.data.hasOwnProperty('photo') ? {uri: mentor.data.photo} : DummyUser} onPress={() => navigation.navigate('MentorProfile', mentor) }/>
        })}
      </ScrollView>
    </View>
  );
};

export default Mentors;

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    flex: 1
  },
  welcome: {
    fontSize: 25,
    fontFamily: fonts.primary[800],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 15,
    maxWidth: 300,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
      marginHorizontal: -16
  },
  sectionLabel: {
      fontSize: 20,
      fontFamily: fonts.primary[600],
      color: colors.text.primary,
      marginTop: 30,
      marginBottom: 15
  }
});
