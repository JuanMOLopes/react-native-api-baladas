import React from "react";

// Importa o sistema de navegação entre telas
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importa as telas do aplicativo
import TelaInicial from "./screens/TelaInicial";
import TelaRead from "./screens/TelaRead";
import TelaCreate from "./screens/TelaCreate";
import TelaUpdate from "./screens/TelaUpdate";
import TelaDelete from "./screens/TelaDelete";

// Cria o menu lateral para navegar entre as telas
const Drawer = createDrawerNavigator();

// Função principal do aplicativo
export default function App() {
  return (
    // NavigationContainer cuida da navegação entre as telas
    <NavigationContainer>
      {/* Drawer.Navigator cria o menu lateral */}
      <Drawer.Navigator>
        {/* Cada Drawer.Screen é uma opção no menu lateral */}
        <Drawer.Screen
          name="TelaInicial"
          component={TelaInicial}
          options={{ title: "Tela Inicial" }} // Nome que aparece no menu
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
