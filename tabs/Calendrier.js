import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList, TouchableOpacity, Platform } from 'react-native';
import Event from '../components/Event';
import moment from 'moment'
import PlanifyIndicator from '../components/PlanifyIndicator';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from "react-native-push-notification";
import * as SQLite from 'expo-sqlite';

const calendrier = ({ route, navigation }) => {

  /*-------------------constantes et variables-----------------*/
  const today = new Date().toISOString().split('T')[0]

  const [markedDates, setMarkedDate] = useState({ [today]: { marked: true, selectedColor: 'blue' } })
  const [calendrier, setCalendrier] = useState([])
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [ajout, setAjout] = useState(null)

  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre",
    "Octobre", "Novembre", "Décembre"];

  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const _format = 'YYYY-MM-DD'

  const dbLite = SQLite.openDatabase("db.db");

  /*--DBLITE LOCAL--*/
  function Create() {
    console.log("create")
    dbLite.transaction((tx) => {
      //tx.executeSql("CREATE TABLE IF NOT EXISTS Calendrier (date TEXT NOT NULL,eventName TEXT NOT NULL,description TEXT)")
      tx.executeSql("INSERT INTO Calendrier (date,eventName,description) VALUES ('2021-10-11','test','arreteee')",[],
      (tx,results) => { console.log(results)})
    })
  }

  function Update() {
    //Fetch tout les données du calendrier
    dbLite.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Calendrier",
        [], (tx, result) => {
          setCalendrier(...calendrier, result.rows._array)
          // var temp = [];
          // for (let i = 0; i < results.rows.length; ++i)
          //   temp.push(results.rows.item(i));
          console.log("Refresh",result.rowsAffected)
          // console.log(temp)
          // setCalendrier(temp)
        })
    });
  }

  function Insert(event, date) {
    dbLite.transaction(tx => {
      tx.executeSql("INSERT INTO Calendrier (date,eventName,description) VALUES (?,?,?)",
        [date.toString(), event.nom.toString(), event.Description.toString()],
        (tx, results) => {
          console.log("Results: ", results.rowsAffected)
          if (results.rowsAffected > 0) {
            console.log("ajout de ", event.nom)
          }
          else {
            console.log("Erreur dans l'ajout de ", event.nom)
          }
        }
      )
    });
  }

  function Remove(truck) {
    dbLite.transaction(tx => {
      tx.executeSql("DELETE FROM Calendrier WHERE id=(?)", [truck['id']], (tx, result) => {
        setFavorites(favoritesList.filter(truck => truck === result.rows._array))
      });
    });
  }

  function Empty() {
    dbLite.transaction(tx => {
      tx.executeSql("DELETE FROM Calendrier")
    })
  }

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

  /*useEffect */
  useEffect(() => {
    /*sqlLite*/
    Create();
    Update();

    /*pour supprimer la table calendrier */
    //Empty()
  }, []);

  const onDaySelect = (day) => {
    const selectedDay = moment(day.dateString).format(_format)
    const arrDates = Object.keys(markedDates)
      // .map((value, id, ssss) => ({id, value}))
      .map((d, i) => {
        console.log('d, i: ', markedDates.indexOf(i))
        // const markedDay = moment(d.value).format(_format)
        // if (_today !== markedDay) {
        // console.log('push: ', markedDay)
        // } else if () {
        // console.log('splice: ', d, i)
        // }
      })

    console.log('array dates: ', arrDates)
  }

  const AgendaPlanify = () => {
    if (calendrier != [] && calendrier != null) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Calendar
            selected={today}
            minDate={new Date()}
            markedDates={markedDates}
            onDayPress={(day) => onDaySelect(day)}
          />
          <View style={styles.itemContainer}>
            <Text style={styles.titre}>ÉVÈNEMENTS DANS LE CALENDRIER</Text>
            <TouchableOpacity onPress={() => Update()} style={styles.bouton}>
              <Text>Refresh</Text>
            </TouchableOpacity>
            <FlatList
              //data={events}
              data={calendrier}
              refreshing={true}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <View>
                    <View style={{ flexDirection: 'column' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Event item={item} navigation={navigation} nomPage={"Calendrier"} userInfo={userInfo} uid={item.User} />
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.bouton} onPress={() => deleteFromCalendar(item)}>
                          <Text>Supprimé</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bouton} onPress={() => editEventFromCalendar(item)}>
                          <Text>Modifié</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>Planifié le </Text>
                    </View>
                  </View>
                )
              }}
            />
          </View>
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
    borderColor: 'black',
    borderWidth: 5,
    margin: '5%',
    flexDirection: 'column'
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
