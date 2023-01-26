const Form = (props) => {

    return (
        <form className="formSection">
            <label htmlFor="task">
            <input type="text"  id="task" onChange={props.formInput}  className="textInput" value={props.text} />
            </label>
            <input type="submit" onClick={props.addedTask} value="Add Task" className="submitButton" />
        </form>
    )
}

export default Form