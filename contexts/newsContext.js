import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const NewsContext = createContext();

const NewsProvider = ({ children }) => {
    const [teste, setTeste] = useState("Olá Mundo");
    const [storedNumber, setStoredNumber] = useState('');
    const [needsRestart, setNeedsRestart] = useState(false);
    const [news, setNews] = useState([]);
    const [author, setAuthor] = useState([
        {id: 1, name: 'João'},
        {id: 2, name: 'Maria'},
        {id: 3, name: 'Anônimo'}
    ]);

    addNews = async(new_news) =>{
        try {
            if(new_news){
                await AsyncStorage.setItem('news', JSON.stringify([...news, new_news]));
                getNews();
                return true;
            }
        } catch (e) {
            // saving error
            console.log('Erro addNews', e);
            return false;
        }
    }

    getNews = async() =>{
        try {
            const value = await AsyncStorage.getItem('news');
            if(value !== null) {
                setNews(JSON.parse(value));
            }
        } catch(e) {
            console.log('getNews', e);
        }
    }

    const getAuthorsName = (id) =>{
        return author.filter((item) => {
            return item.id == id;
        });
    }

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    return (
        <NewsContext.Provider
          value={{
            teste,
            addNews,
            getNews,
            news,
            author,
            uuidv4,
            getAuthorsName
          }}
        >
          {children}
        </NewsContext.Provider>
      );
}

export default NewsProvider;