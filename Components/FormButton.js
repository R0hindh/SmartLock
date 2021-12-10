import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';

const FormButton = ({buttonTitle, ...props}) => {
  return (
    !props.outLineStyle?
      <TouchableOpacity style={{...styles.buttonContainer, ...props.customStyle}} onPress={props.onPress}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    :<TouchableOpacity style={{...styles.buttonContainerOutLine, ...props.customStyle}} onPress={props.onPress}>
        <Text style={styles.buttonTextOutLine}>{buttonTitle}</Text>
      </TouchableOpacity>

  );
};

export default FormButton;
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#3386EB',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Lato-Regular',
  },
  buttonContainerOutLine:{
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth:1,
    borderColor:'#3386EB'
  },
  buttonTextOutLine:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3386EB',
    fontFamily: 'Lato-Regular',
  }
});
