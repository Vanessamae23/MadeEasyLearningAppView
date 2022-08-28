import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ILCatMath } from '../../../assets'
import { colors, fonts } from '../../../utils'

const MentorCategory = ({ category, onPress }) => {
    const Icon = () => {
        if(category === "math") {
            return <ILCatMath style={styles.illustration} />
        }
        return <ILCatMath style={styles.illustration} />
    }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon />
      <Text style={styles.label}>Looking For</Text>
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity >
  )
}

export default MentorCategory

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: colors.card,
        alignSelf: 'flex-start',
        marginRight: 10,
        borderRadius: 10,
        width: 190,
        height: 150
    },
    illustration: {
        marginBottom: 20
    },
    label: {
        fontSize: 14,
        fontFamily: fonts.primary[400],
        color: colors.text.primary
    },
    category: {
        fontSize: 16,
        color: colors.text.primary,
        fontFamily: fonts.primary[600]
    }
})