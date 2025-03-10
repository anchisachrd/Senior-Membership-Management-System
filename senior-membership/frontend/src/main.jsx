import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// หน้าต่าง ๆ 
import App from './App.jsx'
import Login from './pages/authen/Login.jsx'
// import LoginStaff from './pages/authen/LoginStaff.jsx'
import Register from './pages/authen/Register.jsx'
import CommitteCandidateList from './pages/committee/CommitteCandidateList.jsx'
import DeathReport from './pages/heir/DeathReport.jsx'
import StaffCandidateList from './pages/staff/StaffCandidateList.jsx'
import CadidateWaitingList from './pages/staff/CadidateWaitingList.jsx'
import CandidateProfile from './pages/staff/CandidateProfile.jsx'
import SendNotify from './pages/staff/SendNotify.jsx'
import CheckPayment from './pages/staff/CheckPayment.jsx'
import DetailCheckPayment from './pages/staff/DetailCheckPayment.jsx'
import SubmitPayment from './pages/payment/SubmitPayment.jsx'
import History from './pages/payment/History.jsx'
import HeirRegister from './pages/heir/HeirRegister.jsx'
import EditInfo from './pages/authen/EditInfo.jsx'

import SidebarStaff from './components/SidebarStaff.jsx'
import Sidebar from './components/Sidebar.jsx'
import FinaceReport from './pages/staff/FinaceReport.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* หน้าที่ต้องมี side bar */}

      <Route  element={ <Sidebar />}>
        <Route path='/deathReport' element={ <DeathReport />} />
        <Route path='/submitPayment' element={ <SubmitPayment />} />
        <Route path='/history' element={ <History />} />
        <Route path='/heir_register' element={ <HeirRegister />} />
      </Route>

      <Route  element={ <SidebarStaff />}>
        <Route path='/committee_candidateList' element={ <CommitteCandidateList />} />
     
        <Route path='/staff_candidateList' element={ < StaffCandidateList/>} />
        <Route path='/staff_cadidateWaitingList' element={ < CadidateWaitingList />} />
        <Route path='/candidateProfile/:id' element={ < CandidateProfile/>} />
        <Route path='/staff_sendNotify' element={ < SendNotify/>} />
        <Route path='/staff_checkPayment' element={ < CheckPayment/>} />
        <Route path='/staff_detailCheckPayment' element={ < DetailCheckPayment/>} />
        <Route path='/finance-report' element = {<FinaceReport/>}/>

      </Route>
      
      {/* หน้าที่ไม่ต้องมี side bar */}
      <Route path='/login' element={ <Login />} />
      <Route path='/register' element={ <Register />} />
      <Route path='/edit_info' element={ <EditInfo />} />

    </Routes>
  </BrowserRouter>,
)
