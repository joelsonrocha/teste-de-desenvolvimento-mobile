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
    FlatList,
    TouchableOpacity
  } from 'react-native';

const Home = ({ navigation }) => {
    const { 
        getNews,
        news,
        getAuthorsName
    } = useContext(NewsContext);
    const [selectedId, setSelectedId] = useState(null);
    /* useEffect(() => {
       console.log('news', news);
    }, []); */

    useFocusEffect(
        useCallback(() => {
            console.log('useFocusEffect news', news);
            console.log('Quantity', news.length);
            getNews();
        }, [])
    );

    const editNews = (item) =>{
        console.log('item para editar', item);
        navigation.navigate('AddNews', { op: 'edit', item: item });
    }

    const Item = ({ item, onPress }) => (
    <View onPress={onPress} style={styles.itemNews}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.itemAuthor}>Autor: {getAuthorsName(item.author_id)[0].name}</Text>
        <View style={styles.itemBtnArea}>
        <TouchableOpacity onPress={() => editNews(item)} style={styles.itemNewsBtnEdit}><Text style={styles.itemNewsBtnEditText}>Editar</Text></TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.itemNewsBtnDel}><Text style={styles.itemNewsBtnDelText}>Apaga</Text></TouchableOpacity>
        </View>
    </View>
    );
      


    const renderItem = ({ item }) => {
        //const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                //style={{ backgroundColor }}
            />
        );
    };

    const addNews = () =>{
        navigation.navigate('AddNews', { op: 'new', item: null });
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeToolbar}>
                <Text style={styles.pageTitle}>Lista de notícias</Text>
            </View>
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
            <TouchableOpacity
                style={styles.buttonAddNews}
                onPress={()=>addNews()}
            >
                <Text style={styles.buttonAddNewsText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
  };

export default Home;

const styles = StyleSheet.create({
    homeToolbar: {
        display: 'flex',
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    pageTitle:{
        fontSize: 18,
        fontWeight: "bold"
    },
    container: {
      backgroundColor: '#fff',
      marginTop: 10,
      borderColor: 'green',
      borderWidth: 1,
      flex: 1,
      display: "flex"
    },
    listNews:{
        borderColor: 'red',
        borderWidth: 1,
        flex: 1,
        display: "flex"
    },
    itemNews:{
        borderBottomColor: '#cecece',
        borderBottomWidth: 0.5,
        display: "flex",
        flexDirection: "column",
        marginBottom: 20
    },
    itemTitle:{
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20
    },
    itemText:{
        textAlign: "justify",
        fontSize: 15,
        marginLeft: 20,
        marginTop: 20
    },
    itemAuthor:{
        textAlign: "right",
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 15,
        marginTop: 20
    },
    buttonAddNews:{
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#cecece',                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonAddNewsText:{
        fontSize: 40,
        fontWeight: "bold",
        color: '#000',
        textAlign: "center"
    },
    itemBtnArea:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    itemNewsBtnEdit:{
        marginLeft: 20
    },
    itemNewsBtnEditText:{

    },
    itemNewsBtnDel:{
        marginLeft: 20
    },
    itemNewsBtnDelText:{
        
    }
});