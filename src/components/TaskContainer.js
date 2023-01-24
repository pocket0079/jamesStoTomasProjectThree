import firebase from './firebase'
import { ref, getDatabase, remove} from 'firebase/database'

const TaskContainer = ({firebaseTasks, toDoPics}) => {

    const taskDone = (taskId) => {
        //create a reference to the database
        const db = getDatabase(firebase);

        //within the db, we're specifically going to create a reference to the nested book boject which needs to be removed.
        const dbRef = ref(db, `/${taskId}`)

        //call the remove method and pass it the specific reference to the selected book
        remove(dbRef);
    }
    return (
        <section className="taskContainer">
            <h2>My plan for today</h2>
                <ul>
            {
                    firebaseTasks.map((taskItem) => {
                        console.log(taskItem)
                        return <li key={taskItem.id}>
                            {
                                taskItem.task.apiData != '' ? <img src={taskItem.task.apiData} alt={taskItem.task.alt} /> 
                                : null
                            }
                            <p>{taskItem.task.task}</p>
                            <button 
                            onClick={() => { taskDone(taskItem.id)}}>Done</button>
                            </li>
                    })
        }
            </ul>
        </section>
    )
}

export default TaskContainer;