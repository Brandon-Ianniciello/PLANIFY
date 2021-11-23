import React, { useState, useEffect, useContext, Component } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import Event from '../components/Event';
import moment from 'moment'
import PlanifyIndicator from '../components/PlanifyIndicator';
import { Calendar,Agenda } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from "react-native-push-notification";
import { Card } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';
import * as firebase from 'firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const calendrier = ({ route, navigation }) => {

  /*-------------------constantes et variables-----------------*/
  const today = new Date().toISOString().split('T')[0]

  const [markedDates, setMarkedDate] = useState({ [today]: { marked: true, selectedColor: 'blue' } })
  const [calendrier, setCalendrier] = useState([])
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const db = firebase.firestore();

  const [ajout, setAjout] = useState(null)

  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre",
    "Octobre", "Novembre", "Décembre"];

  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const _format = 'YYYY-MM-DD'


  /*--date picker */
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  
  const onDaySelect = (day) => {
    const selectedDay = moment(day.dateString).format(_format)
    const arrDates = Object.keys(markedDates)
      // .map((value, id, ssss) => ({id, value}))
      .map((d, i) => {
        console.log('d, i: ', markedDates.indexOf(i))

      })

    console.log('array dates: ', arrDates)
  }

  
  const [items, setItems] = useState({});

  useEffect(() => {
    const loadItems = (day) => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }
  //   const ref = db.collection("Events").doc(user.uid);
  //   ref.get().then((doc) => {
  //       setItems(doc.data())
  //   })
  //   console.log(items)

  }, []);

  const loadItems = (day) => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < numItems; j++) {
          items[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150))
          });
        }
      }
    }
    const newItems = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  }

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  const renderItem= (item) =>{
    return(
      <TouchableOpacity style={[styles.item]} onPress={() => Alert.alert(item)}>
        <Card>
          <Card.Content>
            <View>
              <Text>
                {item.name}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  const AgendaPlanify = () => {

    if (calendrier != [] && calendrier != null) {
      return (

        <SafeAreaView style={{ flex: 1, marginTop:'5%' }}>
          <TouchableOpacity style={styles.refreshBouton} onPress={() => {loadItems();}}>
            <FontAwesome name="retweet" color='#0099ff' size={20} style={{ marginBottom: 5 }} />
          </TouchableOpacity>
          <Agenda
            items={items}

            minDate={today}

            renderItem={renderItem}

            // loadItemsForMonth={loadItems}

            selected={today}
          />

        </SafeAreaView>
      ) 
    }
    else if (calendrier == [] && calendrier == null) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Calendar />
          <Text>Aucuns évènements dans le calendrier</Text>
        </SafeAreaView>
      )
    }
  }

  /* 
    1.Date : la date de l'evènement
    2.Rappel : le nombre de temps que le user veut se faire rappeler qu'il a un event
               intialiser à 1h avant.
  */
  function notificateTheUser(date, rappel = (Date.now() - 60 * 1000)) {
    PushNotification.localNotificationSchedule({
      message: "planify your week",
      title: "Your event is coming soon!",
      date: date - rappel
    })
  }

  /*----------------AFFICHAGE------------------*/
  /* AJOUT D'UN EVENT DANS LE CALENDRIER */

  if (route.params != undefined) {
    let item = route.params.event
    // setAjout(item)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.item}>
          <Text style={styles.titre}>Ajout de {item.nom} au calendrier</Text>
          <Text>Choisissez le moment de l'évènement</Text>

          <View style={{ flexDirection: 'column', alignItems: 'center' }}>

            <TouchableOpacity onPress={showDatepicker} style={styles.bouton}>
              <Text>Date : {days[date.getDay()]} {date.getDate()} {months[date.getUTCMonth()]} {date.getFullYear()}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={showTimepicker} style={styles.bouton}>
              <Text>Heure : {date.getHours()}:{date.getMinutes()}</Text>
            </TouchableOpacity>

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

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.bouton}
                onPress={() => { Insert(item, date); setAjout(null); navigation.navigate("Calendrier") }}>
                <Text>
                  Ajouter
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.bouton} onPress={() => { setAjout(null); navigation.navigate("Calendrier") }}>
                <Text>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
  /* AFFICHAGE DE TOUT LES ÉVÈNEMENTS */
  return (<AgendaPlanify />)
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
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
