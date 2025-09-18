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

export default function TelaCreate() {
  // Variáveis para guardar o que o usuário digita
  const [cidade, setCidade] = useState("");
  const [data, setData] = useState("");
  const [tipoDeBalada, setTipoDeBalada] = useState("");
  const [nome, setNome] = useState("");
  // Variável para mostrar se está carregando
  const [carregando, setCarregando] = useState(false);
  // Variável para mostrar mensagens de erro
  const [erro, setErro] = useState("");

  // Função que envia os dados para o servidor
  const criarBalada = async () => {
    // Se algum campo estiver vazio, mostra aviso
    if (!nome || !cidade || !data || !tipoDeBalada) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      setCarregando(true); // Mostra círculo de carregando

      // Envia os dados para o servidor
      const resposta = await fetch(API_URL, {
        method: "POST", // Diz que é para criar
        headers: {
          "Content-Type": "application/json", // Diz que está enviando texto
        },
        body: JSON.stringify({ cidade, data, tipoDeBalada, nome }), // Dados que vão ser enviados
      });

      if (resposta.ok) {
        // Se deu certo, mostra mensagem de sucesso
        Alert.alert("Sucesso", "Balada criada com sucesso!");
        // Limpa os campos
        setCidade("");
        setData("");
        setTipoDeBalada("");
        setNome("");
      } else {
        // Se deu erro, mostra mensagem de erro
        Alert.alert("Erro", "Erro ao criar a balada.");
      }
    } catch (error) {
      // Se deu erro na conexão, mostra mensagem
      setErro(`Erro ao criar balada: ${error.message}`);
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
      <Text style={styles.title}>Criar Nova Balada</Text>

      {/* Campos para digitar as informações da balada */}
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo de Balada"
        value={tipoDeBalada}
        onChangeText={setTipoDeBalada}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      {/* Se estiver carregando, mostra círculo. Se não, mostra botão */}
      {carregando ? (
        <ActivityIndicator size="large" color="#353839" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={criarBalada}>
          <Text style={styles.buttonText}>Criar Balada</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#353839",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#353839",
    marginTop: 20,
    marginBottom: 8,
  },
  searchContainer: {
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 8,
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 2, // sombra leve no Android
    shadowColor: "#000", // sombra leve no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    color: "#353839",
    marginBottom: 4,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

