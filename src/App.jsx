import Body from './components/Body'
import './App.css'
import { Provider } from 'react-redux'
import appStore from './utilis/appStore'

function App() {
  

  return (
    <>
   <Provider store={appStore}><Body /></Provider>
    </>
  )
}

export default App
