import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { IconTick, IconError } from '../../../assets'

const TodoBox = ({text, type, onPress}) => {
  if(type === true) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container(type)}>
      <View style={styles.box}>
        <View style={styles.title}> 
        <Text style={styles.text}>{text}</Text>
        </View>
        <IconTick />
      </View>
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(type)}>
    <View style={styles.box}>
      <View style={styles.title}>
      <Text style={styles.text}>{text}</Text>
      </View>
        <IconError />
      </View>
    </TouchableOpacity>
  )
}

export default TodoBox

const styles = StyleSheet.create({
  container: (type) => ({
    backgroundColor: type === true ? colors.success : colors.error,
    borderRadius: 10,
    margin: 15,
    paddingHorizontal: 20,
    paddingVertical: 30
  }),
  text: {
    color: colors.white,
    fontSize: 22,
    fontFamily: fonts.primary[600]
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: 150
  }
});