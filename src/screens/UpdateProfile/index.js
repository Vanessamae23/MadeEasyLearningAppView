import {StyleSheet, Text, ScrollView, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Header, Input, Profile, Button, Gap} from '../../components';
import {colors, getData, storeData} from '../../utils';
import {DummyUser, ILNullPhoto} from '../../assets';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    level: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');


  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      if (data.hasOwnProperty('photo')) {
        setPhoto({uri: res.photo});
        setPhotoForDB(res.photo)
      } else {
        data.photo = DummyUser;
      }
      setProfile(data);
    });
  }, []);

  

  const update = () => {

    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password must be longer than 6 characters',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        updatePassword();
        updateProfileData()
        navigation.replace('MainApp')
      }
    } else {
      updateProfileData()
    }
  };

  const updatePassword = () => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch(e => {
          showMessage({
            message: e.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        });
      }
    });
  }

  const updateProfileData = () => {
    const data = profile;
    if (data.hasOwnProperty('photo')) {
      data.photo = photoForDB;
    } else {
       data.photo = DummyUser;
    }
    Firebase.database()
        .ref(`users/${profile.uid}/`)
        .update(data)
        .then(() => {
          storeData('user', data);
        })
        .catch(e => {
          showMessage({
            message: e.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        });
  }

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
    });
    if (result.didCancel || result.error) {
      showMessage({
        message: 'Oops, there is no photo uploaded. Retry again...',
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white,
      });
    } else {
      const source = {uri: result.assets[0].uri};
      setPhotoForDB(
        `data:${result.assets[0].type};base64, ${result.assets[0].base64}`,
      );
      setPhoto(source);
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile
            onPress={getImage}
            isRemove
            desc={profile.level}
            avatar={photo}
            name={profile.fullName}
          />
          <Gap height={10} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Input
            label="Level"
            value={profile.level}
            onChangeText={value => changeText('level', value)}
          />
          <Input disable label="Email" value={profile.email} />
          <Input
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Gap height={15} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
  },
});
