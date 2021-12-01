import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import PlanifyIndicator from '../components/PlanifyIndicator';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

const calendrier = ({ route, navigation }) => {

  /*-------------------constantes et variables-----------------*/
  const today = new Date().toISOString().split('T')[0]

  const _format = 'YYYY-MM-DD'

  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre",
    "Octobre", "Novembre", "Décembre"];

  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  const db = firebase.firestore();

  const [calendrier, setCalendrier] = useState([])
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null)
  const [items, setItems] = useState({})

  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState()
  /*-------------------FONCTIONS-------------------*/


  const getUserInfo = async () => {
    const db = firebase.firestore();
    const ref = db.collection("users").doc(user.uid);

    ref.get().then((doc) => {
      setUserInfo(doc.data())
    })
  }

  function addEventInCalendar(event, date) {
    date = date.toISOString().split('T')[0]
    try {
      db.collection('Calendrier').doc(event.nom).set({
        event: event,
        date: date,
        user: userInfo
      })
      console.log(event.nom, " ajouté dans le calendrier")
      return
    } catch (e) {
      console.log("ERREUR DANS L'AJOUT D'UN EVENT DANS LE CALENDRIER:", e)
    }

  }

  const deleteFromCalendar = async (event) => {
    try {
      await db.collection("Calendrier").doc(event.nom).delete();
      alert(`${event.nom} supprimé`)
    } catch (e) {
      console.log("Erreur dans la suppresion de ", event.nom, ":", e)
    }
  }

  /*--POUR ALLÉ CHERCHER LES ÉVÈNEMENTS DÉJÀ AJOUTÉ AU CALENDRIER */
  const getEventsFromCalendar = async () => {
    setCalendrier(null)
    const response = db.collection('Calendrier');
    const data = await response.get();

    let Calendrier = []

    data.docs.forEach(item => {
      // à faire avec le id wesh
      if (item.data().user != undefined) {
        if (item.data().user.id == user.uid) {
          Calendrier.push(item.data())
        }
      }
    })

    setCalendrier(Calendrier)
  }

  const AddToAgenda = ({ item }) => {
    let nom = "évènement"
    if (edit != null && route.params == null) {
      item = edit.event
      nom = item.nom
    }
    nom = item.nom
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '80%', backgroundColor: 'white', height: '40%', shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.29, shadowRadius: 14.65, elevation: 22 }}>
          <View style={{ alignItems: 'flex-start', borderBottomColor: '#dcdcdc', borderBottomWidth: 1, paddingLeft: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Ajouter un évènement</Text>
            <Text>{nom}</Text>
          </View>
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={{ color: 'gray' }}>Date & temps</Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 5 }}>
            <View style={{ width: '95%', backgroundColor: '#dcdcdc', height: 35, borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={showDatepicker}>
                <Text style={{ fontWeight: '550' }}>{days[date.getDay()]}, {date.getDate()} {months[date.getUTCMonth()]} {date.getFullYear()}</Text>
              </TouchableOpacity>
              <Icon name="calendar-blank-outline" size={20} style={{}} />
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: 5 }}>
            <View style={{ width: '95%', backgroundColor: '#dcdcdc', height: 35, borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={showTimepicker}>
                <Text style={{ fontWeight: '500' }}>{date.getHours()}:{date.getMinutes()}</Text>
              </TouchableOpacity>
              <Icon name="clock-time-eight-outline" size={20} style={{}} />
            </View>
          </View>
          <View>
            {show && (
              <DateTimePicker
                minimumDate={new Date()}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', margin: 10 }}>
            <TouchableOpacity
              style={{ height: 50, backgroundColor: '#05386b', width: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}
              onPress={() => { addEventInCalendar(item, date); item = null; navigation.navigate("Calendrier"), getEventsFromCalendar() }}>
              <Text style={{ color: '#fff' }}>
                Ajouter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ height: 50, backgroundColor: '#dcdcdc', width: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 2, marginLeft: 5 }}
              onPress={() => { item = null; navigation.navigate("Calendrier") }}>
              <Text>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  const renderItem = (i) => {
    let compteur = 1
    let item = i.item
    return (
      <ScrollView style={styles.item}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titre}>
              {compteur++}.{item.event.nom}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>
              {item.event.Description}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>
              Planifié le {item.date}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.bouton} onPress={() => deleteFromCalendar(item.event)}>
              <Text>Supprimer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bouton} onPress={() => { setEdit(item) }}>
              <Text>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
  const AgendaPlanify = () => {
    return (
      <View>
       
        <View style={{height:400}}>
          <Agenda
            selected={new Date()}
            //minDate={new Date()}
            //showClosingKnob={false}
            onRefresh={() => console.log('refreshing...')}
            // Set this true while waiting for new data from a refresh
            //refreshing={false} rajouter un bouton pour refresh l'agenda

            items={items}
            //loadItemsForMonth={loadItems()}
            renderItem={renderItem}

            style={{
              // backgroundColor:'green'
            }}
          />
        </View>

        <ScrollView style={{height:50}}>
          <Text style={styles.titre}>Dans le calendrier:</Text>
          <TouchableOpacity onPress={()=>getEventsFromCalendar()}>
            <Text>refresh</Text>
          </TouchableOpacity>
          <FlatList
            data={calendrier}
            renderItem={({ item }) => {
              return (
                <View style={styles.item}>
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titre}>
                      {item.event.nom}, planifié le {item.date}
                    </Text>
                  </View>
                  
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.bouton} onPress={() => deleteFromCalendar(item.event)}>
                      <Text>Supprimer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bouton} onPress={() => { setEdit(item) }}>
                      <Text>Modifier</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                </View>
              )
            }}
          />
        </ScrollView>

      </View>

    )
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  const loadItems = () => {
    calendrier.forEach(item => {
      const t = timeToString(item.date)
      if (!items[t]) {
        items[t] = [];
        items[t].push(
          {
            item: item,
            height: Math.max(50, Math.floor(Math.random() * 150))
          }
        )
      }
    })
    const newItems = {}
    Object.keys(items).forEach(key => {
      newItems[key] = items[key]
    });
    setItems(newItems)
  }

  useEffect(() => {
    getUserInfo()
    getEventsFromCalendar()
  }, []);

  /*----------------AFFICHAGE------------------*/
  /* AJOUT D'UN EVENT DANS LE CALENDRIER */
  if (route.params != undefined) {
    let item = route.params.event
    return (<AddToAgenda item={item} />)
  }
  if (edit != null) {
    return (<AddToAgenda item={edit} />)
  }
  if (calendrier != undefined || calendrier != null)
    /* AFFICHAGE DE TOUT LES ÉVÈNEMENTS */
    return (<AgendaPlanify />)
  else
    return (<PlanifyIndicator />)
}

export default calendrier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  liste: {
    flexDirection: "column",
    backgroundColor: '#dcdcdc'
  },
  titre: {
    fontSize: 20
  },
  item: {
    backgroundColor: 'white',
    margin: '5%',
    flexDirection: 'column',
    borderRadius: 5
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bouton: {
    backgroundColor: "#00a46c",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    color: 'white',
    alignContent: 'center',
    textAlign: 'center',
    margin: 30
  }
});