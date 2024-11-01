import { useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/input";
import { Button } from "@components/Button";

import { Center, Text, VStack, Heading, useToast} from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ToastMessage } from "@components/ToastMessage";



export function Profile(){
  const [userPhoto, setUserPhoto] = useState("https://github.com/luizZim.png")

  const toast = useToast()
  
  async function handleUserPhotoSelect(){
    try{
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })

    if(photoSelected.canceled){
      return
    }

    const photoURI = photoSelected.assets[0].uri

    if(photoURI){
      const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
        size: number
      }

      if(photoInfo.size && photoInfo.size / 1024 / 1024 > 1 ){
        return toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage 
              id={id}
              action="error"
              title="Essa Imagem é muito grande. Escolha uma de ate 5MB"
              onClose={() => toast.close(id)}
            />
          )
        })
      }

      setUserPhoto(photoURI)
     }
    }catch (error) {
      console.log(error)
    }
  }

  return(
      <VStack flex={1}>
        <ScreenHeader title="Perfil"/>

        <ScrollView contentContainerStyle={{paddingBottom: 36}} >
          <Center mt="$6" px="$10">
            <UserPhoto 
              source={{ uri: userPhoto }}
              alt="Foto do usuário." 
              size="xl"
            />

            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <Text color="$green500" fontFamily="$heading" fontSize="$md" mt="$2" mb="$8">Alterar foto</Text>
            </TouchableOpacity>

            <Center w="$full" gap="$4">
              <Input placeholder="Nome" bg="$gray600"/>
              <Input value="luiz@email.com" bg="$gray600" isReadOnly/>
             </Center>

             <Heading 
              alignSelf="flex-start" 
              fontFamily="$heading" 
              color="$gray200" 
              fontSize="$md" 
              mt="$12" 
              mb="$2"
            >
              Alterar senha
            </Heading>

            <Center w="$full" gap="$4">
              <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry/>
              <Input placeholder="Nova senha" bg="$gray600" secureTextEntry/>
              <Input placeholder="Confirme a nova senha" bg="$gray600" secureTextEntry/>

              <Button title="Atualizar"/>
            </Center>
          </Center>
        </ScrollView>
      </VStack>
    )

}
  
