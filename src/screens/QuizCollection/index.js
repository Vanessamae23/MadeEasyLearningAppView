import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import { colors, fonts } from '../../utils'
import { BannerAd, TestIds, BannerAdSize, AdEventType } from '@react-native-firebase/admob';

const QuizCollection = ({route, navigation}) => {
  const detailQuiz = route.params
  const [quiz, setQuiz] = useState([])
  useEffect(() => {
    setQuiz(detailQuiz.quizzes)
    
  }, [])
  return (
    <View style={styles.page}>
      <Header title="Choose flashcards to review" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
      <BannerAd requestOptions={{requestNonPersonalizedAdsOnly: true,}} size={BannerAdSize.FULL_BANNER} unitId="ca-app-pub-4463676007154844/9423539198" />
      {quiz.map((item,index) => {
        const test = {
          questions: item.questionBank,
          topic: item.topic
        }
        return(
          <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate("Quiz", test)} >
            <ScrollView>
            <Text style={styles.subject}>{item.topic}</Text>
            <Text style={styles.desc}>Press here to start your quiz</Text>
            </ScrollView>
          </TouchableOpacity>
        )
      })}
      </ScrollView>
    </View>
  )
}

export default QuizCollection

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 20,
    margin: 20
  },
  subject: {
    color: colors.primary,
    fontSize: 30,
    marginBottom: 10,
    fontFamily: fonts.primary[800]
  },
  desc: {
    color: colors.secondary,
    fontSize: 15,
    marginBottom: 5,
    fontFamily: fonts.primary[400]
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})