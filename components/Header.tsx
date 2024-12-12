import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './ui/Button'
import { router, useNavigation } from 'expo-router'
import { Icon, IconButton } from 'react-native-paper'

interface GuichetProps{
    numberOfGuichets:number
    favoris:boolean
    setFavori:()=>void
}
const Header = ({numberOfGuichets,favoris,setFavori}:GuichetProps) => {
    
    const handlePressOnNew=()=>router.push('/newGuichet')
    
  return (
    <View style={styles.container}>
        <Text>Guichets {numberOfGuichets}</Text>
        <Pressable style={favoris ? styles.favoriSet:styles.favori} onPress={()=>setFavori(!favoris)}>
            <Text style={favoris? styles.favoriTextSet:styles.favoriText}>Mes favoris</Text>
        </Pressable>
        <IconButton icon={'plus'} onPress={handlePressOnNew} title='Nouveau guichet'/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    favori:{
        borderColor:'green',
        borderStyle:'solid',
        borderWidth:1,
        height:40,
        width:100,
        borderRadius:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'green'
    },
    favoriText:{
        color:'green'
    },
    favoriSet:{
        borderColor:'green',
        borderStyle:'solid',
        borderWidth:1,
        height:40,
        width:100,
        borderRadius:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green'
    },
    favoriTextSet:{
        color:'white'
    }
})