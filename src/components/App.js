import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Card from './Card';

const randomIntegerBetween = (from, to) => Math.floor(Math.random() * to) + from;
const getRandomImage = () => 
  `https://unsplash.it/30${randomIntegerBetween(0, 9)}/35${randomIntegerBetween(0, 9)}`;
const getLastTwo = arr => arr.slice(Math.max(arr.length - 2, 1));

const hotGirls = [
  {name: 'Sonja', age: 27, image: getRandomImage()},
  {name: 'Tarja', age: 34, image: getRandomImage()},
  {name: 'Enni', age: 50, image: getRandomImage()},
];

class tinderCards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cards}>
          {getLastTwo(hotGirls).map((hotGirl, index) => <Card key={index} {...hotGirl} />)}
        </View>
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
  cards: {
    flex: 1,
  },
});

export default tinderCards;