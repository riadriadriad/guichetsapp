import {useMutation, useQuery, useQueryClient,} from 'react-query'
import * as RNFS from 'expo-file-system'
import gchts from './/assets/guichets.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
const filePath=RNFS.documentDirectory+'/guichets.json'
const initialize=async()=>{ 
    const fileKey = 'guichets'; 
    const destinationPath = `${RNFS.documentDirectory}/guichets.json`;

    try {
      const isStored = await AsyncStorage.getItem(fileKey);
      if (!isStored) {

       await RNFS.writeAsStringAsync(destinationPath,JSON.stringify(gchts.guichets));
        await AsyncStorage.setItem(fileKey, 'true');
      }

    } catch (error) {
      console.error('Error initializing file:', error);
    } finally {
    }}
const getAll=async()=>{
initialize()
const data=await RNFS.readAsStringAsync(filePath)
    return JSON.parse(data)
}

export const useGetAll=()=>useQuery({
    queryFn:getAll,
    queryKey:'guichets'
})
const deletItem=async(name:string)=>{
    const data:[Guichet]=await getAll();
    const newData=data.filter(item=>item.name!=name)
    await RNFS.writeAsStringAsync(filePath,JSON.stringify(newData))
}
export const useDelete=({onSuccess}:{onSuccess:()=>void})=>useMutation({
    mutationFn:deletItem,
    onSuccess:onSuccess
})

const addItem=async (item:Guichet)=>{
    const data =await getAll()
    data.forEach(element => {
        if(element.name==item.name) throw new Error("this name is already used");
    });
    const newData=[...data,item]
    await RNFS.writeAsStringAsync(filePath,JSON.stringify(newData))
}
export const useAddItem=({onSuccess}:{onSuccess:()=>void})=>useMutation({
    mutationFn:addItem,
    onSuccess:onSuccess
})
const search=async(kw:string)=>{
    const data =await getAll()
    return data.filter(item=>item.name.includes(kw))
}
export const useSearch=(kw:string)=>useQuery({
    queryFn:()=>search(kw),
    queryKey:['guichets',kw]
})
const addFavori=async(name:string)=>{
    const data =await getAll()
    const newData=data.map(item=>{
        if(item.name==name) item.favori=!item.favori;
        return item;
    })
    await RNFS.writeAsStringAsync(filePath,JSON.stringify(newData))
}
export const useSetFavori=({onSuccess}:{onSuccess:()=>void})=>useMutation(addFavori,{
    onSuccess:onSuccess
})