import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import custom styles for our application
import "./css/App.css";

import Auth from "./services/Auth";
import Navbar from "./components/layout/Navbar";

// Import pages
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/home/templates/HomePage";
import PostsPage from "./components/posts/templates/PostsPage";
import SinglePost from "./components/posts/templates/SinglePost";
import ThreadPage from "./components/chat/ThreadPage";

import ProfilePage from "./components/profile/ProfilePage";
import NewPostForm from "./components/posts/templates/NewPostForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());

  Auth.bindLoggedInStateSetter(setLoggedIn);

  const loggedInRouter = (
    //React Router manages all the routes in the application
    <Router>
      <Navbar onLogout={() => Auth.logout()} />

      <div className="container mt-5">
        <Switch>
          {/* The route displays the application's homepage */}
          <Route path="/" exact>
            <HomePage />
          </Route>

          {/* Givewaways, skills and monetary support categories are displayed by
          the same component - PostsPage. PostsPage recieves one of the three category names
          as props. The category name props is used by PostsPage in order to
          display posts belonging to only of the three categories.
           */}
          <Route path="/posts/category/giveaways" exact>
            <PostsPage category={"giveaways"} />
          </Route>

          <Route path="/user" exact>
            <ProfilePage />
          </Route>

          <Route path="/posts/category/skills" exact>
            <PostsPage category={"skills"} />
          </Route>

          <Route path="/posts/category/monetary-support" exact>
            <PostsPage category={"monetary-support"} />
          </Route>

          {/* This route is used to create new posts when user clicks on new post button
          displayed in the NavBar */}
          <Route path="/posts/new">
            <NewPostForm />
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
