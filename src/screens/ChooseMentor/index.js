import { StyleSheet, Text, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header, List } from '../../components'
import { DummyUser } from '../../assets'
import { colors, showError } from '../../utils'
import { Firebase } from '../../config'

const ChooseMentor = ({navigation, route}) => {
  const [listMentor, setListMentor ] = useState([])
  const itemCategory = route.params;
  useEffect(() => {
    callMentorByCategory(itemCategory.category)
  }, [itemCategory.category])

  const callMentorByCategory = (category) => {
    Firebase.database().ref('mentor/').orderByChild('subject').equalTo(category).once('value').then(res => {
      if(res.val()){
        const oldData = res.val();
        const data = []
        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            data: oldData[key]
          })
        })
        setListMentor(data)
      }
    }).catch(err => {
      showError(err.message)
    })
  }

  return (
    <View style={styles.page}>
        <Header type="dark" title={`${itemCategory.category} mentors`} onPress={() => navigation.goBack()} />
        {listMentor.map(mentor => {
          return <List key={mentor.id} onPress={() => navigation.navigate('MentorProfile', mentor)} type="next" profile={mentor.data.hasOwnProperty('photo') ? {uri: mentor.data.photo} : DummyUser} name={mentor.data.fullName} desc={mentor.data.subject} />
        })
        }
    </View> 
  )
}

export default ChooseMentor

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    }
})