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
  const [baladas, setBaladas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [cidade, setCidade] = useState("");
  const [data, setData] = useState("");
  const [baladaDesejada, setBaladaDesejada] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const procurarBaladas = async () => {
    try {
      // Tenta obter alguma resposta da API
      const resposta = await fetch(API_URL);
      // Transforma a resposta da API em JSON
      const dados = await resposta.json();
      // Coloca essa resposta no estado baladas
      setBaladas(dados);
    } catch (error) {
      // Em caso de erro, coloca a mensagem no estado erro
      setErro(`Erro ao buscar baladas: ${error.message}`);
    } finally {
      // Seja qual for o resultado (deu certo ou deu errado), para o carregamento e para a atualização da lista
      setCarregando(false);
      setRefreshing(false);
    }
  };

  // useEffect para carregar as baladas quando o componente for montado
  useEffect(() => {
    // Chama a função para procurar baladas
    procurarBaladas();
  }, []);

  const onRefresh = useCallback(() => {
    // Refreshing é o indicador de carregamento
    setRefreshing(true);
    // Procura as baladas novamente
    procurarBaladas();
  }, []);

  // Procurar balada por cidade
  const buscarBaladaPorCidade = async () => {
    // Verifica se o campo cidade está vazio
    if (!cidade) {
      // Mostra um alerta se estiver vazio
      Alert.alert("Erro", "Por favor, digite uma cidade.");
      return;
    }

    try {
      setCarregando(true);
      // Faz a requisição para a API com a cidade informada
      const resposta = await fetch(`${API_URL}/cidade/${cidade}`);
      const dados = await resposta.json();

      // Se a resposta for OK, atualiza o estado baladaDesejada com os dados retornados
      if (resposta.ok) {
        setBaladaDesejada(dados);
      } else {
        Alert.alert("Erro", "Balada não encontrada.");
      }
    } catch (error) {
      // Em caso de erro, atualiza o estado erro com a mensagem
      setErro(`Erro ao buscar balada: ${error.message}`);
    } finally {
      // Em caso de deu certo ou deu erro, para o carregamento
      setCarregando(false);
    }
  };

  // Procurar balada por data
  const buscarBaladaPorData = async () => {
    if (!data) {
      Alert.alert("Erro", "Por favor, digite uma data.");
      return;
    }

    try {
      setCarregando(true);
      const resposta = await fetch(`${API_URL}/data/${data}`);
      const dados = await resposta.json();

      if (resposta.ok) {
        setBaladaDesejada(dados);
      } else {
        Alert.alert("Erro", "Balada não encontrada.");
      }
    } catch (error) {
      setErro(`Erro ao buscar balada: ${error.message}`);
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
      <Text style={styles.title}>Lista de Baladas</Text>

      {/* Lista de baladas */}
      <FlatList
        // Usa a lista de baladas do estado
        data={baladas}
        // Chave única para cada item
        keyExtractor={(item) => item.id.toString()}
        // Renderiza cada item da lista
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
        // Se nao tiver nada no banco de dados, mostra essa mensagem
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma balada encontrada</Text>
        }
      />

      {/* Área de busca */}
      <ScrollView
        contentContainerStyle={styles.searchContainer}
        showsVerticalScrollIndicator={false}
      >
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

        {/* Resultados da busca */}
        {/* Exibe todas as baladas correspondentes a busca para o usuário (se for encontrada) */}
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
