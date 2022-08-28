import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors,  fonts,  getData, storeData } from '../../utils'
import CheckBox from '@react-native-community/checkbox';
import { Firebase } from '../../config';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Button, Header } from '../../components';

const SubjectTaken = ({route, navigation}) => {
  const userInfo = route.params
  const [subject, setSubject] = useState([])

  const getSubject = () => {
    Firebase.database().ref('subjects/').once('value').then(res => {
      if(res.val()) {
        setSubject(res.val())
      }
    })
  }
  
  useEffect(() => {
    getSubject()
  }, [])

  const data = []
  const userSubject = (subjectTaken) => {
    Firebase.database().ref('userSubject/' + userInfo.uid + '/').update(subjectTaken).then(res => {
      data.push(subjectTaken)
      storeData('subject', data)
    })
  } 

  const removeSubject = (subjectTaken) => {
    Firebase.database().ref('userSubject/' + userInfo.uid + '/').update(subjectTaken).then(res => {

    })
  } 


const [check1, setCheck1] = useState(false)
const [check2, setCheck2] = useState(false)
const [check3, setCheck3] = useState(false)
const [check4, setCheck4] = useState(false)
const [check5, setCheck5] = useState(false)
const [check6, setCheck6] = useState(false)
const [check7, setCheck7] = useState(false)
const [check8, setCheck8] = useState(false)
const [check9, setCheck9] = useState(false)
const [check10, setCheck10] = useState(false)
const [check11, setCheck11] = useState(false)
const [check12, setCheck12] = useState(false)
const [check13, setCheck13] = useState(false)
const [check14, setCheck14] = useState(false)
const [check15, setCheck15] = useState(false)
const [check16, setCheck16] = useState(false)
const [check17, setCheck17] = useState(false)
const [check18, setCheck18] = useState(false)

const submit = () => {
  if(check1) {
    userSubject({CH2: subject["H2 Chemistry"]})
  } else {
    removeSubject({CH2: null})
  }
  if(check2) {
    userSubject({PH2: subject["H2 Physics"]})
  } else {
    removeSubject({PH2: null})
  }
  if(check3) {
    userSubject({BI2: subject["H2 Biology"]})
  } else {
    removeSubject({BI2: null})
  }
  if(check4) {
    userSubject({MA2: subject["H2 Maths"]})
  } else {
    removeSubject({MA2: null})
  }
  if(check5) {
    userSubject({OGEOCore: subject["O Level Core Geography"]})
  } else {
    removeSubject({OGEOCore: null})
  }
  if(check6) {
    userSubject({OEMA: subject["O Level EMaths"]})
  } else {
    removeSubject({OEMA: null})
  }
  if(check7) {
    userSubject({OGEOElect: subject["O Level Elective Geography"]})
  } else {
    removeSubject({OGEOElect: null})
  }
  if(check8) {
    userSubject({OHISElect: subject["O Level Elective History"]})
  } else {
    removeSubject({OHISElect: null})
  }
  if(check9) {
    userSubject({GE2: subject["H2 Geography"]})
  } else {
    removeSubject({GE2: null})
  }
  if(check10) {
    userSubject({HI2: subject["H2 History"]})
  } else {
    removeSubject({HI2: null})
  }
  if(check11) {
    userSubject({OAMA: subject["O Level AMaths"]})
  } else {
    removeSubject({OAMA: null})
  }
  if(check12) {
    userSubject({OBIO: subject["O Level Biology"]})
  } else {
    removeSubject({OBIO: null})
  }
  if(check13) {
    userSubject({OCHE: subject["O Level Chemistry"]})
  } else {
    removeSubject({OCHE: null})
  }
  if(check14) {
    userSubject({OPHY: subject["O Level Physics"]})
  } else {
    removeSubject({OPHY: null})
  }
  if(check15) {
    userSubject({OHISCore: subject["O Level Core History"]})
  } else {
    removeSubject({OHISCore: null})
  }
  if(check16) {
    userSubject({OSOCELECT: subject["O Level Social Studies"]})
  } else {
    removeSubject({OSOCELECT: null})
  }
  if(check17) {
    userSubject({PSLEMATHS: subject["PSLE Maths"]})
  } else {
    removeSubject({PSLEMATHS: null})
  }
  if(check18) {
    userSubject({PSLESCIENCE: subject["PSLE Science"]})
  } else {
    removeSubject({PSLESCIENCE: null})
  }
  navigation.navigate("Progress", subject)
}

  return (
    <SafeAreaProvider style={styles.page}>
      <Header title="Choose your subject taken" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.checks}>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check1} onValueChange={() => setCheck1(!check1)} />
        <Text style={styles.text}>H2 Chemistry</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check2} onValueChange={() => setCheck2(!check2)} />
        <Text style={styles.text}>H2 Physics</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check3} onValueChange={() => setCheck3(!check3)} />
        <Text style={styles.text}>H2 Biology</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check4} onValueChange={() => setCheck4(!check4)} />
        <Text style={styles.text}>H2 Maths</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check5} onValueChange={() => setCheck5(!check5)} />
        <Text style={styles.text}>O Level Core Geography</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check6} onValueChange={() => setCheck6(!check6)} />
        <Text style={styles.text}>O Level EMaths</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check7} onValueChange={() => setCheck7(!check7)} />
        <Text style={styles.text}>O Level Elective Geography</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check8} onValueChange={() => setCheck8(!check8)} />
        <Text style={styles.text}>O Level Elective History</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check9} onValueChange={() => setCheck9(!check9)} />
        <Text style={styles.text}>H2 Geography</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check11} onValueChange={() => setCheck11(!check11)} />
        <Text style={styles.text}>O Level AMaths</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check10} onValueChange={() => setCheck10(!check10)} />
        <Text style={styles.text}>H2 History</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check12} onValueChange={() => setCheck12(!check12)} />
        <Text style={styles.text}>O Level Biology</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check13} onValueChange={() => setCheck13(!check13)} />
        <Text style={styles.text}>O Level Chemistry</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check14} onValueChange={() => setCheck14(!check14)} />
        <Text style={styles.text}>O Level Physics</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check15} onValueChange={() => setCheck15(!check15)} />
        <Text style={styles.text}>O Level Core History</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check16} onValueChange={() => setCheck16(!check16)} />
        <Text style={styles.text}>O Level Social Studies</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check17} onValueChange={() => setCheck17(!check17)} />
        <Text style={styles.text}>PSLE Maths</Text>
        </View>
        <View style={styles.checkbox}>
        <CheckBox disabled={false} value={check18} onValueChange={() => setCheck18(!check18)} />
        <Text style={styles.text}>PSLE Science</Text>
        </View>
        <View style={styles.buttonContainer}>
      <Button onPress={submit} title="Set Subjects" />
      </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default SubjectTaken

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 16,
        backgroundColor: colors.white,
        flex: 1
      },
    checkbox: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginVertical: 5
    },
    checks: {
      marginVertical: 10,
    },
    text: {
      fontSize: 25,
      fontFamily: fonts.primary[400], 
      color: colors.black
    },
    buttonContainer: {
      paddingVertical: 20
    }
})