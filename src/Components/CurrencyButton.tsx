import React from 'react';
import type {PropsWithChildren} from 'react';

import {View, Text, StyleSheet} from 'react-native';

// Here we are defining the type of the props by using the PropsWithChildren from react
type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
  symbol: string;
  value: number;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  return (
    <View key={props.value} style={styles.buttonContainer}>
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>{props.flag}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.country}>{props.name}</Text>
        <Text style={styles.number}>
          {`(${props.symbol})`}
          {props.value.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  flag: {
    fontSize: 37,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: '#2d3436',
  },
  number: {
    color: 'black',
    fontSize: 10,
  },
  details: {
    flex: 1,
    maxWidth: '50%',
  },
  flagContainer: {
    width: '40%',
  },
  symbol: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CurrencyButton;
