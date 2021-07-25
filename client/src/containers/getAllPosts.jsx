import Grid from "@material-ui/core/Grid";
import Post from "../components/postComponent/post";

function GetAllPosts({ data, loading, error }) {
  if (loading) return <h1>{"loading..."}</h1>;
  if (error) return <h1> {error.message} </h1>;
  if (!data) return "";
  if (data)
    return (
      <Grid item xs>
        <div>
          {data[Object.keys(data)[0]]?.map((el) => {
            return (
              <Post key={el._id} data={el}>
                {el.body}
              </Post>
            );
          })}
        </div>
      </Grid>
    );
}

export default GetAllPosts;
