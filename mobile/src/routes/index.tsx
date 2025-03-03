import React from "react"
import { useContext } from "react"

import { NavigationContainer, DefaultTheme } from "@react-navigation/native"

import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes"

import { useAuth } from "@hooks/useAuth"


import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { Box, useTheme } from "@gluestack-ui/themed"
import { Loading } from "@components/Loading"


export function Routes() {
  const { colors } = useTheme();

  const { user, isLoadingUserStorageData } = useAuth();

  console.log("USUÁRIO LOGADO =>", user)

  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700;

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}