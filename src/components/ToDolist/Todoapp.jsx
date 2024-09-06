import './ToDo.css';
import TodoDaTa from './TodoDaTa';
import TodoNew from './TodoNew';
import ReactLogo from '../../assets/react.svg';
import { useState } from 'react';

const Todoapp = () => {
    const [Todolist, Settodolist] = useState([

    ])
    const Mynewtodo = (name) => {
        const newtodo = {
            id: randomIntFromInterval(1, 1000),
            name: name
        }
        Settodolist([...Todolist, newtodo])
    }
    const Deletetodo = (idd) => {
        const Deletelist = Todolist.filter((item) => idd !== item.id)
        Settodolist(Deletelist)
    }
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return (
        <div className="Todo-container">
            <div className="Todo-title">ToDo-List</div>
            <TodoNew
                Mynewtodo={Mynewtodo}
            />
            {Todolist.length > 0 &&
                <TodoDaTa
                    Todolist={Todolist}
                    Deletetodo={Deletetodo}
                />
            }
            {Todolist.length === 0 &&
                <div className='Todo-image'>
                    <img src={ReactLogo} className='logo' />
                </div>
            }
        </div>
    )
}
export default Todoapp;