import { StyleSheet, Text, TextInputProps, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const Input = (props:TextInputProps) => {
  return (
      <TextInput {...props} style={styles.input}/>
  )
}

export default Input

const styles = StyleSheet.create({
    input:{
        backgroundColor:'red'
    }
})