import React,{useState, useEffect, useRef} from 'react'
import ItemsUsersGet from './ItemsUsersGet.jsx'
import ItemsUserControl from './ItemsUserControl.jsx'
import './style/Users.css'
import axios from "axios"
function Users({BACE_URL}) {
    const [Users, setUsers] = useState({})
    const [disableHandlere, setDisableHandlere] = useState(false)

    const [UrlImg, setUrlImg] = useState(`data:image/png;base64,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`)

    const [edit, setEdit] = useState(false)
    const [Delete, setDelete] = useState(false)

    const userInput = useRef(null)
    const passInput = useRef(null)
    const eamilInput = useRef(null)


    const changeInput=(e,val)=>{
        
        e.target.value.split("").map((el)=>{
            if(el === " "){
                e.target.value=""
                alert(`Please do not enter space in your ${val}.`)
            }
        })
    }
    const changeImage=()=>{
        console.log("change image successful")
        // setUrlImg()
    }
    const clousEdit = (e)=>{
        e.preventDefault()
        setEdit(!edit)
    }
    const deleteClick = ()=>{
        setDelete(!Delete)
    }
    
    const editClick = ()=>{
        setEdit(!edit)
    }
    const handlerEdit = (e)=>{
        e.preventDefault()
        const value ={
            username:userInput.current.value.trim(),
            password:passInput.current.value.trim(),
            eamil: eamilInput.current.value.trim()
        }
        axios.put('https://users-login-2-default-rtdb.firebaseio.com/users/test.json', value)
            .then(response => {
                setEdit(!edit)
                location.href=location.href
        })
        .catch(error => {
                setEdit(!edit)
                location.href=location.href
        });
    }
    const handlerDel =()=>{
        axios.delete(`https://users-login-2-default-rtdb.firebaseio.com/users/test.json`)
        .then(response => {
            setDelete(!Delete)
            location.href=location.href
        })
        .catch(error => {
            alert('Error deleting data', error.message);
            setDelete(!Delete)
            location.href=location.href
        });

    }
    useEffect(() => {
        axios.get(`${BACE_URL}/users/test.json`)
            .then(req=>{
                if(req.status === 200){
                    setUsers(
                        {
                            username : req.data.username,
                            password : req.data.password,
                            eamil    : req.data.eamil
                        }
                    )
                    setDisableHandlere(true)
                }else{
                    alert("error")
                    setDisableHandlere(true)
                }
            }).catch(err=>{
                // alert("error network")
                setDisableHandlere(false)
            })
        // tekrar shod ye state bzan dakhele in
    }, []);
    return (
        <div className='box_users'>
            <ul className={edit ? "active_box": Delete ? "active_box": ""}>
                <li>
                    {
                        // if network error true 
                        disableHandlere
                        ?
                            <div className="box_user__img" onClick={changeImage}>
                                <img src={UrlImg} alt="person" />
                                <p>change image</p>
                            </div>
                        :
                            <div className="box_user__img disable_img" >
                                <img src={UrlImg} alt="person" />
                            </div>
                    }
                    <div className="items__users">
                        <ItemsUsersGet username={Users.username} eamil={Users.eamil} password={Users.password}/>
                        <ItemsUserControl deleteClick={deleteClick} editClick={editClick} disableHandlere={disableHandlere}/>
                    </div>
                </li>
            </ul>
            {/* if  click edit*/}
            <div className={`box_handlre ${edit ? "active_box": ""}`}>
                <form onSubmit={handlerEdit}>
                    <input type="text"    ref={userInput} title="user name" placeholder='username' required minLength={4} onChange={(e)=>changeInput(e,"user name")} />
                    <input type="email"    ref={eamilInput} title="eamil" placeholder='email' required  />
                    <input type="password"  ref={passInput} title="password" placeholder='password' required minLength={5} onChange={(e)=>changeInput(e,"password")}/>
                    
                    <div>
                        <button style={{backgroundColor:"#c52b2b"}} onClick={clousEdit}>clous</button>
                        <button style={{backgroundColor:"var(--btn-from)"}}type='submit' >edit</button>
                    </div>
                </form>
            </div>
            {/* if  click dalate*/}
            <div className={`box_handlre ${Delete ? "active_box": ""}`}>
                <div>
                    <button onClick={()=>setDelete(!Delete)}>no</button>
                    <button onClick={handlerDel}>yes</button>
                </div>
            </div>
        </div>
    )
}

export default Users