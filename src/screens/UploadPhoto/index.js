import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {IconAddPhoto, IconDeletePhoto, ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Link} from '../../components';
import {colors, fonts} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import { Firebase } from '../../config';
import { storeData } from '../../utils';


const UploadPhoto = ({navigation, route}) => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('')
 const { fullName, level, uid } = route.params;
  const getImage = async () => {
    const result = await launchImageLibrary({includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200});
    
    if(result.didCancel || result.error) {
      showMessage({
        message: 'Oops, there is no photo uploaded. Retry again...',
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white
      })
    } else {
      const source = { uri: result.assets[0].uri }
      setPhotoForDB(`data:${result.assets[0].type};base64, ${result.assets[0].base64}`)

      setPhoto(source);
      setHasPhoto(true)
  
    }
  };

  const uploadAndContinue = () => {
    Firebase.database()
      .ref('users/' + uid + '/')
      .update({photo: photoForDB});

      const data = route.params;
      data.photo = photoForDB;
      storeData('user', data)

    navigation.replace('MainApp')
  }

  return (
    <View style={styles.page}>
      <Header title="Upload Your Photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image style={styles.avatar} source={photo} />
            {hasPhoto && <IconDeletePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.work}>{level}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Save and Continue"
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
          <Link
            title="Skip this Process"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 64,
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 110/2
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  name: {
    fontSize: 30,
    color: colors.text.primary,
    fontFamily: fonts.primary[700],
    textAlign: 'center',
  },
  work: {
    fontSize: 18,
    color: colors.text.secondary,
    marginTop: 4,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
  },
});
