import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from '../components/Header';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const calendrier = ({route,navigation}) => {
  console.log(route.params)
  return (
    <View>
      <Header title="CALENDRIER"/>
      <Calendar
        markedDates={{
          '2021-09-16': { selected: true, marked: true, selectedColor: 'blue' },
          '2021-09-17': { marked: true },
          '2021-09-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
          '2021-09-19': { disabled: true, disableTouchEvent: true }
        }}
      />
    </View>

  )
}

export default calendrier;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});