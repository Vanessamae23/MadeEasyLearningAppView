import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { ILLogo, ILGetStarted } from '../../assets'
import { Button, Gap } from '../../components'
import { colors, fonts } from '../../utils'

const GetStarted = ({ navigation }) => {
  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
        <View>
            <ILLogo />
            <Text style={styles.title}>Fun Learning with Made Easy Just For You</Text>
        </View>
        <View>
            <Button type="default" title="Get Started" onPress={() => navigation.navigate('Register')}/>
            <Gap height={16} />
            <Button type="secondary" title="Sign in" onPress={() => navigation.replace('Login')} />
        </View>
    </ImageBackground>
  )
}

export default GetStarted;

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "space-between"
    },
    title: {
        fontSize: 34,
        color: colors.white,
        marginTop: 91,
        fontFamily: fonts.primary[800]
    }
})