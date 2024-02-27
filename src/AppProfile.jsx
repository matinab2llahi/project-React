import './AppProfile.css'
import Users from './components/Users'
function App() {
  const BACE_URL = `https://users-login-2-default-rtdb.firebaseio.com/`
  // location href login file               
  /////////////////////////////http_______________________port ///
  const URL_LOGIN = `${location.href.split("/")[0]}//${location.href.split("/")[2]}`
  // location href management login file
  return (
    <>
      <section className='sec_users'>
        <Users BACE_URL={BACE_URL} URL_LOGIN={URL_LOGIN}/>
      </section>
    </>
  )
}

export default App
