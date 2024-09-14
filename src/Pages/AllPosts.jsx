import { useEffect, useState } from "react";
import service from "../appwrite/conf"; 
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";


function AllPosts() {
   
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

if (post === undefined || post.length === 0) {
    return <h2>No posts</h2>;
}

return (
    <div className="w-100 py-4">
        <div className="row">
            {post.map((p) => (
                <div key={p.$id}>
                    <PostCard {...p} />
                </div>
            ))}
        </div>
    </div>
);
    
}

export default AllPosts;
