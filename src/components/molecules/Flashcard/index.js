import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { colors, fonts } from '../../../utils'
import { IconDelete } from '../../../assets'

const Flashcard = ({front, back, onPress}) => {
    const [flip, setFlip] = useState(false)
    
  if(flip === false) {
    return (
        <TouchableOpacity onPress={() => setFlip(!flip)} style={styles.card(flip)}>
            <View style={styles.box}>
              <Text style={styles.text}>{front}</Text>
              <TouchableOpacity onPress={onPress}>
                  <IconDelete />
        </TouchableOpacity>
        </View>
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



export default Flashcard

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
      flex: 1,
      marginLeft: 5
    },
    box: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
})