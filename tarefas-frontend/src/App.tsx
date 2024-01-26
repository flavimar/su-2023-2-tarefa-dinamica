import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes";
import {AuthProvider} from "./shared/contexts/AuthContext";
import {Login} from "./shared/components";

export const App = () =>{
  return (
      <AuthProvider>
        <Login>
    <BrowserRouter>
        <AppRoutes/>
    </BrowserRouter>
        </Login>
      </AuthProvider>

  );
}

