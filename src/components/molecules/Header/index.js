import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Gap, Button } from '../../atoms'
import { colors, fonts } from '../../../utils'
import DarkProfile from './DarkProfile'

const Header = ({onPress, title, type, avatar, desc}) => {
  if(type === 'dark-profile') {
    return <DarkProfile desc={desc} onPress={onPress} title={title}  avatar={avatar}/>
  }
  return (
    <View style={ styles.container(type) }>
        <Button onPress={onPress} type="icon-only" icon={type === 'dark' ? "back-light" : "back-dark"} />
        <Text style={styles.text(type)}>{title}</Text>
      <Gap width={25} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: (type) => ({
        paddingHorizontal: 16,
        paddingVertical: 30,
        flexDirection: "row",
        backgroundColor: type === "dark" ? colors.secondary : colors.white,
        alignItems: 'center'
    }),
    text: (type) => ({
        textAlign: "center",
        flex: 1,
        fontFamily: fonts.primary[600],
        fontSize: 20,
        color: type === 'dark' ? colors.white : colors.text.primary
    })
})

