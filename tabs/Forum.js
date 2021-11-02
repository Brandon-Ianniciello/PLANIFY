import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView,SafeAreaView, Image } from 'react-native';

const forum = () => {
  return (
    <ScrollView style={{ backgroundColor: "#5cdb95"}}>
        <View style={{
          backgroundColor: "#5cdb95", height: "7%", borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20, paddingHorizontal: 20
        }}>
          <Image
            source={require('../assets/1.png')}
            style={{
              height: 10,
              width: 20,
              marginTop: 50
            }}
          />
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            width: "100%"
          }}>
            <View style={{ width: "50%", backgroundColor: "#5cdb95" }}>
              <Text style={{
                fontSize: 28,
                color: "#edf5e1",
                fontWeight: "bold"
              }}>Bienvenue sur le forum de Planify</Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Image
                source={require('../assets/CalendarV3.png')}
                style={{ height: 60, width: 60 }}
              />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "#fff" }}>
          {/* <FlatList>
          </FlatList> */}
        </View>
    </ScrollView>
  )
}

export default forum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});