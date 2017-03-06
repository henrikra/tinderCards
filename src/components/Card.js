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
});

export default Card;