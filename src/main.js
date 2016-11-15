//https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Geocoder from 'react-native-geocoder';

const API_KEY = 'Bearer MDSYWJZQIP2BPATTQTEM';
const API_TOKEN = 'MDSYWJZQIP2BPATTQTEM';
//const OAUTH_TOKEN = 'MDSYWJZQIP2BPATTQTEM';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

module.exports = React.createClass({
  getInitialState() {
    return ({
      dataSource: ds.cloneWithRows([
        {
          name: {
            text: 'Event 1'
          },
          url: 'www.thejoewilkinson.com'
        }
      ]),
      eventType: ''
    })
  },

  componentDidMount() {
    this.searchEvents('hackathon', 'San Francisco');
  },

  searchEvents(category) {
    // Geocoder.geocodeAddress(city).then(res => {
    //   console.log('res: ', res);
    // })

    const FETCH_URL = `${ROOT_URL}?q=${category}&token=${API_TOKEN}`

    fetch(FETCH_URL, {
      method: 'GET',
      // headers: {
      //   'Authorization': API_KEY
      //   //'Basic OAuth': OAUTH_TOKEN
      // }
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('responseJSON', responseJSON);
      this.setState({dataSource: ds.cloneWithRows(responseJSON.events)});
    });
  },

  renderRow(rowData) {
    const defaultImg = 'http://images.all-free-download.com/images/graphiclarge/3d_red_question_mark_button_image_165506.jpg';
    let img = rowData.logo != null ? rowData.logo.url : defaultImg;

    return (
      <View style={styles.row}>
        <Image
          style={styles.rowImage}
          source={{uri: img}}
        />
        <View style={styles.rowDetail}>
          <Text>
            {rowData.name.text.length > 30 ?
              rowData.name.text.substring(0, 30) + '...' :
              rowData.name.text
            }
          </Text>
          <Text>
              More Details
          </Text>
        </View>
      </View>
    )
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Event Expert
        </Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Type of event...'
              onChangeText={(text) => this.setState({eventType: text})}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.searchEvents(this.state.eventType)}
          >
            <Text style={styles.submitButton}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    //flex: 1,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24
  },
  form: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  inputContainer: {
    flex: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 12,
    width: 260,
    marginBottom: 20
  },
  input: {
    textAlign: 'center'
    //padding: 12
  },
  submitButton: {
    //flex: 10,
    borderColor: '#0000FF',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    //marginTop: 20,
    marginBottom: 0,
    width: 150,
    justifyContent: 'center',
    color: '#0000FF',
    textAlign: 'center'
  },
  list: {
    flex: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  rowDetail: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowImage: {
    flex: 2,
    width: 50,
    height: 50,
    borderColor: '#000',
    borderWidth: 1
  }
});
