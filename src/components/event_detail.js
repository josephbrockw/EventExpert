import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking
} from 'react-native';

module.exports = React.createClass({
  openUrl(url) {
    Linking.canOpenURL(url).then(supported => {
      if(supported) {
        Linking.openURL(url);
      } else {
        console.log(`Can't open: ${url}`);
      }
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.link}
              onPress={() => this.props.navigator.pop()}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.openUrl(this.props.url)}
          >
            <Text style={styles.link}>
              Full Details
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Image
            style={styles.detailImg}
            source={{uri: this.props.img}}
          />
          <Text style={styles.title}>{this.props.title}</Text>
          <ScrollView style={styles.description}>
            <Text>{this.props.description}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'
  },
  body: {
    flex: 19,
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    color: '#0000FF'
  },
  detailImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
    marginTop: 5
  },
  description: {
    padding: 10
  }
})
