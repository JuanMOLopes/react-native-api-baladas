import React from "react";
// Importa o container de navegação para gerenciar as rotas
import { NavigationContainer } from "@react-navigation/native";
// Importa o drawer navigator para criar o menu lateral
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importa as telas do aplicativo
import TelaInicial from "./screens/TelaInicial";
import TelaRead from "./screens/TelaRead";
import TelaCreate from "./screens/TelaCreate";
import TelaUpdate from "./screens/TelaUpdate";
import TelaDelete from "./screens/TelaDelete";

// Cria o objeto do drawer navigator
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    // NavigationContainer envolve toda a navegação do app
    <NavigationContainer>
      {/* Drawer.Navigator define o menu lateral e suas telas */}
      <Drawer.Navigator>

        {/* Tela inicial do app */}
        <Drawer.Screen
          name="TelaInicial"  //nome da tela
          component={TelaInicial} //tela em si
          options={{ title: "Tela Inicial" }} //título exibido no menu  
        />


        {/* Tela para listar baladas (Read) */}
        <Drawer.Screen
          name="TelaRead"
          component={TelaRead}
          options={{ title: "Método Read" }}
        />


        {/* Tela para criar balada (Create) */}
        <Drawer.Screen
          name="TelaCreate"
          component={TelaCreate}
          options={{ title: "Método Create" }}
        />



        {/* Tela para atualizar balada (Update) */}
        <Drawer.Screen
          name="TelaUpdate"
          component={TelaUpdate}
          options={{ title: "Método Update" }}
        />



        {/* Tela para deletar balada (Delete) */}
        <Drawer.Screen
          name="TelaDelete"
          component={TelaDelete}
          options={{ title: "Método Delete" }}
         />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}