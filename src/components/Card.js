import React, {Component} from 'react';
import {Image, Text, StyleSheet} from 'react-native';

class Card extends Component {
  render() {
    const {name, age, image} = this.props;
    return (
      <Image source={{uri: image}} style={styles.image}>
        <Text style={styles.title}>{name}, {age}</Text>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 15,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: 15,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Card;