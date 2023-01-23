import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../Pages/LoginPage';


export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path='/*' element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
