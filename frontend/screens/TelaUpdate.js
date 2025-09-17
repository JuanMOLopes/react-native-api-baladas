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

import API_URL from "../API_URL";

export default function TelaUpdate() {
  const [id, setId] = useState("");
  const [cidade, setCidade] = useState("");
  const [data, setData] = useState("");
  const [tipoDeBalada, setTipoDeBalada] = useState("");
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const atualizarBalada = async () => {
    if (!id || !cidade || !data || !tipoDeBalada || !nome) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cidade, data, tipoDeBalada, nome }),
      });

      if (resposta.ok) {
        Alert.alert("Sucesso", "Balada atualizada com sucesso!");
        setId("");
        setCidade("");
        setData("");
        setTipoDeBalada("");
        setNome("");
      } else {
        Alert.alert("Erro", "Balada não encontrada ou erro ao atualizar.");
      }
    } catch (error) {
      setErro(`Erro ao atualizar balada: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Balada</Text>

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
