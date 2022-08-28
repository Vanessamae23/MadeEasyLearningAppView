import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { colors, fonts } from '../../../utils'

const Card = ({front, back}) => {
    const [flip, setFlip] = useState(false)
  if(flip === false) {
    return (
        <TouchableOpacity onPress={() => setFlip(!flip)} style={styles.card(flip)}>
              <Text style={styles.text}>{front}</Text>
            </TouchableOpacity>
    )
  }
  return (
    (
      <TouchableOpacity onPress={() => setFlip(!flip)} style={styles.card(flip)}>
        <Text style={styles.text}>{back}</Text>
      </TouchableOpacity>
    )
  )

}

export default Card

const styles = StyleSheet.create({
    card: (type) => ({
        paddingVertical: type !== false ? 20: 40,
        backgroundColor: type !== false ? colors.error : colors.success,
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 20,
    }),
    text: {
      color: colors.white,
      fontSize: 22,
    }
})