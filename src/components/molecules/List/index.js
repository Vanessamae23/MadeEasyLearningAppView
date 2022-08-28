import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { IconContact, IconEditProfile, IconNext, IconSubject} from '../../../assets'

const List = ({profile, name, desc, type, onPress, icon }) => {
  const Icon = () => {
    if(icon === 'edit-profile') {
      return <IconEditProfile />
    }
    if(icon === "subject") {
      return <IconSubject />
    }
    if(icon === 'contact') {
      return <IconContact />
    }
    return <IconEditProfile />
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        {icon ? <Icon /> : <Image style={styles.avatar} source={profile} />}
        <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
      <Text style={styles.message}>{desc}</Text>
        </View>
        { type === 'next' && <IconNext /> }
    </TouchableOpacity>
  )
}

export default List

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 12
    },
    container: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: colors.text.secondary,
        justifyContent: "space-between"
    },
    name: {
        fontSize: 16,
        color: colors.text.primary,
        fontFamily: fonts.primary[600]
    },
    message: {
        fontSize: 14,
        color: colors.text.secondary,
        fontFamily: fonts.primary[400]
    },
    content: {
      flex: 1,
      marginLeft: 15
    }
})