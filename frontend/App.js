import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import TelaInicial from "./screens/TelaInicial";
import TelaRead from "./screens/TelaRead";
import TelaCreate from "./screens/TelaCreate";
import TelaUpdate from "./screens/TelaUpdate";
import TelaDelete from "./screens/TelaDelete";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="TelaInicial"
          component={TelaInicial}
          options={{ title: "Tela Inicial" }}
        />
        <Drawer.Screen
          name="TelaRead"
          component={TelaRead}
          options={{ title: "Método Read" }}
        />
        <Drawer.Screen
          name="TelaCreate"
          component={TelaCreate}
          options={{ title: "Método Create" }}
        />
        <Drawer.Screen
          name="TelaUpdate"
          component={TelaUpdate}
          options={{ title: "Método Update" }}
        />
        <Drawer.Screen
          name="TelaDelete"
          component={TelaDelete}
          options={{ title: "Método Delete" }}
         />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
