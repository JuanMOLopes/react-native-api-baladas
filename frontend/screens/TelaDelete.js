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

export default function TelaDelete() {
  const [id, setId] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const deletarCliente = async () => {
    if (!id) {
      Alert.alert("Erro", "Por favor, insira um ID válido.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        Alert.alert("Sucesso", "Cliente deletado com sucesso!");
        setId("");
      } else {
        Alert.alert("Erro", "Cliente não encontrado ou erro ao deletar.");
      }
    } catch (error) {
      setErro(`Erro ao deletar cliente: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o ID do cliente"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />

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
