import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import PostCard from "../components/PostCard";
function Home() {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      setPosts(posts.documents);
    });
  }, []);

  if (post === undefined) {
    return <h2>Login First</h2>;
  }


  // if (post?.length===0) {
  //   return <h2>Login to read Post</h2>;
  // }

  
  return (
    <>
    {post.map((post)=>(
        <div>
          <PostCard key={post.$id} {...post}/>
        </div>
    ))}
    </>
  )
 
}

export default Home;
