import { useEffect, useState } from "react";
import service from "../appwrite/conf"; 
import PostCard from "../components/PostCard";

function AllPosts() {
    // const [posts, setPosts] = useState();
    
    // useEffect(() => {
    //     service.getPosts([]).then((post) => {
    //         if (post) {
    //             setPosts(post.documents);
    //             console.log(posts)
    //         }
    //     });
    // }, []);
    const [post, setPosts] = useState([]);
    useEffect(() => {
      service.getPosts([]).then((posts) => {
        setPosts(posts.documents);
      });
    }, []);

    if (post === undefined) {
        return <h2>No posts</h2>;
      }

    return (
        <div className="w-100 py-4">
            
                <div className="row">
                    {post.map((post) => (
                        <div key={post.$id} className="col-md-3 p-2">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
           
        </div>
    );
}

export default AllPosts;
