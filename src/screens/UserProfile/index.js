import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Header, Profile, List } from '../../components'
import { Gap } from '../../components'
import { colors, getData } from '../../utils'
import { DummyUser, ILNullPhoto } from '../../assets'
import { Firebase } from '../../config'
import { showMessage } from 'react-native-flash-message'

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: "",
    level: ""
  })
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = { uri: res.photo }
      setProfile(data)
    })
  }, [])
  const signOut = () => {
    Firebase.auth().signOut().then(() => {
      navigation.replace('GetStarted')
    }).catch(e => {
      showMessage({
        message: e.message,
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white
      })
    })
  }
  return (
    <View style={styles.page}>
      <Header title="User Profile" onPress={() => navigation.goBack()}/>
      <Gap height={10} />
      {profile.fullName.length > 0 && <Profile name={profile.fullName} desc={profile.level} avatar={profile.photo.uri !== undefined ? profile.photo : ILNullPhoto}/>}
      <Gap height={14} />
      <List onPress={() => navigation.navigate('UpdateProfile')} name="Edit Profile" type="next" desc="Last updated yesterday" icon="edit-profile"/>
      <List onPress={() => navigation.navigate('SubjectTaken', profile)} name="Subjects Taken" type="next" desc="Last updated yesterday" icon="subject"/>
      <List name="Contact Us" type="next" desc="Help? Feedback? Become a Mentor?" icon="contact" onPress={() => alert("For more contact info, please visit our website at ____")}/>
      <List name="Logout" type="next" desc="Sign Me Out" icon="edit-profile" onPress={signOut}/>

    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  }
})