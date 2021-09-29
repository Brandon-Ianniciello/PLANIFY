import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
//import 'react-calendar/dist/Calendar.css';

const calendrier = () => {
  return (
    <Calendar
      // Collection of dates that have to be marked. Default = {}
      markedDates={{
        '2021-09-16': { selected: true, marked: true, selectedColor: 'blue' },
        '2021-09-17': { marked: true },
        '2021-09-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
        '2021-09-19': { disabled: true, disableTouchEvent: true }
      }}
    />
  )
}

export default calendrier;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});