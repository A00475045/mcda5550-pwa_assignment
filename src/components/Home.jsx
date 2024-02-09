import { useEffect, useState } from "react";
import './Home.css';

const Home = () => {

    const [list, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDesciption] = useState('');
    const [priority, setPriority] = useState('low');
    const [status, setStatus] = useState('loading')
    const URI = "http://localhost:3003/";

    useEffect(() => {
        setStatus('loading')
        fetch(`${URI}getTasks`)
            .then((res) => {
                res.json().then((jsonRes) => {
                    setList(jsonRes);
                    setStatus('loaded');
                });
            })
            .catch((error) => {
                alert('you can not make a read transaction in the offline state');
                console.error('Error fetching data:', error);
            });

    }, [])
    useEffect(() => {

    }, [title, description, priority])

    const jsonData = JSON.stringify([...list, { status: false, title, description, priority }]);

    const url = `${URI}addTask?json=${encodeURIComponent(jsonData)}`;


    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const addTask = (title, description, priority) => {
        setStatus('loading')

        fetch(`${url}`, requestOptions)
            .then((res) => {
                res.json().then(result => {
                    setList(result);
                    setStatus('loaded');
                })
            }).catch(err => {
                console.log(err);
                setStatus('loaded');
                alert('you can not make a transaction (add, delete, update) in the offline state');
            })

    }
    const deleteTask = async (title) => {
        setStatus('loading')
        var newList = [];
        list.map((ele) => {
            if (ele.title != title) {
                newList.push(ele)
            }
        })
        fetch(`${URI}addTask?json=${encodeURIComponent(JSON.stringify(newList))}`, requestOptions)
            .then((res) => {
                res.json().then(result => {
                    setList(result);
                    setStatus('loaded');
                })
            }).catch(err => {
                console.log(err);
                setStatus('loaded');
                alert('you can not make a transaction (add, delete, update) in the offline state');
            })
    }

    const updateTask = async (title) => {
        setStatus('loading')
        var newList = [];
        list.map((ele) => {
            if (ele.title === title) {
                ele.status = !ele.status;
            }
            newList.push(ele)
        })
        fetch(`${URI}addTask?json=${encodeURIComponent(JSON.stringify(newList))}`, requestOptions)
            .then((res) => {
                res.json().then(result => {
                    setList(result);
                    setStatus('loaded');
                })
            }).catch(err => {
                console.log(err);
                setStatus('loaded');
                alert('you can not make a transaction (add, delete, update) in the offline state');
            })
    }

    return (
        <>
            <div className="todo-container">
                <div className="todo-add">
                    <input type="text" name="title" id="title" onChange={(e) => { setTitle(e.target.value) }} placeholder="Task Title" value={title} required />
                    <textarea name="description" id="description" cols="30" rows="2" onChange={(e) => { setDesciption(e.target.value) }} value={description} placeholder={'description.....'}> </textarea>
                    <select name="priority" id="prority" value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                        <option value="low" >Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">Urgent Priority</option>
                    </select>
                    <button className="add-button" type="submit" onClick={() => addTask(title, description, priority)}>Add Task</button>
                </div>
                <div className='divider' style={{ transform: 'translateX(0%)', marginTop: '6px' }} ></div>
                <div className="todo-list-container">
                    <div className='todo-list' style={{ justifyContent: `${!(status === 'loaded') ? 'center' : 'flex-start'}` }}>
                        {
                            status === 'loaded' && ((list.length === 0) ?
                                <p>🎉 Great news! You're all caught up on your tasks! 🎉</p> : <>
                                    <div className='task' style={{ backgroundColor: 'inherit', margin: 0, fontSize: '80%' }}>
                                        <span style={{ width: '15%', textAlign: 'center', borderRight: '1px solid black' }}>Task Status</span>
                                        <span style={{ width: '20%', textAlign: 'center', borderRight: '1px solid black' }}>Title</span>
                                        <span style={{ width: '40%', textAlign: 'center', borderRight: '1px solid black' }}>Description</span>
                                        <span style={{ width: '15%', textAlign: 'center', borderRight: '1px solid black' }}>Priority</span>
                                        <span style={{ width: '10%', textAlign: 'center' }}>Delete</span>

                                    </div>
                                    <div className='divider' style={{ transform: 'translate(0)' }}></div>
                                    {list.map((ele) => {
                                        if (!ele.status)
                                            return <div className='task'>
                                                <span style={{ width: '15%', textAlign: 'center' }}><input type="checkbox" checked={ele.status} name={ele.title} id={ele.title} onClick={() => updateTask(ele.title)} /></span>
                                                <span style={{ width: '20%', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ele.title}</span>
                                                <span style={{ width: '40%', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{ele.description} </span>
                                                <span style={{ width: '15%', textAlign: 'center' }}>{ele.priority}</span>
                                                <span style={{ width: '10%', textAlign: 'center' }}><button onClick={() => deleteTask(ele.title)}>❌</button></span>

                                            </div>
                                    })
                                    }</>
                            )

                        }
                        {status === 'loading' && <span className="loader"></span>}
                    </div>
                </div>
            </div>

        </>
    )
}
export default Home;