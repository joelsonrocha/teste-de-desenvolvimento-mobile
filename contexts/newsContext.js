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

    editNews = async(edit_news) =>{
        try {
            if(edit_news){
                let array = news;
                array[getNewsIndexById(edit_news.id)] = edit_news;
                await AsyncStorage.setItem('news', JSON.stringify(array));
                getNews();
                return true;
            }
        } catch (e) {
            // saving error
            console.log('Erro addNews', e);
            return false;
        }
    }

    deleteNews = async(delete_news) =>{
        let array = news;
        array.splice(getNewsIndexById(delete_news.id), 1);
        try {
            if(delete_news){
                let array = news;
                await AsyncStorage.setItem('news', JSON.stringify(array));
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

    const getNewsIndexById = (id) =>{
        let in_array = news.filter(function(item) { 
            return item.id == id;
        });
        return news.indexOf(in_array[0]);
    }

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    const searchNews = (value) => {
        let searchArray = news;
        let val = value;
    
        var results = [];
        if (val && val.trim() !== "") {
          val = val.toUpperCase();
          val = stripVowelAccent(val);
    
          for (var index = 0; index < searchArray.length; ++index) {
            var entry = searchArray[index];
            if (
              entry &&
              entry.title &&
              stripVowelAccent(entry.title)
                .toUpperCase()
                .indexOf(val) !== -1
            ) {
              results.push(entry);
            }
          }
          if (results) {
            setNews(results);
          }
        }
    
        if (!val) {
          getNews();
        }
      }
    
      const stripVowelAccent = (str) => {
        var rExps = [
          { re: /[\xC0-\xC6]/g, ch: "A" },
          { re: /[\xE0-\xE6]/g, ch: "a" },
          { re: /[\xC8-\xCB]/g, ch: "E" },
          { re: /[\xE8-\xEB]/g, ch: "e" },
          { re: /[\xCC-\xCF]/g, ch: "I" },
          { re: /[\xEC-\xEF]/g, ch: "i" },
          { re: /[\xD2-\xD6]/g, ch: "O" },
          { re: /[\xF2-\xF6]/g, ch: "o" },
          { re: /[\xD9-\xDC]/g, ch: "U" },
          { re: /[\xF9-\xFC]/g, ch: "u" },
          { re: /[\xD1]/g, ch: "N" },
          { re: /[\xF1]/g, ch: "n" },
        ];
    
        for (var i = 0, len = rExps.length; i < len; i++)
          str = str.replace(rExps[i].re, rExps[i].ch);
    
        return str;
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
            getAuthorsName,
            editNews,
            deleteNews,
            searchNews
          }}
        >
          {children}
        </NewsContext.Provider>
      );
}

export default NewsProvider;