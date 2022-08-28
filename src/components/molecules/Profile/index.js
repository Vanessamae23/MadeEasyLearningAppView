import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DummyUser, IconDeletePhoto } from '../../../assets'
import { colors, fonts } from '../../../utils'

const Profile = ({ name, desc, avatar, isRemove, onPress }) => {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.profile}>
        <Image source={avatar} style={styles.avatar} />
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.profile} onPress={onPress}>
        <Image source={avatar} style={styles.avatar} />
        { isRemove && <IconDeletePhoto style={styles.removePhoto}/>}
        </TouchableOpacity>
      )}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
  },
  container: {
    alignItems: 'center',
    justifyContent: "center"
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 24,
    color: colors.text.primary,
    marginTop: 15
  },
  desc: {
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: colors.text.secondary,
    marginVertical: 5
  },
  removePhoto: {
    position: 'absolute',
    right: 2,
    top: 70
  },
  profile: {
    alignItems: 'center',
  }
})