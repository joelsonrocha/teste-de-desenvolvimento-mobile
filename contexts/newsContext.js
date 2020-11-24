import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const NewsContext = createContext();

const NewsProvider = ({ children }) => {
    const [teste, setTeste] = useState("Olá Mundo");
    const [storedNumber, setStoredNumber] = useState('');
    const [needsRestart, setNeedsRestart] = useState(false);
    const [news, setNews] = useState([]);
    const [author, setAuthor] = useState([]);

    addNews = async(new_news) =>{
        console.log('addNews', new_news);
        try {
            if(new_news){
                setNews([...news, new_news]);
                console.log('addNews new', news);
                await AsyncStorage.setItem('news', JSON.stringify(news));
            }
        } catch (e) {
            // saving error
            console.log('addNews', e);
        }
    }

    getNews = async() =>{
        try {
            const value = await AsyncStorage.getItem('news')
            if(value !== null) {
                setNews(JSON.parse(value));
            }
        } catch(e) {
            console.log('getNews', e);
        }
    }

    /* useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((value) => {
          if (value) {
            setStoredNumber(value);
          }
        });
    }, []); */

    /* const increaseByTen = useCallback(async () => {
        const newNumber = +storedNumber > 0 ? +storedNumber + 10 : 10;

        await AsyncStorage.setItem(STORAGE_KEY, `${newNumber}`);

        setStoredNumber(`${newNumber}`);
        setNeedsRestart(true);
    }, [setNeedsRestart, setStoredNumber, storedNumber]);
    
    const clearItem = useCallback(async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setNeedsRestart(true);
    }, [setNeedsRestart]); */

    return (
        <NewsContext.Provider
          value={{
            teste,
            addNews,
            getNews,
            news
          }}
        >
          {children}
        </NewsContext.Provider>
      );
}

export default NewsProvider;