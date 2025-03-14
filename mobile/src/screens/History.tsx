import { useCallback, useState } from "react";
import { SectionList } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

import { AppError } from "@utils/AppError";

import { api } from "@services/api";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { Heading, Text, Toast, ToastTitle, useToast, VStack } from "@gluestack-ui/themed";


export function History(){
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const [exercises, setExercises ] = useState<HistoryByDayDTO[]>([])

  async function fetchHistory(){
    try{
      setIsLoading(true);
      const response = await api.get('/history');
      setExercises(response.data)

    }catch(error){
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o hostórico.'
      
            toast.show({
              placement: 'top',
              render: () => (
                <Toast bgColor='$red500'>
                  <ToastTitle>{title}</ToastTitle>
                </Toast>
              )
            })
    }finally{
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory();
  },[]))

  return(
      <VStack flex={1}>
        <ScreenHeader title="Histórico" />

        <SectionList 
          sections={exercises} 
          keyExtractor={item => item.id} 
          renderItem={({ item }) => (
            <HistoryCard 
            data={item}
          />
        )}
          renderSectionHeader={({ section }) => (
            <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3" fontFamily="$heading">{section.title}</Heading>
          )}
          style={{ paddingHorizontal: 32}}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center"}
          }
          ListEmptyComponent={() => (
            <Text color="$gray100" textAlign="center">
              Não há exercicios registrados ainda. {"\n"}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
        
      </VStack>
    )

}