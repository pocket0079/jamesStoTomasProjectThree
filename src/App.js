import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import axios from 'axios';
import Form from './components/Form'

function App() {

    //initialize state to hold data from unsplash api
    const [toDoPics, setToDoPics] = useState([]);

    //define a side effect that runs once on component mount to make a reques to the unsplash api

    const handleClick = () => {
        // axios({
        //     url: 'https://api.unsplash.com/search/photos',
        //     params: {
        //         client_id: 'XWWkZf2pWkFj-CFbqZnG5n4nReJyeuDeOpy7acIaS0M',
        //         query: 'eat breakfast',
        //         orientation: 'squarish'
        //     }
        // }).then((apiData) => {
        //     console.log(apiData.data.results);
        //     //save the data in state
        //     setToDoPics(apiData.data.results)
        // });
        console.log('click')
    }    
    
return (
    <>

    <Header />
    <Form addedTask={handleClick}/>
    </>
);
}

export default App;
