import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({  
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
    }
})