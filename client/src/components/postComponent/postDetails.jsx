import { useState } from "react";
import { useQuery } from "@apollo/client";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TypoGraphy from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { GET_ONE_POST } from "../../graphql/queries";
import { withStyles } from "@material-ui/core/styles";
import EmployerCard from "./EmployerCard";
import PostDetailsCard from "./postDetailsCard";

const ERROR = withStyles(() => ({
  root: {
    textAlign: "center",
    margin: "auto",
  },
}))(TypoGraphy);

function PostMoreInfo() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_ONE_POST, {
    variables: { id },
  });
  if (loading) return "loading ...";
  if (error)
    return (
      <ERROR variant="h2" color="error">
        ERROR 404 !!
      </ERROR>
    );
  const { title, body, state, createdAt, jobsNeeded, employer } =
    data.gePostById;
  return (
    <>
      <Grid item xs={12}>
        <PostAppRequestBar />
      </Grid>
      <Grid item xs>
        <PostDetailsCard
          title={title}
          state={state}
          craetedAt={createdAt}
          jobsNeeded={jobsNeeded}
        >
          {body}
        </PostDetailsCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <EmployerCard employer={employer} />
      </Grid>
    </>
  );
}

const PostAppRequestBar = () => {
  const [value, setValue] = useState(0);
  function handleChange(event, nextEvent) {
    setValue(nextEvent);
  }
  return (
    <Paper>
      <Tabs
        style={{ marginBottom: "1rem" }}
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="Post Application Request Bar "
      >
        <Tab label="About Post" />
        <Tab label="requests" />
      </Tabs>
    </Paper>
  );
};

export default PostMoreInfo;
