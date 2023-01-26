const Form = (props) => {

    return (
        <form className="formSection">
            <input type="text" onChange={props.formInput}  className="textInput" value={props.text} />
            <input type="submit" onClick={props.addedTask} value="Add Task" className="submitButton" />
        </form>
    )
}

export default Form