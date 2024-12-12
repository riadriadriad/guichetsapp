import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { Slot } from 'expo-router'
import * as RNFS from 'expo-file-system'
import { QueryClient, QueryClientProvider } from 'react-query'
import {Asset} from 'expo-asset'
import AsyncStorage from '@react-native-async-storage/async-storage'
const defaultValue:{guichets:Guichet[],setGuichets:any}={guichets:[] ,setGuichets:()=>{}}
export const GuichetContext=createContext(defaultValue)

import gchts from './../assets/guichets.json'
const _layout = () => {

useEffect(
    ()=>{
          
      const initialize=async()=>{ 
       const fileKey = 'guichets'; 
       const destinationPath = `${RNFS.documentDirectory}/guichets.json`;
 
       try {

         const isStored = await AsyncStorage.getItem(fileKey);
         const isImageStored = await AsyncStorage.getItem("icon");
         if (!isStored) {
          await RNFS.writeAsStringAsync(destinationPath,JSON.stringify(gchts.guichets));
           await AsyncStorage.setItem(fileKey, 'true');
         }
         if (!isStored) {
            await RNFS.writeAsStringAsync(destinationPath,JSON.stringify(gchts.guichets));
             await AsyncStorage.setItem(fileKey, 'true');
           }
   
       } catch (error) {
         console.error('Error initializing file:', error);
       } finally {
       }}
       initialize()
       
   }
   ,[]
)
  return (
    <QueryClientProvider client={new QueryClient()} >
        <Slot></Slot>
    </QueryClientProvider>

  )
}

export default _layout

const styles = StyleSheet.create({})