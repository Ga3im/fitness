import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import { router } from "./pages/router";
import { SettingProvider } from "./context/context";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <SettingProvider>
      <Routes>
        <Route path={router.main} element={<Main />}>
          <Route path={router.login} element={<Login />} />

          <Route path={router.register} element={<Register />} />
        </Route>
      </Routes>
    </SettingProvider>
  );
}

export default App;
