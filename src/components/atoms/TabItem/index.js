import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { IconMentor, IconMessage, IconProgress, IconReview } from '../../../assets'
import { colors, fonts } from '../../../utils'

const TabItem = ({title, active, onPress, onLongPress}) => {
    const Icon = () => {
        if(title === 'Mentors') {
            return <IconMentor />
        }
        if(title === 'Messages') {
            return <IconMessage />
        }
        if(title === 'Progress') {
            return <IconProgress />
        }
        if(title === 'Review') {
            return <IconReview />
        }
        return <IconMentor />
    }
    
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
        <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    text: (active) => ({
        fontSize: 12,
        color: active ? colors.text.active : colors.text.inactive,
        fontFamily: fonts.primary[600],
        marginTop: 4
    })
})