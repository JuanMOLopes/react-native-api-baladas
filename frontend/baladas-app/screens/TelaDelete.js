import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import API_URL from "../API_URL"; // Importa a URL base da API

export default function TelaDelete() {
  // Estados para armazenar o ID digitado, status de carregamento e possíveis erros
  const [id, setId] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Função assíncrona que realiza a exclusão do cliente na API
  const deletarCliente = async () => {
    // Verifica se o ID foi preenchido, senão mostra alerta
    if (!id) {
      Alert.alert("Erro", "Por favor, insira um ID válido.");
      return;
    }

    try {
      setCarregando(true); // Ativa o indicador de carregamento

      // Faz a requisição DELETE para a API, passando o ID no final da URL
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      // Se a resposta da API for positiva, mostra alerta de sucesso
      if (resposta.ok) {
        Alert.alert("Sucesso", "Cliente deletado com sucesso!");
        setId(""); // Limpa o campo de ID após deletar
      } else {
        // Caso contrário, alerta que o cliente não foi encontrado ou ocorreu erro
        Alert.alert("Erro", "Cliente não encontrado ou erro ao deletar.");
      }
    } catch (error) {
      // Se ocorrer algum erro inesperado (ex: servidor fora do ar), salva no estado
      setErro(`Erro ao deletar cliente: ${error.message}`);
    } finally {
      setCarregando(false); // Desativa o indicador de carregamento
    }
  };

  // Se houver erro armazenado, mostra ele diretamente na tela
  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar Cliente</Text>

      {/* Campo para o usuário digitar o ID do cliente */}
      <TextInput
        style={styles.input}
        placeholder="Digite o ID do cliente"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />

      {/* Se estiver carregando, mostra um spinner. Caso contrário, mostra o botão */}
      {carregando ? (
        <ActivityIndicator size="large" color="#353839" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={deletarCliente}>
          <Text style={styles.buttonText}>Deletar Cliente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Estilos da tela
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