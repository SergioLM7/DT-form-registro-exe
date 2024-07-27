import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Main from './components/Main';
import Header from './components/Header';



const App = () => {

  return <>
    <Header />
    <BrowserRouter>
    <Main />
    </BrowserRouter>
    <Footer />
  </>

}

export default App
