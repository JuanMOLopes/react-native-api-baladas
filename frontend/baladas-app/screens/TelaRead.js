import React, { useState, useEffect, useCallback } from "react";

import {
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, // Círculo de carregando
  TextInput, 
  TouchableOpacity,
  StyleSheet, 
  Alert, 
  ScrollView,
  RefreshControl, // Atualiza a lista puxando para baixo
} from "react-native";

// Importa o endereço do servidor
import API_URL from "../API_URL";

export default function TelaRead() {
  // Variáveis para guardar dados e controlar a tela
  const [baladas, setBaladas] = useState([]); // Lista de todas as baladas
  const [carregando, setCarregando] = useState(true); // Mostra círculo de carregando
  const [erro, setErro] = useState(""); // Mensagem de erro
  const [cidade, setCidade] = useState(""); // Cidade digitada
  const [data, setData] = useState(""); // Data digitada
  const [baladaDesejada, setBaladaDesejada] = useState(null); // Resultado da busca por cidade ou data
  const [refreshing, setRefreshing] = useState(false); // Atualização da lista

  // Função para buscar todas as baladas
  const procurarBaladas = async () => {
    try {
      // Busca as baladas no servidor
      const resposta = await fetch(API_URL);
      // Converte a lista de baladas que vem do servidor para JSON
      const dados = await resposta.json();
      setBaladas(dados); // Salva as baladas na variável
    } catch (error) {
      setErro(`Erro ao buscar baladas: ${error.message}`); // Mostra erro se der problema
    } finally {
      setCarregando(false); // Para de mostrar círculo de carregando
      setRefreshing(false); // Para de atualizar a lista
    }
  };

  // Carrega as baladas quando a tela abre
  useEffect(() => {
    procurarBaladas();
  }, []);

  // Função para atualizar a lista puxando para baixo
  const onRefresh = useCallback(() => {
    // Inicia o carregamento
    setRefreshing(true);
    // Procura novamente todas as baladas
    procurarBaladas();
  }, []);

  // Função para buscar balada por cidade
  const buscarBaladaPorCidade = async () => {
    // Se o campo de cidade estiver vazio, mostra aviso
    if (!cidade) {
      Alert.alert("Erro", "Por favor, digite uma cidade.");
      return;
    }

    try {
      setCarregando(true);
      // Busca balada no servidor pela cidade
      const resposta = await fetch(`${API_URL}/cidade/${cidade}`);
      const dados = await resposta.json();

      // Se deu certo, coloca o resultado na variável
      if (resposta.ok) {
        setBaladaDesejada(dados);
      } else {
        // Se não encontrou, mostra aviso
        Alert.alert("Erro", "Balada não encontrada.");
      }
    } catch (error) {
      // Se deu erro na conexão, mostra mensagem
      setErro(`Erro ao buscar balada: ${error.message}`);
    } finally {
      // Para de mostrar círculo de carregando independente do que aconteceu (deu certo ou erro)
      setCarregando(false);
    }
  };

  // Função para buscar balada por data
  const buscarBaladaPorData = async () => {
    // Se o campo de data estiver vazio, mostra aviso
    if (!data) {
      Alert.alert("Erro", "Por favor, digite uma data.");
      return;
    }

    try {
      setCarregando(true);
      // Busca balada no servidor pela data
      const resposta = await fetch(`${API_URL}/data/${data}`);
      const dados = await resposta.json();

      // Se deu certo, coloca o resultado na variável
      if (resposta.ok) {
        setBaladaDesejada(dados);
      } else {
        // Se não encontrou, mostra aviso
        Alert.alert("Erro", "Balada não encontrada.");
      }
    } catch (error) {
      // Se deu erro na conexão, mostra mensagem
      setErro(`Erro ao buscar balada: ${error.message}`);
    } finally {
      // Para de mostrar círculo de carregando independente do que aconteceu (deu certo ou erro)
      setCarregando(false);
    }
  };

  // Se estiver carregando, mostra círculo
  if (carregando) {
    return <ActivityIndicator size="large" color="#353839" />;
  }

  // Se tiver erro, mostra mensagem
  if (erro) {
    return <Text style={styles.error}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Baladas</Text>

      {/* Lista de baladas */}
      <FlatList
        data={baladas} // Lista de baladas
        keyExtractor={(item) => item.id.toString()} // Chave única para evitar duplicatas
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>ID: {item.id}</Text>
            <Text style={styles.cardText}>Nome: {item.nome}</Text>
            <Text style={styles.cardText}>Cidade: {item.cidade}</Text>
            <Text style={styles.cardText}>
              Tipo de Balada: {item.tipoDeBalada}
            </Text>
            <Text style={styles.cardText}>Data: {item.data}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        //Caso não tenha baladas no banco de dados, mostra mensagem
        ListEmptyComponent={
          
          <Text style={styles.emptyText}>Nenhuma balada encontrada</Text>
        }
      />

      {/* Área de busca */}
      <ScrollView
        contentContainerStyle={styles.searchContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Busca por cidade */}
        <Text style={styles.subtitle}>Buscar Balada por Cidade</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Digite a cidade"
            value={cidade}
            onChangeText={setCidade}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={buscarBaladaPorCidade}
          >
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Busca por data */}
        <Text style={styles.subtitle}>Buscar Balada por Data</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Digite a data"
            value={data}
            onChangeText={setData}
          />
          <TouchableOpacity style={styles.button} onPress={buscarBaladaPorData}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Se encontrou alguma balada com as informações desejadas, mostra os resultados */}
        {baladaDesejada &&
          baladaDesejada.map((item) => (
            <View style={styles.card} key={item.id}>
              <Text style={styles.cardText}>ID: {item.id}</Text>
              <Text style={styles.cardText}>Nome: {item.nome}</Text>
              <Text style={styles.cardText}>Cidade: {item.cidade}</Text>
              <Text style={styles.cardText}>
                Tipo de Balada: {item.tipoDeBalada}
              </Text>
              <Text style={styles.cardText}>Data: {item.data}</Text>
            </View>
          ))}
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
