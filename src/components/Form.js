const Form = (props) => {

    return (
        <form className="formSection">
            <input type="text" onChange={props.formInput} />
            <input type="submit" onClick={props.addedTask} value="Add Task" />
        </form>
    )
}

export default Form