import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, getData} from '../../utils'
import { Firebase } from '../../config'
import { Gap} from '../../components'
import { IconLearn, IconStudent, IconStudent1 } from '../../assets'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Review = ({navigation}) => {
  const [user, setUser] = useState('')
  const [quiz, setQuiz] = useState([])
  useEffect(() => {
    getData('user').then(res => {
      setUser(res.uid);
  })
    Firebase.database().ref(`review/`).once('value').then(res => {
      if(res.val()) {
        const dataSnapshot = res.val()
        const allData = [];
        Object.keys(dataSnapshot).map(key => {
          const data = dataSnapshot[key]
          const newData = []
          Object.keys(data).map(item => {
            newData.push({
              questionBank: data[item],
              topic: item
            })
          })
          allData.push({
            level: key,
            quizzes: newData
          })
        })
        setQuiz(allData)
      }
    })
  }, [])
  return (
    <View style={styles.page}>
      <ScrollView>
        {quiz.map((levelQuiz, index) => {
          const detailQuiz = {
            level: levelQuiz.level,
            quizzes: levelQuiz.quizzes
          }
          return (
            <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate("QuizCollection", detailQuiz)} >
              <View style={styles.box}>
                <View>
                <Text style={styles.subject}>{levelQuiz.level}</Text>
                <Text style={styles.desc}>Start your revision</Text>
                </View>
                { levelQuiz.level === "O-Level" ? <IconLearn /> : levelQuiz.level === "PSLE" ? <IconStudent /> : <IconStudent1 />}
              </View>
              <Gap height={20}/>
        </TouchableOpacity>
          )
        })}
         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("CreateFlashcard", user)} >
              <View style={styles.box}>
                <View>
                <Text style={styles.subject}>My Flashcards</Text>
                <Text style={styles.desc}>Start your revision</Text>
                </View>
               <IconLearn />
              </View>
              <Gap height={20}/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Review

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 20
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 30,
    margin: 15
  },
  subject: {
    color: colors.primary,
    fontSize: 36,
    marginBottom: 10,
    fontFamily: fonts.primary[800]
  },
  desc: {
    color: colors.secondary,
    fontSize: 18,
    marginBottom: 10,
    fontFamily: fonts.primary[400]
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})