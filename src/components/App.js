import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

class tinderCards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: 'https://unsplash.it/300/250'}} style={styles.image}>
          <Text style={styles.title}>Sonja, 27</Text>
        </Image>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <TouchableOpacity style={styles.buttonPressable}>
              <Text>x</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.buttonPressable}>
              <Text>{'<3'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#F5F6FA',
    paddingTop: 20,
  },
  image: {
    flex: 1,
    borderRadius: 15,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    borderRadius: 25,
  },
  buttonPressable: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default tinderCards;