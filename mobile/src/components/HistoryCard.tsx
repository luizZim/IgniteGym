import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

import { HistoryDTO } from "@dtos/HistoryDTO";


type Props = {
  data: HistoryDTO;
}


export function HistoryCard({ data }: Props){
  return(
    <HStack 
      w="$full"
      px="$5" 
      py="$4" 
      mb="$3" 
      bg="$gray600" 
      rounded="$md" 
      alignItems="center" 
      justifyContent="space-between"
      >
      <VStack flex={1} mr="$5">
        <Heading 
          color="$white" 
          fontFamily="$heading" 
          fontSize="$md" 
          textTransform="capitalize" 
          numberOfLines={1}
        >
          {data.group}
        </Heading>

        <Text color="$gray100" fontSize="$lg" numberOfLines={1}>{data.name}</Text>
      </VStack>

      <Text color="$gray300" fontSize="$md">{data.hour}</Text>
    </HStack>
  )
}