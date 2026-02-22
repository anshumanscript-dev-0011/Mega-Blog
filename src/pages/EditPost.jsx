import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import { service as appwriteService } from "../appwrite";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  let [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [navigate, slug]);

  return post ? (
    <div>
      <Container>
        <PostForm post = {post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
