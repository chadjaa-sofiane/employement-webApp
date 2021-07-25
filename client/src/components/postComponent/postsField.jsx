import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import GetAllPosts from "../../containers/getAllPosts";
import { GET_ALL_POSTS } from "../../graphql/queries";
import FilterBar from "../filterBar";
import { searchText } from "../../cache";
import { userInfo } from "../../cache";

function PostsField() {
  const state = userInfo().state;
  const [filter, setFilter] = useState({ state });
  const { loading, data, error, refetch } = useQuery(GET_ALL_POSTS, {
    variables: { title: searchText(), filter },
  });
  useEffect(() => {
    refetch();
  }, [filter, refetch]);
  return (
    <>
      <FilterBar filter={filter} setFilter={setFilter} />
      <GetAllPosts data={data} loading={loading} error={error} />
    </>
  );
}

export default PostsField;
