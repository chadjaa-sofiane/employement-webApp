import "@fontsource/roboto";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Regester from "./pages/Regester";
import Container from "@material-ui/core/Container";
import DashboardRouter from "./pages/dashboard/Router";
import HomeRouter from "./pages/home/Router";
import AuthRoute from "./lib/AuthRoute";
import LogRoute from "./lib/LogRoute";
import { useToken, useGetMyInfo } from "./lib/hooks";
import Theme from "./lib/Theme";
import { userInfo } from "./cache";

function App() {
  const loading1 = useToken();
  const loading2 = useGetMyInfo();
  if (loading1 || loading2 || !userInfo()) return "loading...";
  return (
    <Theme>
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact>
            <HomeRouter />
          </Route>
          <LogRoute path="/login">
            <Login />
          </LogRoute>
          <LogRoute path="/regester">
            <Regester />
          </LogRoute>
          <AuthRoute path="/dashboard">
            <DashboardRouter />
          </AuthRoute>
        </Switch>
      </Container>
    </Theme>
  );
}

export default App;
