import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
//2. import firebase (so we have access to the firebase modules needed in order to connect to our database)
import firebase from './components/firebase'
//2A, import the firebase real time database modules that we need
import { onValue, ref, getDatabase, push } from 'firebase/database'
import Header from './components/Header';
import Form from './components/Form'
import TaskContainer from './components/TaskContainer';
import Footer from './components/Footer';

function App() {

    //init state to store user input 
    const [userTaskInput, setUserTaskInput] = useState('')

    //init state to store tasks from firebase
    const [firebaseTasks, setFirebaseTasks] = useState([])

    //init state for error handling
    const [emptyString, setEmptyString] = useState(false);

    //define a side effect that runs once on component load
    useEffect(() => {
        //store our db and create a reference to it
        const db = getDatabase(firebase);
        const dbRef = ref(db)

        //use the onValue module to listen for chages within our db and on page load + whenever changes occur, save the task currently within the db within state
        //event listener syntax where we listen to the database, and everytime we hear something, we take the returned response and save it in state
        onValue(dbRef, (dbResponse) => {
            //use val method to parse response into understandable version of our db
            const dbValue = dbResponse.val()

            //create an empty array for the tasks
            const arrayOfTasks = []

            //use for in loop to loop through the db object
            for (let propertyKey in dbValue) {
                //push every task within the object to the empty array. map requires unique key and will push both values - property name and property key in the object
                arrayOfTasks.push({
                    task: dbValue[propertyKey],
                    id: propertyKey
                });
            }

            //take array of taks and save it within state
            setFirebaseTasks(arrayOfTasks)
        })
    },[])

    //get value of text input 
    const handleChange = (event) => {
        setUserTaskInput(event.target.value)
        setEmptyString(false)
    }

    //use user input to make a request to the unsplash api
    const apiCall = () => {
        //create reference to db
        const db = getDatabase(firebase);
        const dbRef = ref(db);

        axios({
            url: 'https://api.unsplash.com/search/photos',
            params: {
                client_id: 'XWWkZf2pWkFj-CFbqZnG5n4nReJyeuDeOpy7acIaS0M',
                query: userTaskInput,
                orientation: 'squarish',
                per_page: 1
            }
        }).then((apiData) => {

            const taskAndPic = {
                "task": userTaskInput,
                "apiData": '',
                "alt": '',
                "timestamp": Date()
            }

            //error handling for undefined search
            apiData.data.results[0] !== undefined
                ? taskAndPic.apiData = apiData.data.results[0].urls.small

                : taskAndPic.apiData = ''

            apiData.data.results[0] !== undefined
                ? taskAndPic.alt = apiData.data.results[0].alt_description

                : taskAndPic.alt = `Placeholder image for ${userTaskInput}`

            push(dbRef, taskAndPic)
        });
    }

    //define an event listener that runs once user clicks submit button, takes user query and makes a request to the unsplash api
    const handleClick = (event) => {
        event.preventDefault();

        console.log(event.target.parentNode[0])
        userTaskInput !== ""
        ? apiCall()
        : setEmptyString(!emptyString)

        setUserTaskInput("");
    }

return (
    <>
        <Header />
        <Form addedTask={handleClick} formInput={handleChange} text={userTaskInput} error={emptyString} />
        <TaskContainer firebaseTasks={firebaseTasks} error={emptyString} />
        <Footer />
    </>
);
}

export default App;
