import './App.css';
import CustomerList from './components/CustomerList';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateCustomer from './components/CreateCustomer';
import DetailCustomer from './components/DetailCustomer';
import UpdateCustomer from './components/UpdateCustomer';
import CustomerSearch from './components/CustomerSearch';
import {Route,Routes} from 'react-router-dom'

function App() {
  const title = "병원 접수관리"
  return (
    <div className="App">
      <Header title={title}/>
      <div className='contents'>
        <Routes>
          <Route path="/" element={<CustomerList />}/>
          <Route path="/create" element={<CreateCustomer />}/>
          <Route path="/customer/:id" element={<DetailCustomer />}/>
          <Route path="/edit/:id" element={<UpdateCustomer />}/>
          <Route path="/search/" element={<CustomerSearch />} />
        </Routes>
      </div>
      <Footer title={title}/>
    </div>
  );
}

export default App;
