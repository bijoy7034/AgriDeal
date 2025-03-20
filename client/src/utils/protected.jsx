import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    let token = localStorage.getItem('access_token')
    return  token? children : <Navigate to='/'/>;
}
 
export default ProtectedRoute;