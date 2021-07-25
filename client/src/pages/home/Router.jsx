import Grid from "@material-ui/core/Grid";
import { Switch, Route } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader";

function Router() {
  return (
    <Switch>
      <HomeHeader />
      <Grid container>
        <Route></Route>
        <Route></Route>
        <Route></Route>
      </Grid>
    </Switch>
  );
}

export default Router;
