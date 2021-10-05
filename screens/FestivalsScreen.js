import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';

import * as firebase from 'firebase';

const FestivalsScreen = () => {
  //Création de la base de données
  const db = firebase.firestore();
  const [festivals, setFestivals] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  /*--aller chercher tout les festivals--*/
  const getFestivals = async () => {
    const response = db.collection('Festivals');
    const data = await response.get();
    setIsFetching(true)
    data.docs.forEach(item => {
      setFestivals([...festivals, item.data()])
      setIsFetching(true)
    })
    setIsFetching(false)
  }

  useEffect(() => {
    setFestivals(null)
    getFestivals()
  }, []);

  if (!isFetching) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ActivityIndicator animating={isFetching} />
          <View style={styles.listeFestivals}>

            <FlatList
              data={festivals}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text>{item.id.toString()}. {item.nom} en {item.ville}</Text>
                  </View>
                )
              }
              }
            >
            </FlatList>
          </View>
        </View>
      </ScrollView>
    )
  }
  else if (isFetching || festivals == undefined) {
    return (
      <View style={styles.container}>
        <Text>
          AUCUN FESTIVALS TROUVÉS
        </Text>
      </View>
    )
  }
}


export default FestivalsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listeFestivals: {
    flexDirection: "column"
  }
});