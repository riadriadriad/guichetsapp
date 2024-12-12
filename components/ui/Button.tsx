import { Pressable, StyleSheet, Button as Btn, ButtonProps } from 'react-native'
import React, { ReactNode } from 'react'

const Button = (props:ButtonProps) => {
  return (
        <Btn {...props}/>
  )
}

export default Button

const styles = StyleSheet.create({
    container:{
    }
})