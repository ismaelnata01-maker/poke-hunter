import CameraButton from '@/components/CameraButton';
import { getPokemonList, Pokemon } from '@/services/pokeapi';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PokedexScreen() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [offset, setOffSet] = useState(0);

  const LIMIT = 20;

  async function loadPokemonList() {
    getPokemonList(LIMIT).then((response) => {
      setPokemonList(response.pokemonList);
      setHasNextPage(response.hasNextPage);
      setOffSet(response.pokemonList.length);
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style={"light"}/>

      <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokedex</Text>
      </View>
      
        <CameraButton/>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#1a1a1a",
  },
  header:{
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 18,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#2f2f2f",
  },
  title:{
    fontSize:30,
    fontWeight: "bold",
    color:"white",
  },
  main:{
    height: "100%",
    backgroundColor:"#696969"
  }
});
