// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css'

import Splashscreen from './components/Splashscreen/Splashscreen';
import Homefeed from "./components/Homefeed/Homefeed";
import Profile from "./components/Profile/Profile";
import LookbookEditor from './components/LookbookEditor/LookbookEditor';
import WardrobeEditor from './components/WardrobeEditor/WardrobeEditor';
import Explore from './components/Explore/Explore';
import IndividualPost from './components/IndividualPost/IndividualPost';
import Viewer from './components/Viewer/Viewer';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Splashscreen />
        </Route>
        <Route exact path='/home'>
          <Homefeed />
        </Route>
        <Route exact path='/profile/:_id'>
          <Profile />
        </Route>
        <Route exact path='/lookbook'>
          <LookbookEditor/>
        </Route>
        <Route exact path ='/wardrobe'>
          <WardrobeEditor/>
        </Route>
        <Route exact path ='/explore'>
          <Explore/>
        </Route>
        <Route exact path ='/post/:postId'>
          <IndividualPost/>
        </Route>
        <Route exact path ='/viewer/:type/:albumId/:userId/:index'>
          <Viewer/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;