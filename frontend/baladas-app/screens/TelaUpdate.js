import React, { useState } from "react";

import {
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  Alert, 
  ActivityIndicator, // Mostra círculo de carregando
  StyleSheet, 
} from "react-native";

// Importa o endereço do servidor
import API_URL from "../API_URL";

export default function TelaUpdate() {
  // Variáveis para guardar o que o usuário digita
  const [id, setId] = useState(""); 
  const [cidade, setCidade] = useState(""); 
  const [data, setData] = useState(""); 
  const [tipoDeBalada, setTipoDeBalada] = useState(""); 
  const [nome, setNome] = useState(""); 
  // Variável para mostrar se está carregando
  const [carregando, setCarregando] = useState(false);
  // Variável para mostrar mensagens de erro
  const [erro, setErro] = useState("");

  // Função que envia os dados atualizados para o servidor
  const atualizarBalada = async () => {
    // Se algum campo estiver vazio, mostra aviso
    if (!id || !cidade || !data || !tipoDeBalada || !nome) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      setCarregando(true); // Mostra círculo de carregando

      // Envia os dados para o servidor
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT", // Diz que é para atualizar
        headers: {
          "Content-Type": "application/json", // Diz que está enviando texto
        },
        body: JSON.stringify({ cidade, data, tipoDeBalada, nome }), // Dados que vão ser enviados
      });

      if (resposta.ok) {
        // Se deu certo, mostra mensagem de sucesso
        Alert.alert("Sucesso", "Balada atualizada com sucesso!");
        // Limpa os campos
        setId("");
        setCidade("");
        setData("");
        setTipoDeBalada("");
        setNome("");
      } else {
        // Se deu erro, mostra mensagem de erro
        Alert.alert("Erro", "Balada não encontrada ou erro ao atualizar.");
      }
    } catch (error) {
      // Se deu erro na conexão, mostra mensagem
      setErro(`Erro ao atualizar balada: ${error.message}`);
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
      <Text style={styles.title}>Atualizar Balada</Text>

      {/* Campos para digitar as informações que quero atualizar da balada */}
      <TextInput
        style={styles.input}
        placeholder="ID da Balada"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />

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
        <TouchableOpacity style={styles.button} onPress={atualizarBalada}>
          <Text style={styles.buttonText}>Atualizar Balada</Text>
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
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#353839",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
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
