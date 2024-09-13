import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "../App.css";


export default function Posts() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            console.log(slug)
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    console.log(post)

                }
                else {
                    navigate("/")
                    console('navigated to')
                };
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        

        <div className="container py-4">
    <div className="card mx-auto" style={{ maxWidth: '800px' }}>
        {/* Post Title */}
        <div className="card-header text-center">
            <h1 className="h4 font-weight-bold mb-0">{post.title}</h1>
        </div>

        {/* Post Image */}
        <div className="position-relative">
            <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="card-img-top"
            />
            
            {/* Author Action Buttons (Edit & Delete) */}
            {isAuthor && (
                <div className="position-absolute d-flex flex-column" style={{ top: '1rem', right: '1rem' }}>
                    <Link to={`/edit-post/${post.$id}`} className="mb-2">
                        <button type="button" className="btn btn-primary btn-sm w-100">
                            Edit
                        </button>
                    </Link>
                    <button type="button" className="btn btn-danger btn-sm w-100" onClick={deletePost}>
                        Delete
                    </button>
                </div>
            )}
        </div>

        {/* Post Content */}
        <div className="card-body">
            <div className="browser-css">
                {parse(post.content)}
            </div>
        </div>
    </div>
</div>


    ) : null;
}


