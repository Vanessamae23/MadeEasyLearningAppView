import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors, useForm } from '../../utils'
import { Button, Gap, Header, Input } from '../../components'
import { Firebase } from '../../config'

const AddCustomQuiz = ({navigation, route}) => {
    const subjectCard = route.params
    const [form, setForm ] = useForm({
        front: '',
        back: ''
    })


    const submit = () => {
        Firebase.database().ref('userCards/' + subjectCard.user + '/' + subjectCard.id + '/cards/').push(form).then(res => {

        })
        navigation.navigate('CustomQuiz', subjectCard)
    }

  return (
    <View style={styles.page}>
        <Header title="Add New Flashcard" onPress={() => navigation.goBack()}  />
      <View style={styles.container}>
          <Input label="Front Card" value={form.front} onChangeText={(value) => setForm('front', value)} />
          <Gap height={20} />
          <Input label="Back Card" value={form.back}  onChangeText={(value) => setForm('back', value)}/>
          <Gap height={30} />
          <Button title="Set Card" onPress={submit} />
      </View>
    </View>
  )
}

export default AddCustomQuiz;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
      },
      container: {
          paddingHorizontal: 20
      },
      
})