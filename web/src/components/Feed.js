import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Feed = () => {
  let navigate = useNavigate();
  let [posts, setPosts] = useState(null);

  const getPosts = async () => {
    try {
      let token = Cookies.get("token");
      if (!token) {
        throw new Error("Missing token");
      }
      let response = await axios.get("http://localhost:3001/feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
      navigate("/");
    }
  };

  useEffect(() => {
    let token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      let exp = jwt_decode(token);
      if (exp < Date.now() / 1000) {
        navigate("/login");
        return;
      } else {
        getPosts().then((res) => {
          setPosts(res);
        });
      }
    } catch (error) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div>
      Feed
      {posts ? (
        posts.map((post, i) => {
          return (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Feed;
