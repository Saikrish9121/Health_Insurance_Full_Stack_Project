// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './components/Auth/UserLogin';
import AdminLogin from './components/Auth/AdminLogin';
import UserRegistration from './components/Auth/UserRegistration';
import AdminRegistration from './components/Auth/AdminRegistration';
import ForgetPassword from './components/Auth/ForgetPassword';
import Dashboard from './components/User/Dashboard';
import ViewAllPlans from './components/User/ViewAllPlans';
import ApplicationRegistration from './components/User/ApplicationRegistration';
import AdminDashboard from './components/Admin/AdminDashboard';
import ValidationPage from './components/User/ValidationPage';
import ViewAllApplications from './components/Admin/ViewAllApplications';
import AddNewPlan from './components/Admin/AddNewPlan';
import UpdatePlan from './components/Admin/UpdatePlan';
import PlansPage from './components/Admin/PlansPage';
import { Navigate } from 'react-router-dom';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/user-login" />} />
        <Route path="/user/view-all-plans" element={isLoggedIn ? <ViewAllPlans /> : <Navigate to="/user-login" />} />
        <Route path="/user/application-registration/:planId" element={isLoggedIn ? <ApplicationRegistration /> : <Navigate to="/user-login" />} />
        <Route path="/user/validation-page/:planId" element={isLoggedIn ? <ValidationPage /> : <Navigate to="/user-login" />} />
        <Route path="/user/validation-page" element={isLoggedIn ? <ValidationPage /> : <Navigate to="/user-login" />} />
        <Route path="/user/application-registration" element={isLoggedIn ? <ApplicationRegistration /> : <Navigate to="/user-login" />} />

        {/* Admin Routes */}

        <Route path="/admin/dashboard" element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
        <Route path="/admin/add-new-plan" element={isAdminLoggedIn ? <AddNewPlan /> : <Navigate to="/user-login" />} />
        <Route path="/admin/view-all-applications" element={isAdminLoggedIn ? <ViewAllApplications /> : <Navigate to="/user-login" />} />
        <Route path="/admin/update-plan" element={isAdminLoggedIn ? <UpdatePlan /> : <Navigate to="/user-login" />} />
        <Route path="/admin/view-all-plans" element={isAdminLoggedIn ? <PlansPage /> : <Navigate to="/user-login" />} />
      </Routes>
    </Router>
  );
}

export default App;
