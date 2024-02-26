import {useRef, useState, useEffect} from 'react'
import "./style/Login.css"
import axios from "axios"
function Login({BASE_URL}) {
    const [Users, setUsers] = useState(JSON.parse(localStorage.getItem("idUser"))) || []
    // const [usersNew, setUsersNew]=useState({})
    const [Situation, setSituation] = useState(true)
    
    

    const formTitle = useRef(null)
    const changeSituationRef = useRef(null)
    
    const boxInput = useRef(null)

    const userInput = useRef(null)
    const passInput = useRef(null)
    const eamilInput = useRef(null)

    const btnSubmit = useRef(null)
    const clearInputVal = ()=>{
        passInput.current.value=""
        eamilInput.current.value=""
    }
    const changeSituationClaer=(val="",val2="",hidden=new Boolean)=>{
        formTitle.current.innerHTML=val
        changeSituationRef.current.innerHTML= val2
        btnSubmit.current.innerHTML= val
        userInput.current.hidden =hidden
    }
    const changeInput=(e,val)=>{
        
        e.target.value.split("").map((el)=>{
            if(el === " "){
                e.target.value=""
                alert(`Please do not enter space in your ${val}.`)
            }
        })
    }
    const changeSituation=(e)=>{
        e.preventDefault()
        setSituation(!Situation)
    }
    useEffect(() => {
        // localStorage.setItem("idUser", JSON.stringify([]))
        const tokes = JSON.parse(localStorage.getItem("idUser"))
        // if(tokes !== null){
        const test = 0
        axios.get(`${BASE_URL}/users/${test}.json`)
        .then(req=>console.log(req.data))
        .catch(err=>console.log(err))
        tokes.forEach(el=>{
            console.log(el)
        })
        // }

        // localStorage.setItem("id",)
        document.title = `account ${Situation?"login":"sing in"}`
        if(Situation === false){
            setTimeout(()=>{
                changeSituationClaer("sing in", "login", true)
                clearInputVal()
            }, 200)
        }else{
            setTimeout(()=>{
                changeSituationClaer("login","sing in" , false)
                clearInputVal()
                userInput.current.value=""
            }, 200)
        }
    }, [Situation]);

    const submitClick =async (e)=>{
        e.preventDefault()
        if(Situation === true){
            //login
            // const chackEamil = !Users.some(el=>{return el.eamil === eamilInput.current.value})
            // if(chackEamil){
            if(true){
                // post data base
                
                const res=await axios.post("https://users-login-2-default-rtdb.firebaseio.com/users.json",
                {
                    username:userInput.current.value.trim(),
                    password:passInput.current.value.trim(),
                    eamil: eamilInput.current.value.trim()
                }  )
                    // setUsers(prev=>[...prev,response.data.name])
                    
                    if (Users.length === 0 ){
                        setUsers([response.data.name])
                    }else{
                        setUsers(prev=>[...prev,response.data.name])
                    }
                    localStorage.setItem("idUser",JSON.stringify(Users))
                    // console.log(Users,localStorage.getItem("idUser"))
                    
                    console.log("token ==>>  " + Users);
                    console.log(response.data)
                

                //_
                userInput.current.value=""
            }else{
                alert("Your email is duplicate. Enter another email.")
            }
            clearInputVal()
        }else{
            //sing in
            //...

        }
    }
    return (
        <div className="form">
            <div className={`bg_anime ${Situation ? "login":"sing"}`} ></div>
            <div className={`box_form ${Situation ? "" :"sing_in"}`} >
                <form onSubmit={submitClick}>
                    <h2 ref={formTitle}>login</h2>
                    <div className="box__input" ref={boxInput}>
                        <input type="text"        ref={userInput} title="user name" placeholder='username' required minLength={4} onChange={(e)=>changeInput(e,"user name")} />
                        <input type="email"        ref={eamilInput} title="eamil" placeholder='email' required  />
                        <input type="password"      ref={passInput} title="password" placeholder='password' required minLength={5} onChange={(e)=>changeInput(e,"password")}/>
                    </div>
                    <div>
                        <button type='submit' ref={btnSubmit}>login</button>
                        <a href='/' ref={changeSituationRef} onClick={changeSituation}>sing in</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login