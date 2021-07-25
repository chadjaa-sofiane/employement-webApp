import { useState } from "react";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import { isLoggedIn } from "../cache";

const useStyle = makeStyles(() => ({
  head: {
    display: "flex",
    padding: ".5rem 2rem ",
  },
  buttonsContainer: {
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    minWidth: "7rem",
    marginLeft: "1rem",
  },
}));

function Home() {
  console.log(isLoggedIn());
  const classes = useStyle();
  const history = useHistory();
  const [value, setValue] = useState(0);
  function handleChange(e, nextEvent) {
    setValue(nextEvent);
  }
  return (
    <>
      <Paper className={classes.head}>
        <Grid container>
          <Grid item xs>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Home" />
              <Tab label="Jobs" disabled />
              <Tab label="Blogs" disabled />
              <Tab label="About" disabled />
            </Tabs>
          </Grid>
          <Grid item xs={12} md={3} className={classes.buttonsContainer}>
            {isLoggedIn() ? (
              <Button
                onClick={() => history.push("/dashboard")}
                className={classes.btn}
                variant="outlined"
                color="secondary"
              >
                go to dashboard
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => history.push("/regester")}
                  className={classes.btn}
                  variant="outlined"
                  color="primary"
                >
                  regester
                </Button>
                <Button
                  onClick={() => history.push("/login")}
                  className={classes.btn}
                  variant="outlined"
                  color="secondary"
                >
                  log in
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Home;
