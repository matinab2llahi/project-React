import './AppProfile.css'
import Users from './components/Users'

function App() {
  const BACE_URL = `https://users-login-2-default-rtdb.firebaseio.com/`
  // location href login file               
  const URL_LOGIN = location.href
  // location href management login file     
  const URL_MANAGEMENT_LOGIN = `${location.href}porfile.html`
  return (
    <>
      <section className='sec_users'>
        <Users BACE_URL={BACE_URL} URL_LOGIN={URL_LOGIN} URL_MANAGEMENT_LOGIN={URL_MANAGEMENT_LOGIN}/>
      </section>
    </>
  )
}

export default App
