import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button, Header, Input, Loading, Link} from '../../components';
import {colors, fonts, storeData, useForm} from '../../utils';
import {Gap} from '../../components';
import {Firebase} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';
import SelectDropdown from 'react-native-select-dropdown';
import { IconDropdown } from '../../assets';

const Register = ({navigation, value}) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [form, setForm] = useForm({
    fullName: '',
    level: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const level = ['Primary', 'Secondary', 'Junior College'];

  const onContinue = () => {
    setLoading(true);
    Firebase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(userCredential => {
        // Signed in
        setLoading(false);
        var user = userCredential.user;
        const data = {
          fullName: form.fullName,
          level: form.level,
          email: form.email,
          uid: user.uid,
        };
        navigation.navigate('UploadPhoto', data);
        // set is to keep the data
        Firebase.database()
          .ref('users/' + user.uid + '/')
          .set(data);
        storeData('user', data);
        setForm('reset');
      })
      .catch(error => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
        // ..
      });
  };
  return (
    <>
      <View style={styles.container}>
        <Header onPress={() => navigation.goBack()} title="Create an Account" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={20} />
            <Input
              label="Email"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={20} />
            <Input
              secureTextEntry={!passwordVisible}
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
            />
            <Gap height={10} />
            <Link size={12} align="right" title="Show Password" onPress={() => setPasswordVisible(!passwordVisible)} />
            <Gap height={20} />
            <SelectDropdown
              buttonStyle={styles.select}
              defaultButtonText="Select Your Level"
              data={level}
              onSelect={(selectedItem, index) => {
                setForm('level', selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={() => {
                return <IconDropdown />
              }}
              buttonTextStyle={styles.selectText}
            />
            <Gap height={40} />
            <Button title="Proceed" onPress={onContinue} />
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  select: {
    backgroundColor: colors.input.primary.background,
    borderRadius: 10,
    padding: 10,
    border: "none",
    width: '100%',
  },
  selectText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
    fontFamily: fonts.primary[400],
  }
});
