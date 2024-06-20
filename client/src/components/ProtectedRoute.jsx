import { useContext } from "react";
import { Context } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { authenticated } = useContext(Context)

  return authenticated ? (<>{children}</>) : (<Navigate to="/login" replace={true} />)
}

export default ProtectedRoute