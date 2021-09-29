import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const PartyScreen = () => {
    return (
        <View style={styles.container}>
            <Text>
                PARTYS, RAMÈNE LA BIÈRE ESTI
            </Text>
            <FlatList>

            </FlatList>

            {/* <FlatList data={truckList} extraData={initialState}
          keyExtractor={item => item.id} renderItem={({ item }) => {
            return (
              <SearchDisplay data={item} action={() => {
                fetchTruckId(item['id'], navigation); Update()
              }} />
            )
          }}>
        </FlatList> */}
        </View>
    )
}

export default PartyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});