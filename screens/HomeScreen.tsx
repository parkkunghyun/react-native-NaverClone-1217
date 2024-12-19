import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RouteNames, { RootStackParamList } from '../routes';

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
});

type Props = NativeStackScreenProps<RootStackParamList>;


const HomeScreen = ({navigation}: Props) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <WebView source={{ uri: 'https://m.naver.com/' }}
            onShouldStartLoadWithRequest={request => {
                console.log(request);
                if (request.url.startsWith('https://m.naver.com') || request.mainDocumentURL?.startsWith('https://m.naver.com')) {
                    return true;
                }
                if (request.url != null && request.url.startsWith('https://')) {
                    navigation.navigate(RouteNames.BROWSER, {initialUrl: request.url});
                    return false;
                    // 여기 해당하면 홈스크린에서 로딩 안됨
                }
                return true;
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false} />
    </SafeAreaView>);
};

export default HomeScreen;
