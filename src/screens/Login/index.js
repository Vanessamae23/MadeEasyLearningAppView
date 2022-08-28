import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {ILLogo} from '../../assets';
import {Input, Link, Button, Gap} from '../../components';
import { colors, fonts, showError, storeData, useForm } from '../../utils';
import {Firebase} from '../../config';
import { useDispatch } from 'react-redux';


const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const dispatch = useDispatch()
  const [ form, setForm ] = useForm({
    email: '',
    password: ''
  })

  const login = () => {
    dispatch({ type: "SET_LOADING", value: true})
    Firebase.auth().signInWithEmailAndPassword(form.email, form.password).then(res => {
      dispatch({ type: "SET_LOADING", value: false})
      
      Firebase.database().ref(`users/${res.user.uid}/`).once('value').then(resDB => {
        if(resDB.val()) {
          storeData('user', resDB.val())
          navigation.replace('MainApp')
        }
      }) 
    })
    .catch(e => {
      dispatch({ type: "SET_LOADING", value: false})
      showError(e.message)
    })
  
  }

  const resetPassword = () => {
    if(form.email === null) {
      alert("Please fill in your email to reset password")
    }
    Firebase.auth().sendPasswordResetEmail(form.email)
  .then(() => {
    alert("Password reset email sent")
  })
  .catch((error) => {
    showError(error.message)
  });
  }

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <ILLogo />
      <Text style={styles.text}>Sign In and Start Learning</Text>
      <Input label="Email" value={form.email} onChangeText={(value) => setForm('email', value)} />
      <Gap height={20} />
      <Input label="Password" secureTextEntry={!passwordVisible} value={form.password} onChangeText={(value) => setForm('password', value)} />
      <Link size={12} title="Show Password" onPress={() => setPasswordVisible(!passwordVisible)}  />
      <Gap height={30} />
      <Button title="Sign In" onPress={login}/>
      <Gap height={20} />
      <Link size={16} title="Create New Account" align="center" onPress={() => navigation.navigate('Register')}/>
      <Gap height={10} />
      <Link size={16} title="Forgot password" align="center" onPress={resetPassword}/>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    page: {
        padding: 40,
        flex: 1,
        backgroundColor: colors.white,
    },
    text: {
        fontSize: 30,
        maxWidth: 200,
        fontFamily: fonts.primary[800],
        color: colors.text.primary,
        marginTop: 40,
        marginBottom: 40
    }
})
