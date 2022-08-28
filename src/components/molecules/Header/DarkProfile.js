import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { Button } from '../..'
import { DummyUser } from '../../../assets'

const DarkProfile = ({ onPress, title, avatar, desc }) => {
  return (
    <View style={styles.container}>
        <Button type="icon-only" icon="back-light" onPress={onPress}/>
        <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
        </View>
      <Image style={styles.avatar} source={avatar} />
    </View>
  )
}

export default DarkProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        paddingVertical: 30,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: 'center'
    },
    content: {
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 12
    },
    name: {
        fontSize: 20,
        color: colors.white,
        textAlign: 'center',
        fontFamily: fonts.primary[600]
    },
    desc: {
        fontSize: 14,
        color: colors.text.secondary,
        textAlign: "center",
        fontFamily: fonts.primary[400]
    },
})