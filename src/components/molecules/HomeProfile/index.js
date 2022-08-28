import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DummyUser, ILNullPhoto } from '../../../assets'
import { colors, fonts, getData } from '../../../utils'

const HomeProfile = ({onPress}) => {
  const [ profile, setProfile ] = useState({
    photo: ILNullPhoto,
    fullName: '',
    level: ''
  })

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = { uri: res.photo }
      setProfile(data)
    })
  }, [])

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={profile.photo.uri !== undefined ? profile.photo : DummyUser} style={styles.avatar}/>
        <View>
        <Text style={styles.name}>{profile.fullName}</Text>
      <Text style={styles.work}>Click here to edit your profile</Text>
        </View>
    
    </TouchableOpacity>
  )
}

export default HomeProfile

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 12
    },
    name: {
        fontSize: 24,
        fontFamily: fonts.primary[800],
        color: colors.text.primary,
        textTransform: 'capitalize'
    },
    work: {
        fontSize: 12,
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
        textTransform: 'capitalize'
    }
})