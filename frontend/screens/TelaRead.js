import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";

import API_URL from "../API_URL";

export default function TelaRead() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [id, setId] = useState("");
  const [clienteDesejado, setClienteDesejado] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const procurarClientes = async () => {
    try {
      const resposta = await fetch(API_URL);
      const dados = await resposta.json();
      setClientes(dados);
    } catch (error) {
      setErro(`Erro ao buscar clientes: ${error.message}`);
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    procurarClientes();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    procurarClientes();
  }, []);

  const buscarClientePorId = async () => {
    if (!id) {
      Alert.alert("Erro", "Por favor, insira um ID válido.");
      return;
    }

    try {
      setCarregando(true);
      const resposta = await fetch(`${API_URL}/${id}`);
      const dados = await resposta.json();

      if (resposta.ok) {
        setClienteDesejado(dados);
      } else {
        Alert.alert("Erro", "Cliente não encontrado.");
      }
    } catch (error) {
      setErro(`Erro ao buscar cliente: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return <ActivityIndicator size="large" color="#353839" />;
  }

  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>ID: {item.id}</Text>
            <Text style={styles.cardText}>Nome: {item.nome}</Text>
            <Text style={styles.cardText}>CPF: {item.cpf}</Text>
            <Text style={styles.cardText}>Email: {item.email}</Text>
            <Text style={styles.cardText}>Telefone: {item.telefone}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <ScrollView>
        <Text style={styles.subtitle}>Buscar Cliente por ID</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o ID do cliente"
          value={id}
          onChangeText={setId}
        />

        <TouchableOpacity style={styles.button} onPress={buscarClientePorId}>
          <Text style={styles.buttonText}>Buscar Cliente</Text>
        </TouchableOpacity>

        {clienteDesejado && (
          <View style={styles.card}>
            <Text style={styles.cardText}>ID: {clienteDesejado.id}</Text>
            <Text style={styles.cardText}>Nome: {clienteDesejado.nome}</Text>
            <Text style={styles.cardText}>CPF: {clienteDesejado.cpf}</Text>
            <Text style={styles.cardText}>Email: {clienteDesejado.email}</Text>
            <Text style={styles.cardText}>
              Telefone: {clienteDesejado.telefone}
            </Text>
          </View>
        )}
      </ScrollView>
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
    marginTop: 16,
    marginBottom: 8,
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  cardText: {
    fontSize: 16,
    color: "#353839",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
