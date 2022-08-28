import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'

const Modal = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.page}>
    <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )

}

export default Modal;

const styles = StyleSheet.create({
    page: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      margin: 15,
      marginTop: 0,
      padding: 10,
    },
    text: {
      color: colors.white,
      fontSize: 20,
      fontFamily: fonts.primary[600]
    }
  });