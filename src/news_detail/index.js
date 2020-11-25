import React, { useContext, } from 'react';
import { NewsContext } from "../../contexts/newsContext";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
  } from 'react-native';
import moment from 'moment';

const NewsDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const { 
    getAuthorsName
} = useContext(NewsContext);

  return (
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.authorAndDate}>by: {getAuthorsName(item.author_id)[0].name} em {moment(item.created).format('DD/MM/yyyy')}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 55,
    alignContent: "center",
    justifyContent: "center",
  },
  title:{
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  authorAndDate:{
    textAlign: "center"
  },
  text:{
    fontSize: 15,
    margin: 10,
    marginTop: 20
  },
});