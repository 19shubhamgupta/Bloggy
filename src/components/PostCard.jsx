import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/conf";
import parse from "html-react-parser"

function PostCard({ $id, title, featuredImage, content }) {
  console.log(parse(content));
  return (
    
      <>
     
      <Link to={`/post/${$id}`}>
      <div className="container py-4">
    <div className="card mx-auto" style={{ maxWidth: '800px' }}>
        {/* Post Title */}
        <div className="card-header text-center">
            <h1 className="h4 font-weight-bold mb-0">{title}</h1>
        </div>

        {/* Post Image */}
        <div className="position-relative">
            <img
                src={service.getFilePreview(featuredImage)}
                alt={title}
                className="card-img-top"
            />
            
           </div>
                   

        {/* Post Content */}
        <div className="card-body">
            <div className="browser-css">
                {parse(content)}
            </div>
        </div>
    </div>
</div>
</Link>
</>
   
  );
}

export default PostCard;
