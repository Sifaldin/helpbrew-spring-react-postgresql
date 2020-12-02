import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import custom styles for our application
import "./css/App.css";


// Import pages

import Auth from "./services/Auth";
import Navbar from "./components/layout/Navbar";
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/home/templates/HomePage";
import PostsPage from "./components/posts/templates/PostsPage";
import SinglePost from "./components/posts/templates/SinglePost";
import ThreadPage from "./components/chat/ThreadPage";

import ProfilePage from "./components/profile/ProfilePage";
import NewGiverPost from "./components/posts/templates/NewGiverPost";
import NewRequestPost from "./components/posts/templates/NewRequestPost";
import Api from "./api/Api";
import Modal from './components/posts/templates/Modal'


function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  Auth.bindLoggedInStateSetter(setLoggedIn);

  //Fetches all the posts, to be used and filtered depending on functionality by App child components
  useEffect(() => {
    if (loggedIn) {
      const fetchPosts = async () => {
        const response = await Api.get(`/posts`);
        setPosts(response.data);
      };
      fetchPosts();
    }
  }, [loggedIn]);

  //Fetches the logged in user(includes user picture, name and email), to be used by App child components
  useEffect(() => {
    if (loggedIn) {
      Api.get("/user/me").then((response) => {
        const user = response.data;
        setUser(user);
      });
    }
  }, [loggedIn]);

  //Fetches logged in user's posts, to be used and filtered depending on functionality by App child components
  useEffect(() => {
    if (loggedIn) {
      const fetchPosts = async () => {
        const posts = await Api.get(`/posts`).then((res) => res.data);
        //Filters posts posted only by the logged in user
        const userPosts = posts.filter((post) => post.email === user.email);
        setUserPosts(userPosts);
      };
      fetchPosts();
    }

  }, [loggedIn, user]);


  const loggedInRouter = (
    //React Router manages all the routes in the application
    <Router>
      <Navbar onLogout={() => Auth.logout()} />

      <div className="container mt-5">
        <Switch>
          {/* The route displays the application's homepage */}
          <Route path="/" exact>
            <HomePage userPosts={userPosts} user={user} />
          </Route>

          <Route path="/user" exact>
            <ProfilePage user = {user} setUser = {setUser} />
          </Route>

          {/* Givewaways, skills and monetary support categories are displayed by
          the same component - PostsPage. PostsPage recieves one of the three category names
          as props. The category name props is used by PostsPage in order to
          display posts belonging to only of the three categories.
           */}
          <Route path="/posts/category/giveaways" exact>
            <PostsPage category={"giveaways"} posts={posts} />
          </Route>

          <Route path="/posts/category/skills" exact>
            <PostsPage category={"skills"} posts={posts} />
          </Route>

          <Route path="/posts/category/monetary-support" exact>
            <PostsPage category={"monetary-support"} posts={posts} />
          </Route>

          {/* This route is used to create new posts when user clicks on new post button
          displayed in the NavBar */}
          <Route exact path="/posts/give" >
            <NewGiverPost setPosts={setPosts} user={user}/>
          </Route>

          <Route exact path="/posts/request">
            <NewRequestPost setPosts={setPosts} user={user} />
          </Route>

          <Route exact path="/posts/">
            <Modal />
          </Route>

          

          {/* This route is used to display details of a single post. */}
          <Route path="/posts/:id">
            <SinglePost />
          </Route>

          {/* The functionality for the routes below is not implemented yet.
          Uncomment or remove if the routes are not needed.
          */}

          {/* <Route path="/chat" exact>
            <ThreadPage />
          </Route>

          <Route path="/chat/:id">
            <ThreadPage />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );

  // The first page displayed by the app is the login page.
  return loggedIn ? loggedInRouter : <LoginPage />;
}

export default App;
