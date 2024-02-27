import React from 'react'
import "./App.css"
import Login from './components/Login'
// import Basic from './components/FormikTest'
function App() {
    const BASE_URL = "https://users-login-2-default-rtdb.firebaseio.com/"
    // location href login file               
    const URL_LOGIN = location.href
    // location href management login file     
    const URL_MANAGEMENT_LOGIN = `${location.href}porfile.html`
    return (
        <section>
            <div className='conteier'>
                <Login BASE_URL={BASE_URL} URL_LOGIN={URL_LOGIN} URL_MANAGEMENT_LOGIN={URL_MANAGEMENT_LOGIN}/>
            </div>
        </section>
    )
}

export default App