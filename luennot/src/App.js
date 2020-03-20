import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Navigation from './components/Navigation'
import Basics from './lectures/basics.js'
import SimpleState from './lectures/simple_state.js'
import ComplexState from './lectures/complex_state.js'
import NoteManager from './lectures/note_manager.js'

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Navigation />
                <Switch>
                    <Route path="/basics" component={Basics} />
                    <Route path="/simplestate" component={SimpleState} />
                    <Route path="/complexstate" component={ComplexState} />
                    <Route path="/notemanager" component={NoteManager} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App