import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
//Constants
import {currencyByRupee} from './constants';
//Component
import CurrencyButton from './Components/CurrencyButton';
import Snackbar from 'react-native-snackbar';
const App = (): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState<String>('');

  const buttonPressed = (targetValue: Currency) => {
    console.log(targetValue);
    console.log(targetValue.name);
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      console.log(result);
      setResultValue(result);
      let value1 = targetValue.name;
      setTargetCurrency(value1);
    } else {
      return Snackbar.show({
        text: 'NOt a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };
  return (
    <>
      <StatusBar animated={false} hidden={false} backgroundColor="#61dafb" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.linearGradient}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.rupeesContainer}>
              <Text style={styles.rupee}>₹</Text>
              <TextInput
                maxLength={14}
                value={inputValue}
                clearButtonMode="always" //only for iOS
                onChangeText={setInputValue}
                keyboardType="number-pad"
                placeholder="Enter amount in Rupees"
              />
            </View>
            {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
          </View>
          <View style={styles.bottomContainer}>
            <FlatList
              numColumns={3}
              data={currencyByRupee}
              keyExtractor={(item, index) => index.toString()} // Generate unique keys based on index
              renderItem={({item, index}) => (
                <Pressable
                  style={[
                    styles.button,
                    targetCurrency === item.name && styles.selected,
                  ]}
                  onPress={() => buttonPressed(item)}>
                  <CurrencyButton {...item} />
                </Pressable>
              )}
            />
          </View>
        </View>
      </LinearGradient>
    </>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    // backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginHorizontal: 8,
    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
    // paddingHorizontal:/5
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 7,
    padding: 5,
    backgroundColor: 'white',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 5,
    height: 60,
    width: 100,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
