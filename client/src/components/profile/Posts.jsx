import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import GetAllPosts from "../../containers/getAllPosts";
import { GET_MY_POSTS } from "../../graphql/queries";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  post: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    padding: ".5rem",
  },
}));

function Posts() {
  const classes = useStyle();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_MY_POSTS);
  console.log(data);
  return (
    <>
      <Paper variant="outlinde" className={classes.post}>
        <Typography color="primary" variant="h6">
          ِCreate an new post
        </Typography>
        <Button
          onClick={() => history.push("/dashboard/createPost")}
          className={classes.btn}
          variant="contained"
          color="primary"
        >
          create new
        </Button>
      </Paper>
      <br />
      <GetAllPosts data={data} loading={loading} error={error} />
    </>
  );
}

export default Posts;
