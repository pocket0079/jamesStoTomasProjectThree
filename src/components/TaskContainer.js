import firebase from './firebase'
import { ref, getDatabase, remove} from 'firebase/database'
import Smiley from './Smiley'

const TaskContainer = ({firebaseTasks, error}) => {

    const taskDone = (taskId) => {
        //create a reference to the database
        const db = getDatabase(firebase);

        //within the db, we're specifically going to create a reference to the nested task boject which needs to be removed.
        const dbRef = ref(db, `/${taskId}`)

        //call the remove method and pass it the specific reference to the selected task
        remove(dbRef);
    }
    
    return (
        <section className="taskContainer">
            {/* error handling message */}
            {
                error && 
                <p className='errorMessage'>Please enter a task</p>
            }
            <h3>Tips: Search for a simple term to represent your activity. </h3>
                <ul className='taskUl'>
                    {
                        firebaseTasks.map((taskItem) => {
                            return<li key={taskItem.id}>
                                        <div className="imgContainer">
                                            {
                                                taskItem.task.apiData !== '' 
                                                ?<img src={taskItem.task.apiData} alt={taskItem.task.alt} /> 
                                                : <Smiley />
                                            }
                                            <p>{taskItem.task.task}</p>
                                            <p className='timestamp'>{taskItem.task.timestamp}</p>
                                            <button onClick={() => { taskDone(taskItem.id)}}>Done</button>
                                        </div>
                                    </li>
                        })
                    }
                </ul>
        </section>
    )
}

export default TaskContainer;