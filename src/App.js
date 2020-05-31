import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`);

    setRepositories(
      repositories.map((repo) => {
        if (repo.id === id) return response.data;
        return repo;
      })
    );
  }

  async function getRepositories() {
    const response = await api.get("/repositories");

    setRepositories(response.data);
  }

  useEffect(() => {
    getRepositories();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repositories.map(({ title, techs, id, likes }) => (
          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{title}</Text>

            {techs.map((tech) => (
              <View style={styles.techsContainer}>
                <Text style={styles.tech}>{tech}</Text>
              </View>
            ))}
            <View style={styles.likesContainer}>
              <Text style={styles.likeText} testID={`repository-likes-${id}`}>
                {likes} {likes !== 1 ? "curtidas" : "curtida"}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(id)}
              testID={`like-button-${id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
