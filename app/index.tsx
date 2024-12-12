import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {  useEffect, useState } from 'react'
import Header from '@/components/Header'
import GuichetItem from '@/components/GuichetItem'
import { useDelete, useGetAll, useSearch, useSetFavori } from '@/IO'
import { useQueryClient } from 'react-query'
import {styles} from './styles'
const index = () => {
    const queryClient=useQueryClient()
    const [favoris,setFavoris]=useState(false)
    const deleteItem=useDelete({
        onSuccess:async ()=>{
            await queryClient.invalidateQueries(['guichets'])
        }
    })
    const setFavori=useSetFavori({onSuccess:async()=>{
        await queryClient.invalidateQueries(['guichets'])
    }})
    const [searchKw,setSearchKw]=useState<string>('')
    const {data,isLoading}=useSearch(searchKw)
  return (
    <View style={style.container}>
        <Header numberOfGuichets={data?.length} favoris={favoris} setFavori={setFavoris}/>
        <View>
        <View style={style.searchContainer}>

        <TextInput placeholder='Rechercher ...'  style={styles.input} onChangeText={(value)=>setSearchKw(value)}></TextInput>
        </View>

        </View>
        <ScrollView>
            {isLoading|| deleteItem.isLoading && <Text>Loading ...</Text>}
        {!favoris ? data && data.map(g=>
            <GuichetItem key={g.name} handleDelete={async()=>{deleteItem.mutate(g.name)}} handleClickFavori={()=>setFavori.mutate(g.name)} item={g}></GuichetItem>
        ):data && data.map(g=>{
            if(g.favori) return <GuichetItem key={g.name} handleDelete={async()=>{deleteItem.mutate(g.name)}} handleClickFavori={()=>setFavori.mutate(g.name)} item={g}></GuichetItem>
        })}
        </ScrollView>
    </View>
  )
}

export default index
const style=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
    },
    searchContainer:{
        margin:10
    }
})