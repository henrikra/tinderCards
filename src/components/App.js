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
const getRandomAge = () => randomIntegerBetween(16, 40);

const hotGirls = [
  {name: 'Sonja', age: getRandomAge(), image: getRandomImage()},
  {name: 'Tarja', age: getRandomAge(), image: getRandomImage()},
  {name: 'Enni', age: getRandomAge(), image: getRandomImage()},
  {name: 'Jenni', age: getRandomAge(), image: getRandomImage()},
  {name: 'Emma', age: getRandomAge(), image: getRandomImage()},
  {name: 'Veera', age: getRandomAge(), image: getRandomImage()},
  {name: 'Sofia', age: getRandomAge(), image: getRandomImage()},
  {name: 'Laura', age: getRandomAge(), image: getRandomImage()},
];

class tinderCards extends Component {
  state = {
    hotGirls,
  }

  resetGirls = () => {
    this.setState({hotGirls});
  }

  deleteGirl = (index) => {
    if (index === 0) {
      this.setState({hotGirls: []});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cards}>
          {this.state.hotGirls.map((hotGirl, index) => <Card key={index} {...hotGirl} onRelease={this.deleteGirl} index={index} />)}
        </View>
        <View style={styles.buttons}>
          <View style={[styles.button, this.state.hotGirls.length && styles.buttonDisabled]}>
            <TouchableOpacity style={styles.buttonPressable} onPress={this.resetGirls} disabled={!!this.state.hotGirls.length}>
              <Text>Reset hot girls</Text>
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
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0,
  },
  cards: {
    flex: 1,
  },
});

export default tinderCards;