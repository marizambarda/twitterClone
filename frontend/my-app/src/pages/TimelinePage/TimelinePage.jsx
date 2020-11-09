import React, { useState, useEffect } from "react";
import api from "../../api";
import { Container, Row, Col } from "react-bootstrap";
import "./TimelinePage.scss";
import PageWithMenu from "../../components/PageWithMenu";
import PostsList from "../../components/PostsList";
import CreatePostForm from "../../components/CreatePostForm";


function TimelinePage({loggedUser}){
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    async function getPosts(){
      try{
        const response = await api.get('/posts')
        setPosts(response.data)
      } 
      catch (error){
        if (error.response) {
          alert(error.response.data.error)
        } else {
          throw error
        }
      }
    }
    getPosts();
    
  },[])

  return(
    <div className="timelinePage">
      <PageWithMenu loggedUser={loggedUser}>
        <div class="createPostFormContainer">
          <CreatePostForm loggedUser={loggedUser} defaultText={""} buttonText={"Twittar"}/>
        </div>
        <PostsList posts={posts} loggedUser={loggedUser}/>
      </PageWithMenu>
    </div>
  )
}



export default TimelinePage;