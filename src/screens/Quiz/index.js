import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Header, Card } from '../../components'
import { colors } from '../../utils'
import { BannerAd, TestIds, BannerAdSize, AdEventType } from '@react-native-firebase/admob';


const Quiz = ({route, navigation}) => {
  const detailTest = route.params
  const [question, setQuestion] = useState([])
  useEffect(() => {
    setQuestion(detailTest.questions)
  }, [])
  return (
    <View style={styles.page}>
      <Header title={detailTest.topic} onPress={() => navigation.goBack()} />
      <BannerAd requestOptions={{requestNonPersonalizedAdsOnly: true,}} size={BannerAdSize.FULL_BANNER} unitId='ca-app-pub-4463676007154844/9423539198' />
      <ScrollView showsVerticalScrollIndicator={false}>
      {question.map((item, index) => {
        return (
          <Card key={index} front={item.question} back={item.answer} />
        )
      })}
      </ScrollView>

    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  },
})