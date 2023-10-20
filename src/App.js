
import { Pagination, Table } from 'react-bootstrap';
import './App.css';
import Login from './components/Login';
import GetAllUsers from './components/User';
import Paginations from './sharedComponents/Paginations';
import { Route, Routes } from 'react-router-dom';
import Createuser from './components/Createuser';
import Contact from './components/Contact';
import GetAllContactDetails from './components/ContactDetail';
import ErrorBoundary from '../src/error/ErrorBoundary';

function App() {
  return (

    <Routes>
      <Route exact path={`/`} element={<ErrorBoundary><Login /> </ErrorBoundary>} />
      {/* <Route exact path={`/`} element={<Login />} /> */}
      <Route exact path={`/allUsers/:username`} element={<GetAllUsers />} />
      <Route exact path={`/create`} element={<Createuser />} />
      <Route exact path={`/contact`} element={<Contact />} />
      <Route exact path={`/allcontactdetail/`} element={<GetAllContactDetails />} />
    </Routes>

  );
}

export default App;
