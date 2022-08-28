import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header, Profile, ProfileItem, Button, Gap } from '../../components'
import { DummyUser } from '../../assets'
import { colors } from '../../utils'

const MentorProfile = ({navigation, route}) => {
  const mentorData = route.params
  return (
    <View style={styles.page}>
      <Header title="Mentor Data" onPress={() => navigation.goBack()}/>
      <Profile name={mentorData.data.fullName} avatar={mentorData.data.hasOwnProperty('photo') ? {uri: mentorData.data.photo} : DummyUser} desc={mentorData.data.qualification} />
      <Gap height={10} />
      <ProfileItem label="Qualifications" value={mentorData.data.qualification} />
      <ProfileItem label="Subject" value={mentorData.data.subject} />
      <View style={styles.action}>
      <Button title="Start Consultation" onPress={() => navigation.navigate('Chatting', mentorData)}/>
      </View>
    </View>
  )
}

export default MentorProfile

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  },
  action: {
    paddingHorizontal: 40, 
    paddingTop: 40
  }
})