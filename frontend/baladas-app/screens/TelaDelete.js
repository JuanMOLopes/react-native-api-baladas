import React, { useState } from "react";

import {
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, // Mostra um círculo de carregando
} from "react-native";

// Importa o endereço do servidor
import API_URL from "../API_URL";

export default function TelaDelete() {
  // Variável para guardar o ID digitado
  const [id, setId] = useState("");
  // Variável para mostrar se está carregando
  const [carregando, setCarregando] = useState(false);
  // Variável para mostrar mensagens de erro
  const [erro, setErro] = useState("");

  // Função que envia o pedido de deletar para o servidor
  const deletarBalada = async () => {
    // Se o campo de digitar id estiver vazio (usuario nao digitou nada), mostra aviso
    if (!id) {
      Alert.alert("Erro", "Por favor, insira um ID válido.");
      return;
    }

    try {
      setCarregando(true); // Mostra círculo de carregando

      // Envia o pedido de deletar a balada que possui o ID digitado para o servidor
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE", // Diz que é para deletar
      });

      if (resposta.ok) {
        // Se deu certo, mostra mensagem de sucesso
        Alert.alert("Sucesso", "Balada deletada com sucesso!");
        setId(""); // Limpa o campo
      } else {
        // Se deu erro, mostra mensagem de erro
        Alert.alert("Erro", "Balada não encontrada ou erro ao deletar.");
      }
    } catch (error) {
      // Se deu erro na conexão, mostra mensagem de erro
      setErro(`Erro ao deletar balada: ${error.message}`);
    } finally {
      setCarregando(false); // Para de mostrar círculo de carregando
    }
  };

  // Se tiver erro, mostra na tela
  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar Balada</Text>

      {/* Campo para digitar o ID da balada */}
      <TextInput
        style={styles.input}
        placeholder="Digite o ID da balada"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />

      {/* Se estiver carregando, mostra círculo. Se não, mostra botão */}
      {carregando ? (
        <ActivityIndicator size="large" color="#353839" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={deletarBalada}>
          <Text style={styles.buttonText}>Deletar Balada</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#353839",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#353839",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
