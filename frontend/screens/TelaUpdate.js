import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

// Importa a URL da API de um arquivo separado
import API_URL from "../API_URL";

export default function TelaUpdate() {
  // Estados para armazenar os valores dos campos do formulário
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Função para atualizar um cliente
  const atualizarCliente = async () => {
    // Se o ID não for fornecido ou nenhum campo para atualizar, mostra um alerta
    if (!id || (!nome && !cpf && !email && !telefone)) {
      Alert.alert(
        "Erro",
        "Por favor, insira o ID e pelo menos um campo para atualizar."
      );
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf, email, telefone }),
      });

      if (resposta.ok) {
        Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
        setId("");
        setNome("");
        setCpf("");
        setEmail("");
        setTelefone("");
      } else {
        Alert.alert("Erro", "Cliente não encontrado ou erro ao atualizar.");
      }
    } catch (error) {
      setErro(`Erro ao atualizar cliente: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  // Se houver um erro, mostra a mensagem de erro
  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="ID do Cliente"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome (opcional)"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF (opcional)"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email (opcional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone (opcional)"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#353839" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={atualizarCliente}>
          <Text style={styles.buttonText}>Atualizar Cliente</Text>
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
