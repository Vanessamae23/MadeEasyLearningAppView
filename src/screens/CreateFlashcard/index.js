import { StyleSheet, ScrollView, View, RefreshControl, TouchableOpacity, Text, Keyboard } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { colors, getData, useForm, fonts, showError } from '../../utils'
import { Button, Gap, Header, Input } from '../../components'
import { Firebase } from '../../config'
import { IconChemistry } from '../../assets'
import { BannerAd, TestIds, BannerAdSize, AdEventType } from '@react-native-firebase/admob';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CreateFlashcard = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
    const [form, setForm ] = useForm({
        subjectTitle: ''
    })
    const user = route.params
    const [card, setCard] = useState([]);
    const [render, setRender] = useState(false)
    useEffect(() => {
        
        Firebase.database().ref('userCards/' + user + '/').on('value', async (res) => {
          if(res.val()) {
            const data = res.val();
            console.log(data)
            const allData = [];
            await Object.keys(data).map(key => {
                allData.push({
                    subject: data[key].subjectTitle,
                    id: key
           }) })
           setCard(allData);
          }
        })
    },[user, render, refreshing])



    const submit = () => {
        Firebase.database().ref('userCards/' + user + '/').push(form).then(res => {
        })
        setRender(!render)
        setForm('')
        Keyboard.dismiss();
    }

  return (
    <View style={styles.page}>
        <Header title="Add New Flashcards" onPress={() => navigation.goBack()}  />
      <ScrollView  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <BannerAd requestOptions={{requestNonPersonalizedAdsOnly: true,}} size={BannerAdSize.FULL_BANNER} unitId='ca-app-pub-4463676007154844/9423539198' />
      {card.map((item,index) => {
        const subjectCard = {
          subject: item.subject,
          id: item.id,
          user: user
        }
        return(
          <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate('CustomQuiz', subjectCard)} >
            <View style={styles.box}>
              <View>
              <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.desc}>Press here to start your quiz</Text>
              </View>
           <IconChemistry />
            </View>
          </TouchableOpacity>
        )
      })}
      </ScrollView>
      <View style={styles.container}>
          <View style={styles.input}>
          <Input label="Your Custom Subject" value={form.subjectTitle} onChangeText={(value) => setForm('subjectTitle', value)} />
          </View>
          <Gap height={20} />
          <View style={styles.button}>
            <Button title="Add" onPress={submit} />
          </View>
      </View>
    </View>
  )
}

export default CreateFlashcard;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
      },
      container: {
          paddingHorizontal: 20,
          flexDirection: 'row',
          marginHorizontal: 10,
          height: 110,
      },
      button: {
          flex: 1,
          justifyContent: 'center',
          alignContent: "center",
          marginHorizontal: 10
      },
      input: {
        flex: 4
      },
      card: {
        backgroundColor: colors.card,
        borderRadius: 10,
        padding: 15,
        paddingTop: 15,
        paddingBottom: 10,
        margin: 20,
      },
      subject: {
        color: colors.secondary,
        fontSize: 22,
        marginBottom: 10,
        fontFamily: fonts.primary[800],
      },
      addContainer: {
        backgroundColor: colors.primary,
        height: 40, 
        borderRadius: 10,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      textAdd: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: fonts.primary[400]
      },
      progress: {
        color: colors.primary,
        fontSize: 20,
        fontFamily: fonts.primary[400],
      },
      box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
})