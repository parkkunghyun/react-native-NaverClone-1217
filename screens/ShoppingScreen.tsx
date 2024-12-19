import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import RouteNames, { RootStackParamList } from '../routes';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = NativeStackScreenProps<RootStackParamList>;

const ShoppingScreen = ({navigation}: Props) => {
    return (
        <View>
            <Text>Shopping</Text>
            <Text>Shopping</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate(RouteNames.BROWSER, {initialUrl: 'https://m.naver.com'});
            }}>
                <Text>Go to Browser</Text>
            </TouchableOpacity>
            <Icon name="shopping-cart" size={30} color="red"  />
        </View>
    );
};

export default ShoppingScreen;
