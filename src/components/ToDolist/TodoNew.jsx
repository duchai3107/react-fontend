import { useState } from "react";

const TodoNew = (props) => {
    const { Mynewtodo } = props;
    const [valueinput, setvalueinput] = useState("")
    const handclick = () => {
        Mynewtodo(valueinput);
        setvalueinput("")
    }
    const handonchage = (name) => {
        setvalueinput(name);
    }
    return (
        <div className="Todo-new">
            <input type="text" value={valueinput} onChange={(event) => { handonchage(event.target.value) }} />
            <button onClick={handclick} style={{ cursor: "pointer" }}>Add</button>
            <div>
                My is value:{valueinput}
            </div>
        </div>
    )
}
export default TodoNew;
