import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NewsProvider from "./contexts/newsContext"; 
import Home from "./src/home";
import AddNews from "./src/add_news";
import NewsDetail from "./src/news_detail";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NewsProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ title: 'Notícias' }}/>
            <Stack.Screen name="AddNews" component={AddNews} options={({ route }) => ({ title: route.params.name })}/>
            <Stack.Screen name="NewsDetail" component={NewsDetail} options={({ route }) => ({ title: route.params.name })}/>
          </Stack.Navigator> 
      </NavigationContainer>
    </NewsProvider>
  );
};

export default App;
