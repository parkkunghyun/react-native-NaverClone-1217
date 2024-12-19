import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RouteNames, { RootStackParamList } from '../routes';


const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    contentContainerStyle: {flex:1},
});

type Props = NativeStackScreenProps<RootStackParamList>;
//


const SHOPPING_HOME_URL = 'https://shopping.naver.com/ns/home';
const ShoppingScreen = ({navigation}: Props) => {

    const webViewRef = useRef<WebView | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      webViewRef.current?.reload();
    }, []);

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <WebView
            ref={webViewRef}
            source={{uri: SHOPPING_HOME_URL}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onShouldStartLoadWithRequest={request => {
              console.log(request);
              if (
                request.url.startsWith(SHOPPING_HOME_URL) ||
                request.mainDocumentURL?.startsWith(SHOPPING_HOME_URL)
              ) {
                return true;
              }

              if (request.url != null && request.url.startsWith('https://')) {
                navigation.navigate(RouteNames.BROWSER, {
                  initialUrl: request.url,
                });
                return false;
              }

              return true;
            }}
            onLoad={() => {
              setRefreshing(false);
            }}
            renderLoading={() => <></>}
            startInLoadingState={true}
          />
        </ScrollView>
      </SafeAreaView>
    );
  };
  export default ShoppingScreen;
