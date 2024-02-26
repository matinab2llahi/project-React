import React from 'react'
import "./App.css"
import Login from './components/Login'
// import Basic from './components/FormikTest'
function App() {
    const BASE_URL = "https://users-login-2-default-rtdb.firebaseio.com/"
    return (
        <section>
            <div className='conteier'>
                <Login BASE_URL={BASE_URL}/>
            </div>
        </section>
    )
}

export default App