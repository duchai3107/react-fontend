const TodoDaTa = (props) => {
    const { Todolist, Deletetodo } = props;
    // console.log(props)
    return (
        <div className="Todo-data">
            {Todolist.map((item, index) => {
                const ID = item.id
                const handclick2 = () => {
                    Deletetodo(ID)
                }
                return (
                    <div className="Todo-delete">{item.name}
                        <button onClick={handclick2}>Delete</button>
                    </div>

                )
            })}

        </div>
    )
}
export default TodoDaTa;
