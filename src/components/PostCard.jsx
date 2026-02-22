import React from "react";
import { service as appwriteService } from "../appwrite";
import { Link } from "react-router-dom";

function PostCard({ $id, featuredImage, title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full rounded-xl p-4 bg-green-100">
        <div className="w-full justify-center mb-4">
          <img
            src={`${appwriteService.getFilePreview(featuredImage)}`}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
