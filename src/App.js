// src/App.js

import React from "react";
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Media from 'react-media';

import './App.css'

//mobile & universal components
import Splashscreen from './components/Splashscreen/Splashscreen';
import Homefeed from "./components/Homefeed/Homefeed";
import Profile from "./components/Profile/Profile";
import LookbookEditor from './components/LookbookEditor/LookbookEditor';
import WardrobeEditor from './components/WardrobeEditor/WardrobeEditor';
import Explore from './components/Explore/Explore';
import IndividualPost from './components/IndividualPost/IndividualPost';
import Viewer from './components/Viewer/Viewer';

//desktop components
import DesktopModal from './components/DesktopModal/DesktopModal'
import LoadingDesktop from './components/Loading/LoadingDesktop';
import Base from './components/Base/Base';

function App() {
  return (
    <Router>
      <Media queries={{
        phone: '(max-width: 812px)',
        desktop: '(min-width: 813px)'
      }}>
        {matches => (
          <>
            {matches.phone &&
              <Switch>
                <Route exact path='/'>
                  <Splashscreen />
                </Route>
                <Route exact path='/home'>
                  <Homefeed matches={matches}/>
                </Route>
                <Route exact path='/profile/:_id'>
                  <Profile matches={matches}/>
                </Route>
                <Route exact path='/lookbook'>
                  <LookbookEditor matches={matches}/>
                </Route>
                <Route exact path ='/wardrobe'>
                  <WardrobeEditor matches={matches}/>
                </Route>
                <Route exact path ='/explore'>
                  <Explore />
                </Route>
                <Route exact path ='/post/:postId'>
                  <IndividualPost matches={matches}/>
                </Route>
                <Route exact path ='/viewer/:type/:albumId/:userId/:index'>
                  <Viewer />
                </Route>
              </Switch>
            }
            {matches.desktop &&
              <DesktopViewer>
                <SwitchDiv>
                  <Switch>
                    <Route path = '/:base/'>
                      <Base/> 
                    </Route>
                  </Switch>
                </SwitchDiv>
                <SwitchDiv>
                  <div style={{height: '100%', borderLeft: '1px solid lightgrey', borderRight: '1px solid lightgrey'}}>
                  <Switch>
                    <Route exact path='/'>
                      <Splashscreen />
                    </Route>
                    <Route exact path='/home'>
                      <Homefeed matches={matches}/>
                    </Route>
                    <Route exact path='/profile/:_id'>
                      <Profile matches={matches}/>
                    </Route>
                    <Route exact path='/lookbook'>
                      <LookbookEditor matches={matches}/>
                    </Route>
                    <Route exact path ='/wardrobe'>
                      <WardrobeEditor matches={matches}/>
                    </Route>
                    <Route exact path ='/explore'>
                      <Explore/>
                    </Route>
                    <Route exact path ='/post/:postId'>
                      <IndividualPost matches={matches}/>
                    </Route>
                    <Route exact path ='/viewer/:type/:albumId/:userId/:index'>
                      <Viewer/>
                    </Route>
                  </Switch>
                  </div>
                </SwitchDiv>
                <SwitchDiv>
                  <DesktopModal/>
                </SwitchDiv>
              </DesktopViewer>
            }
          </>
        )}
      </Media>
    </Router>
  );
}

const SwitchDiv = styled.div`
  height: 100%;
  width: 100%;
`

const DesktopViewer = styled.div`
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  width: 100%;
  height: 100vh;
  justify-items: center;
  align-items:center;
  background-color: white;
`

export default App;