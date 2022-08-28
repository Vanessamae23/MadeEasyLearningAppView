import {View, TextInput, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../../utils';

const Input = ({label, value, onChangeText, secureTextEntry, disable}) => {
  const [border, setBorder] = useState(colors.white);
  const onFocusForm = () => {
    setBorder(colors.secondary);
  };
  const onBlurForm = () => {
    setBorder(colors.white);
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: border => ({
    backgroundColor: colors.input.primary.background,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: border,
  }),
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
    fontFamily: fonts.primary[400],
  },
});
