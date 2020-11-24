import React, { useContext, useState, useEffect, useCallback } from 'react';
import { NewsContext } from "../../contexts/newsContext";
import { useFocusEffect } from '@react-navigation/native';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';

const Home = () => {
    const { 
        teste,
        getNews,
        news
    } = useContext(NewsContext);

    /* useEffect(() => {
       console.log('news', news);
    }, []); */

    useFocusEffect(
        useCallback(() => {
            console.log('useFocusEffect news', news);
        }, [])
    );

    return (
        <SafeAreaView>
            <Text>HOME - {teste}</Text>
        </SafeAreaView>
    );
  };

export default Home;