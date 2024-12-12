import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Menu, Button, Divider, IconButton, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const logo=require('./../assets/images/react-logo.png')
interface GuichetItemProps{
    item:Guichet,
    handleDelete:()=>void
    handleClickFavori:()=>void
}
const GuichetItem = ({item,handleDelete,handleClickFavori}:GuichetItemProps) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
  return (
    <TouchableWithoutFeedback onPress={closeMenu}>

    <View style={styles.container}>
        <View style={styles.iconContainer}>


<View style={styles.header}>

        
    <View>
        <Provider >

        <IconButton icon="dots-vertical" onPress={openMenu} onBlur={closeMenu} />
        <Menu
        onDismiss={closeMenu}
        style={styles.menu}
          visible={visible}
          anchor={{x:20,y:40}}
        >
          <Menu.Item style={styles.menu} onPress={() => handleDelete()} title="Supprimer" />
        </Menu>
        </Provider>
    </View>

    <View>
         <IconButton icon={item.favori ? 'star':'star-outline'} onPress={()=>handleClickFavori()} iconColor='yellow'/>
     </View>
    </View>
            <View style={styles.imageContainer}>
            <Image source={!item.icon ? logo :{uri:item.icon}} style={styles.image}></Image>
            <Text>{item.role}</Text>
            </View>

        </View>
        <View style={styles.footer}>
        <Text>{item.name}</Text>
        <Text>{item.state}</Text>
        </View>
    </View>
    </TouchableWithoutFeedback>

  )
}

export default GuichetItem

const styles = StyleSheet.create({
    container:{
        width:'100%',
        display:'flex'
    },
    iconContainer:{
        zIndex:-1,
        backgroundColor:'#f2f2f2',
        margin:10,
        height:250,
        borderColor:'black',
        borderWidth:0.6,
        borderRadius:10,
        display:'flex',
        alignItems:'center'
    },
    image:{ 
        height: 100,
        width:100,
        resizeMode: 'cover',
        borderRadius:9000,
        zIndex:-1
    
    }
        ,
        header:{
            height:'20%',
            width:'100%',
            display:'flex',
            justifyContent:'space-between',
            flexDirection:'row'

        },
        imageContainer:{
            height:'60%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            gap:20
        },
        footer:{
            marginLeft:10,
            marginRight:10,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
        },
        menu:{
            zIndex:99
        }
  
})