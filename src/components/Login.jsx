import {useRef, useState, useEffect} from 'react'
import "./style/Login.css"
import axios from "axios"
function Login({BASE_URL, URL_LOGIN, URL_MANAGEMENT_LOGIN}) {
    const [Situation, setSituation] = useState(true)
    const [UserNow, setUserNow] = useState({})
    
    

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
        if(hidden){
            userInput.current.setAttribute('disabled', '')
        }else{
            userInput.current.removeAttribute('disabled')
        }
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
    const claerDataUser =()=>{
        setUserNow({})

        location.href = URL_LOGIN
        localStorage.removeItem("idUser")
    }
    useEffect(() => {
        const toketUser =JSON.parse(localStorage.getItem("idUser"))
        axios.get(`${BASE_URL}/users/${toketUser}.json`)
        .then(req=>{
                if(req.status === 200){
                    // set user data
                    if(req.data !== null){
                        setUserNow(req.data)
                        // location.href=URL_MANAGEMENT_LOGIN;
                    }else{
                        localStorage.removeItem("idUser")
                        alert("You don't have your token")
                    }
                }else{
                    claerDataUser()
                }
            })
            .catch(err=>{
                claerDataUser()
            })
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
            // post data base
            axios.post(`${BASE_URL}/users.json`,
            {
                username:userInput.current.value.trim(),
                password:passInput.current.value.trim(),
                eamil: eamilInput.current.value.trim()
            }  ).then(req=>{
                localStorage.setItem("idUser",JSON.stringify(req.data.name))
                location.href = URL_MANAGEMENT_LOGIN
            }).catch(err=>{
                claerDataUser()
            })
            userInput.current.value=""
            clearInputVal()
        }else{
            //sing in
            if(UserNow !== null){
                // if token okey
                if(
                    UserNow.eamil === eamilInput.current.value.trim()
                    &&
                    UserNow.password === passInput.current.value.trim()
                ){
                    clearInputVal()
                    location.href = URL_MANAGEMENT_LOGIN
                }else if(UserNow.password !== passInput.current.value){
                    passInput.current.value=""
                    alert("Your password is not correct")
                }else{
                    clearInputVal()
                    alert("Your eamil is not correct")
                }
            }else{
                // if token claer
                alert("You don't have your token.")
                clearInputVal()
            }
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