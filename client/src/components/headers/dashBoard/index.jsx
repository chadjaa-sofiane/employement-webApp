import { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { searchText } from "../../../cache";
import UserBar from "./UserBar";
import NavigationBar from "./NavigationBar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  navBar: {
    type: "dark",
    width: "100%",
    background: theme.palette.primary.main,
  },
  userBarContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginLeft: "auto",
  },
  avatar: {
    marginLeft: "2rem",
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

const SearchField = withStyles((theme) => ({
  root: {
    width: "100%",
    background: theme.palette.background.paper,
    padding: ".5rem",
    fontWeight: "bold",
  },
}))(Input);

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [searchTextState, setSearchState] = useState(" ");
  function submit(e) {
    e.preventDefault();
    history.push("/dashboard/search/posts");
    searchText(searchTextState);
  }
  return (
    <div className={classes.root}>
      <Grid item xs={1}>
        <span>logo</span>
      </Grid>
      <Grid item xs>
        <form noValidate autoComplete="off">
          <SearchField
            color="secondary"
            onChange={(e) => setSearchState(e.target.value)}
            placeholder="enter search text"
            inputProps={{
              endadornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <button onClick={submit} style={{ display: "none" }}></button>
        </form>
      </Grid>
      <Grid item md={4}>
        <NavigationBar />
      </Grid>
      <Grid item md={4}>
        <UserBar />
      </Grid>
    </div>
  );
}

export default Header;
