import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { useAddItem } from '@/IO';
import { useQueryClient } from 'react-query';
import * as FileSystem from 'expo-file-system'
import { Icon, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
const newGuichet = () => {
    const [name,setName]=useState('')
    const [icon,setIcon]=useState('')
    const [role,setRole]=useState(null)
    const [status,setStatus]=useState(null)
    const queryClient=useQueryClient()
    const {mutate,isError,error}=useAddItem({onSuccess:async()=>{
        await queryClient.invalidateQueries(['guichets']);
        router.push('/')

    }})
    const handleSelectImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access the media library is required!");
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'images',
          allowsEditing: true, 
          quality: 1, 
        });
    
        if (!result.canceled) 
{
    const path=FileSystem.documentDirectory+result.assets[0].fileName

    await FileSystem.copyAsync(
        {
            from:result.assets[0].uri,
            to:path
        }
    )
    setIcon(path)
}        
      };
    
    
  return (
    <View  style={styles.container}>
        <View style={styles.screenTitle}>
            <Text style={styles.title}>Créez un nouveau guichet</Text>
        </View>
        <View style={styles.imageinput}>
        <Pressable  onPress={handleSelectImage}>
          { !icon?   <View style={styles.iconContainer}>
                <IconButton icon={'image'}></IconButton>
            </View> :<Image style={styles.iconContainer} source={{uri:icon}}></Image>}
        </Pressable>
        <View style={styles.instructions}>
        <Text style={styles.textInstr} >Format autorisees :png et svg</Text>
        <Text style={styles.textInstr} >Taille maximale autorisee:2 Mo</Text>
        <Text style={styles.textInstr} >Dimensions ideales de l'image: 100px * 100px</Text>
        </View>
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom du guichet</Text>
        <TextInput style={styles.input} placeholder="Entrez l'intitule" onChangeText={(text)=>setName(text)} / >
        {isError && <Text style={styles.error}>This name is already used</Text>}

        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Status</Text>
        <RNPickerSelect
        style={{
            inputAndroid:styles.input,
            inputIOS:styles.input
        }}   
    
        
         items={[
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
          { label: "Pending", value: "Pending" },
        ]}onValueChange={setStatus} / >
        </View>
    
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Role</Text>
        <RNPickerSelect
        style={{
            inputAndroid:styles.input,
            inputIOS:styles.input
        }}   
        
         items={[
          { label: "Admin", value: "Admin" },
          { label: "User", value: "User" },
          { label: "Guest", value: "Guest" },
        ]}onValueChange={setRole} / >
        </View>
        <View style={styles.actions}>
            <Button title='Valider' disabled={!name || !role || !status} onPress={async()=>{
                await mutate({name:name,favori:false,role:role,state:status,icon:icon})        
            }}/>
        </View>
        
    </View>
  )
}

export default newGuichet
 const styles = StyleSheet.create({  
    container:{
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:30
    },
    input:{
        width:'100%',
        borderColor:'black',
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'#f7f7f7'
    },
    label:{
        width:'100%',
    },
    inputContainer:{
        display:'flex',
        alignItems:'center',
        width:'90%',
        gap:6,
        fontWeight:100
    },
    actions:{
        width:"90%"
    },
    iconContainer:{
        height:100,
        width:100,
        borderWidth:1.5,
        borderRadius:999,
        borderStyle:'solid',
        backgroundColor:'#f7f7f7',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    imageinput:{
        width:'90%',
        display:'flex',
        flexDirection:'row',
        gap:30
    },instructions:{
        display:'flex',
        justifyContent:'space-around'
    },
    textInstr:{
        fontSize:10
    },
    screenTitle:{        
    }
    ,title:{
        fontSize:25,
        fontWeight:'bold'
    },
    error:{
        color:'red',
    }
})