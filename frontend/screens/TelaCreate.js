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

import API_URL from "../API_URL";

export default function TelaCreate() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const criarCliente = async () => {
    if (!nome || !cpf || !email || !telefone) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf, email, telefone }),
      });

      if (resposta.ok) {
        Alert.alert("Sucesso", "Cliente criado com sucesso!");
        setNome("");
        setCpf("");
        setEmail("");
        setTelefone("");
      } else {
        Alert.alert("Erro", "Erro ao criar o cliente.");
      }
    } catch (error) {
      setErro(`Erro ao criar cliente: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Novo Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#353839" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={criarCliente}>
          <Text style={styles.buttonText}>Criar Cliente</Text>
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

