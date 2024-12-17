import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import RouteNames, { RootStackParamList } from '../routes';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

type Props = NativeStackScreenProps<RootStackParamList>;

const ShoppingScreen = ({navigation}: Props) => {
    return (
        <View>
            <Text>Shopping</Text>
            <Text>Shopping</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate(RouteNames.BROWSER);
            }}>
                <Text>Go to Browser</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ShoppingScreen;
