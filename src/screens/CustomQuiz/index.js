import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Header, Flashcard, Button } from '../../components'
import { colors, showError } from '../../utils'
import { Firebase } from '../../config'
import { showMessage } from 'react-native-flash-message'
import { BannerAd, TestIds, BannerAdSize, AdEventType } from '@react-native-firebase/admob';


const CustomQuiz = ({route, navigation}) => {
    const subjectCard = route.params
  const [question, setQuestion] = useState([])
  const [render, setRender] = useState(false)
  const deleteCard = (taskID) => {
    Firebase.database().ref('userCards/' + subjectCard.user + '/' + subjectCard.id + '/cards/' + taskID + '/').remove().then(res => {
      showMessage("Successfully removed")
      setQuestion(question.filter(el => el.cardId !== taskID))
      setRender(!render)
    }).catch(err => {
      showError(err.message)
    })
  }
  const deleteSubject = () => {
    Firebase.database().ref('userCards/' + subjectCard.user + '/' + subjectCard.id + '/').remove().then(res => {
      showMessage("Successfully removed")
      navigation.navigate('Review')
    }).catch(err => {
      showError(err.message)
    })
  }
  useEffect(() => {
    Firebase.database().ref('userCards/' + subjectCard.user + '/' + subjectCard.id + '/cards/').on('value', async (res) => {
      if(res.val()) {
        const response = res.val();
        const data = []
        await Object.keys(response).map(item => {
          data.push({
            cardId: item,
            cardFront: response[item].front,
            cardBack: response[item].back
          })
        })
        setQuestion(data)
      }
    })
  }, [render])
  return (
    <View style={styles.page}>
      <Header title={subjectCard.subject} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
      {question.map((item, index) => {
        return (
          <Flashcard key={index} front={item.cardFront} back={item.cardBack} onPress={() => deleteCard(item.cardId)} />
        )
      })}
      </ScrollView>
      <BannerAd requestOptions={{requestNonPersonalizedAdsOnly: true,}} size={BannerAdSize.FULL_BANNER} unitId='ca-app-pub-4463676007154844/9423539198' />
      <View style={styles.box}>
      <View style={styles.button}>
      <Button title="Add Card" onPress={() => navigation.navigate('AddCustomQuiz', subjectCard)} />
      </View>
      <View style={styles.button}>
        <Button title="Delete Flashcard" onPress={deleteSubject} />
      </View>
      </View>
      
    </View>
  )
}

export default CustomQuiz

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  },
  button: {
    margin: 10,
    flex: 1
  },
  box: {
    flexDirection: 'row'
  }
})