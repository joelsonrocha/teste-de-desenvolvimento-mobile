import React, { useContext, useState, useEffect } from 'react';
import { NewsContext } from "../../contexts/newsContext";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';

const AddNews = () => {
    const { 
        teste,
        getNews,
        news,
        addNews
    } = useContext(NewsContext);

    useEffect(() => {
        addNews({id: 1, title: 'Trump é o cara', author_id: 2})
     }, []);

    return (
        <SafeAreaView>
            <Text>AddNews</Text>
        </SafeAreaView>
    );
  };

export default AddNews;