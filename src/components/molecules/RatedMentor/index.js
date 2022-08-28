import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'
import { DummyUser } from '../../../assets'
import { colors, fonts } from '../../../utils'

const RatedMentor = ({onPress, desc, avatar, name}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={avatar} style={styles.avatar} />
        <View>
            <Text style={styles.name}>{ name }</Text>
            <Text style={styles.category}>{desc}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default RatedMentor

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 12
    },
    container: {
        flexDirection: 'row',
        paddingBottom: 20
    },
    name: {
        fontSize: 20,
        color: colors.text.primary,
        fontFamily: fonts.primary[600]
    },
    category: {
        fontSize: 12,
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
        marginTop: 2,
    }
})