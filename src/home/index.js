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
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import NewsDetail from '../news_detail';

const Home = ({ navigation }) => {
    const { 
        getNews,
        news,
        getAuthorsName,
        deleteNews,
        searchNews
    } = useContext(NewsContext);
    const [selectedId, setSelectedId] = useState(null);
    const [searchNewsValue, setSearchNewsValue] = useState(null);
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
        navigation.navigate('AddNews', { op: 'edit', item: item, name: 'Editar notícia' });
    }
    

    const Item = ({ item, onPress }) => (
    <View onPress={onPress} style={styles.itemNews}>
        <Text style={styles.itemTitle} onPress={() => detail(item)}>{item.title}</Text>
        <Text style={styles.itemAuthor}>by: {getAuthorsName(item.author_id)[0].name}</Text>
        <Text style={styles.itemText} onPress={() => detail(item)}>{item.text.length > 200 ? item.text.substring(0, 200)+'...' : item.text}</Text>
        <View style={styles.itemBtnArea}>
        <TouchableOpacity onPress={() => editNews(item)} style={styles.itemNewsBtnEdit}><Text style={styles.itemNewsBtnEditText}><Icon name="edit" size={20} color="#666" /></Text></TouchableOpacity>
        <TouchableOpacity onPress={() => deleteNews(item)} style={styles.itemNewsBtnDel}><Text style={styles.itemNewsBtnDelText}><Icon name="close" size={20} color="#666" /></Text></TouchableOpacity>
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
        navigation.navigate('AddNews', { op: 'new', item: null, name: 'Adicionar nova notícia' });
    }

    const updateSearchNews = (value) =>{
        console.log(value)
        searchNews(value);
    }
    
    const detail = (item) =>{
        navigation.navigate('NewsDetail', { item: item, name: item.title });
    }

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                placeholder="Busque pelo título..."
                onChangeText={(value) => updateSearchNews(value)}
                value={searchNewsValue}
                inputStyle={styles.searchBar}
                lightTheme={true}
            />
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
                <Text style={styles.buttonAddNewsText}><Icon name="plus" size={30} color="#666" /></Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
  };

export default Home;

const styles = StyleSheet.create({
    searchBar:{
        backgroundColor: '#fff',
        color: '#000'
    },
    container: {
      backgroundColor: '#fff',
      marginTop: 10,
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
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    itemAuthor:{
        textAlign: "center",
        fontSize: 8,
        fontWeight: "bold",
        marginTop: 1,
    },
    itemText:{
        textAlign: "justify",
        fontSize: 13,
        margin: 20
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
        justifyContent: "flex-end",
        marginRight: 10
    },
    itemNewsBtnEdit:{
        
    },
    itemNewsBtnDel:{
        marginLeft: 10,
        marginRight: 10
    },
});