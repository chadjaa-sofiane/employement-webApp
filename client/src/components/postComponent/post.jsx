import moment from "moment";
import { useHistory, useRouteMatch } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TypoGraphy from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const PostCard = withStyles(() => ({
  root: {
    marginBottom: "1rem",
  },
}))(Card);

function Post({ data: { _id, title, createdAt, jobsNeeded }, children }) {
  const history = useHistory();
  return (
    <PostCard>
      <CardHeader
        title={
          <TypoGraphy color="primary" variant="h5">
            {title}
          </TypoGraphy>
        }
        subheader={moment(createdAt).fromNow()}
      />
      <CardContent>
        <TypoGraphy>{children}</TypoGraphy>
      </CardContent>
      <CardActions>
        <div
          style={{
            padding: ".5rem 1rem",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {jobsNeeded?.map(({ job }) => (
            <TypoGraphy
              key={job}
              style={{ marginRight: "1rem" }}
              color="secondary"
            >
              {job}
            </TypoGraphy>
          ))}
        </div>
        <Button
          style={{ marginLeft: "auto" }}
          color="primary"
          onClick={() => history.push(`/dashboard/search/Posts/${_id}`)}
        >
          Learn More
        </Button>
      </CardActions>
    </PostCard>
  );
}

export default Post;
