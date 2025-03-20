import './App.css'
import Login from './pages/login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './pages/register'
import Farmer_Dash from './pages/farmer'
import Dealer from './pages/dealer'
import ProtectedRoute from './utils/protected'
import DealRequestForm from './pages/createRequest'
import ViewDealFarmer from './pages/viewDealFarmer'
import ViewDealDealer from './pages/viewDealerDeals'
import AcceptedDeals from './pages/acceptedDeals'

function App() {
  return (
    <>
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element= {<Login/>}/>
          <Route path='/register' element = {<Signup/>}/>
          <Route path='/farmer' element={<ProtectedRoute><Farmer_Dash/></ProtectedRoute>}/>
          <Route path='/dealer' element={<ProtectedRoute><Dealer/></ProtectedRoute>} />
          <Route path='/dealer/create' element={<ProtectedRoute><DealRequestForm/></ProtectedRoute>}/>
          <Route path='/farmer/deal/view/:id' element={<ProtectedRoute><ViewDealFarmer/></ProtectedRoute>}/>
          <Route path='/dealer/deal/view/:id' element={<ProtectedRoute><ViewDealDealer/></ProtectedRoute>}/>
          <Route path='/farmer/accepted' element={<ProtectedRoute><AcceptedDeals/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
