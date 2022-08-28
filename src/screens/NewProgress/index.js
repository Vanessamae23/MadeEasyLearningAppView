import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors, getData, storeData, useForm } from '../../utils'
import { Button, Gap, Header, Input } from '../../components'
import { Firebase } from '../../config'

const NewProgress = ({navigation, route}) => {
    const userId = route.params
    const [form, setForm ] = useForm({
        taskTitle: '',
        time: ''
    })


    const submit = () => {
        Firebase.database().ref('userTask/' + userId + '/').push(form).then(res => {

        })
        navigation.navigate('Progress')
    }

  return (
    <View style={styles.page}>
        <Header title="Add New Task" onPress={() => navigation.goBack()}  />
      <View style={styles.container}>
          <Input label="Custom Task Title" value={form.taskTitle} onChangeText={(value) => setForm('taskTitle', value)} />
          <Gap height={20} />
          <Input label="When to be done?" value={form.time}  onChangeText={(value) => setForm('time', value)}/>
          <Gap height={30} />
          <Button title="Finish" onPress={submit} />
      </View>
    </View>
  )
}

export default NewProgress

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
      },
      container: {
          paddingHorizontal: 20
      }
})