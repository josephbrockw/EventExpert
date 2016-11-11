//https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const API_KEY = 'Bearer SESXYS4X3FJ5LHZRWGKQ';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search';

module.exports = React.createClass({
  componentDidMount() {
    this.searchEvents('hackathon', 'San Francisco');
  },
  
  searchEvents(category, city) {
    const FETCH_URL = ROOT_URL + '?q=' + category + '&venue.city' + city;

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Authorization': API_KEY
      }
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('responseJSON', responseJSON);
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Event Expert
        </Text>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
