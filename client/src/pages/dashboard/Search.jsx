import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Posts from "../../components/postComponent/postsField";
import PostDetails from "../../components/postComponent/postDetails";
import SearchBar from "../../components/searchBar";

function Search() {
  const { path } = useRouteMatch();
  return (
    <>
      <Redirect from={`${path}`} exact to={`${path}/Posts`} />
      <Switch>
        <Route path={`${path}/Posts/:id`} exact>
          <PostDetails />
        </Route>
        <Route path={`${path}`}>
          <SearchBar />
          <Switch>
            <Route path={`${path}/Posts`} exact>
              <Posts />
            </Route>
            <Route path={`${path}/Employers`}></Route>
            <Route path={`${path}/JobSekeers`}></Route>
          </Switch>
        </Route>
      </Switch>
    </>
  );
}

export default Search;
