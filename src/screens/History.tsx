import { useState } from "react";
import { SectionList } from "react-native";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

import { Heading, Text, VStack } from "@gluestack-ui/themed";



export function History(){
  const [exercises, setExercises ] = useState([
    {
      title: "28.08.2024",
      data: ["Puxada Frontal", "Remada unilateral"]
    },
    {
      title: "27.08.2024",
      data: ["Puxada Frontal"]
    },
  ])
  return(
      <VStack flex={1}>
        <ScreenHeader title="Histórico" />

        <SectionList 
          sections={exercises} 
          keyExtractor={item => item} 
          renderItem={() => <HistoryCard /> }
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