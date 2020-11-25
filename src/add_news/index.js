import React, { useContext, useState, useEffect } from 'react';
import { NewsContext } from "../../contexts/newsContext";
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Alert
  } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const AddNews = ({ route, navigation }) => {
    const { item, op } = route.params;
    const [title, setTitle] = useState();
    const [textNews, setTextNews] = useState();
    const [selectedAuthor, setSelectedAuthor] = useState();
    const [created, setCreated] = useState();
    const [keyBoardIsOpen, setKeyBoardIsOpen] = useState(false);
    const { 
        addNews,
        author,
        uuidv4,
        editNews
    } = useContext(NewsContext);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
            Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

            return () => {
            Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
            Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
            };
        }
    }, []);

    useEffect(() => {
        if(item && op == 'edit' && item.id){
          setTitle(item.title);
          setTextNews(item.text);
          setSelectedAuthor(item.author_id);
          setCreated(item.created || new Date());
        }
    }, [item && op == 'edit' && item.id]);

    const _keyboardWillShow = () => {
        setKeyBoardIsOpen(true);
    };

    const _keyboardWillHide = () => {
        setKeyBoardIsOpen(false);
    }; 

    const saveNews = ()=>{
        if(title && textNews && selectedAuthor){
          if(op == 'new'){
            if(addNews({id: uuidv4(), author_id: selectedAuthor, title: title, text: textNews, created: new Date()})){
              setTitle('');
              setTextNews('');
              setSelectedAuthor(null);
              navigation.pop();
            }else{
              Alert.alert('Erro', 'Ocorreu algum erro ao salvar');
            }
          }else if(op == 'edit'){
            if(editNews({id: item.id, author_id: selectedAuthor, title: title, text: textNews, created:created, updated: new Date()})){
              setTitle('');
              setTextNews('');
              setSelectedAuthor(null);
              navigation.pop();
            }else{
              Alert.alert('Erro', 'Ocorreu algum erro ao salvar');
            }
          }
        }else{
          console.log('informe todos os campos');
          Alert.alert('Erro', 'Informe todos os campos');
        }
    }

    return (
        
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    enabled>
                    
                      <View style={styles.inputArea}>
                          <TextInput
                          style={styles.inputTitle}
                          onChangeText={title => setTitle(title)}
                          placeholder="Digite o título"
                          value={title}
                          keyboardType="default"
                          />
                          <TextInput
                          multiline
                          editable
                          style={styles.inputText}
                          onChangeText={textNews => setTextNews(textNews)}
                          placeholder="Digite o texto"
                          value={textNews}
                          keyboardType="default"
                          />
                          <RNPickerSelect
                              style={pickerSelectStyles}
                              placeholder={{
                                label: 'Selecione um item...',
                                value: null,
                                color: 'red',
                              }}
                              value={selectedAuthor}
                              onValueChange={(value) => setSelectedAuthor(value)}
                              items={author.map((item) =>(
                                { key: item.id, label: item.name, value: item.id }
                              ))}
                          />
                          <TouchableOpacity
                              style={styles.buttonSave}
                              onPress={() => {saveNews()}}
                          >
                              <Text>Salvar</Text>
                          </TouchableOpacity>
                      </View>
                    </KeyboardAvoidingView>
                  </TouchableWithoutFeedback>
                </View>
    );
  };

export default AddNews;

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 20,
      marginBottom: 55
    },
    buttonSave: {
        height: 55,
        width: '100%',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#666',
        marginTop: 20
    },
    keyboardAvoidingView: {
      flex: 1,
      justifyContent: 'flex-end',
      display: 'flex'
    },
    inputArea: {
      paddingHorizontal: 20,
      zIndex: 5,
      flex: 1,
      display: 'flex',
    },
    inputTitle:{
      height: 55,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      padding: 20,
      fontSize: 14,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 1,
    },
    inputText: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      padding: 20,
      fontSize: 14,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 1,
    },
  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      height: 55,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      color: 'black',
      paddingRight: 30, 
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, 
    },
  });