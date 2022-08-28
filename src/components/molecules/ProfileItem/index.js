import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'

const ProfileItem = ({label, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ label }</Text>
      <Text style={styles.value}>{ value }</Text>
    </View>
  )
}

export default ProfileItem

const styles = StyleSheet.create({
    container: {
        padding: 16, 
        borderBottomWidth: 1, 
        borderColor: colors.black
    },
    label: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginBottom: 8
    },
    value: {
        fontSize: 16,
        fontFamily: fonts.primary[400],
        color: colors.text.secondary
    }
})