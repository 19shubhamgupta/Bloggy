import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

function Home() {
  const [post, setPosts] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      setPosts(posts.documents);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (post === undefined) {
    return <h2>Login First</h2>;
  }

  return (
    <>
      {post.map((post) => (
        <div>
          <PostCard key={post.$id} {...post} />
        </div>
      ))}
    </>
  );
}

export default Home;
