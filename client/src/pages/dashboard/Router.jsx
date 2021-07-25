import { Switch, Route } from "react-router-dom";
import Search from "./Search";
import Profile from "./Profile";
import Home from "./Home";
import DashBoardHeader from "../../components/headers/dashBoard";
import CreatePost from "./CreatePost";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    paddingTop: "1rem",
  },
});

function RouterApp() {
  const classes = useStyle();
  return (
    <>
      <DashBoardHeader />
      <Grid container spacing={1} className={classes.root}>
        <Switch>
          <Route path="/dashboard/home">
            <Home />
          </Route>
          <Route path="/dashboard/search">
            <Search />
          </Route>
          <Route path="/dashboard/profile/:userName">
            <Profile />
          </Route>
          <Route path="/dashboard/createPost">
            <CreatePost />
          </Route>
        </Switch>
      </Grid>
    </>
  );
}

export default RouterApp;
