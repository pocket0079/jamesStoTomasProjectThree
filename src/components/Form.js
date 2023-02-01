const Form = (props) => {

    let textInputErrorHandling = 'textInput';
    if (props.error) {
        textInputErrorHandling = 'inputError';
    }

    return (
        <form className="formSection">
            <label htmlFor="task">
                <input type="text"  id="task" onChange={props.formInput}  className={textInputErrorHandling} value={props.text} />
            </label>
            <input type="submit" onClick={props.addedTask} value="Add Task" className="submitButton" />
        </form>
    )
}

export default Form