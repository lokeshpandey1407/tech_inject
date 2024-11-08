import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector } from "../Redux/authReducer";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(authSelector);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
