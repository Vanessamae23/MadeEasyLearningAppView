import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header, TodoBox } from '../../components'
import { colors, showError } from '../../utils'
import { Firebase } from '../../config'
import { BannerAd, BannerAdSize, AdEventType } from '@react-native-firebase/admob';

const TopicProgress = ({route, navigation}) => {
  const subjectTaken = route.params
  const [topic, setTopic] = useState([])
  useEffect(() => {
    const allData = []
    Firebase.database().ref(`userSubject/${subjectTaken.user}/${subjectTaken.id}/topics/`).on('value', (res) => {
      if(res.val()) {
        const dataSnapshot = res.val()
        const allData = []
        Object.keys(dataSnapshot).map(key => {
          allData.push({
            lesson: key,
            completed: dataSnapshot[key]["completed"]
          })
      })
      setTopic(allData)
    }
    })
    
  }, [])

  const changeToTrue = (e) => {
    Firebase.database().ref(`userSubject/${subjectTaken.user}/${subjectTaken.id}/topics/${e}/`).set({completed: true})
    
  }

  const changeToFalse = (e) => {
    Firebase.database().ref(`userSubject/${subjectTaken.user}/${subjectTaken.id}/topics/${e}/`).set({completed: false})
    
  }


  return (
    <View style={styles.page}  >
      <Header type="dark-profile" title={subjectTaken.name} desc="Here is your progress. You can do this!" onPress={() => navigation.goBack()}/>
      <ScrollView>
      <BannerAd requestOptions={{requestNonPersonalizedAdsOnly: true,}} size={BannerAdSize.FULL_BANNER} unitId='ca-app-pub-4463676007154844/9423539198' />

        {topic.map((item, index) => {
          if(item.completed === true) {
            return <TodoBox key={index} text={item.lesson} type={true} onPress={() => changeToFalse(item.lesson)} />
          } else {
            return (
              <TodoBox key={index} text={item.lesson} type={false} onPress={() => changeToTrue(item.lesson)} />
            )
          }
        })}
                <BannerAd requestOptions={{requestNonPersonalizedAdsOnly: true,}} size={BannerAdSize.FULL_BANNER} unitId='ca-app-pub-4463676007154844/9423539198' />

      </ScrollView>
    </View>
  )
}

export default TopicProgress

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
})

