import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import routes from './routes'

import './index.css';

import Navigation from './components/partials/Navigation'
import Footer from './components/partials/Footer'

const Application = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="app">
                    <Navigation />
                    { routes.map((route, k) => <Route key={k} path={route.path} component={route.component} {...route} />) }
                    <Footer />
                </div>
            </Router>
        </Provider>    
    )
}

ReactDOM.render(
    <Application />, 
    document.getElementById('app')
);

module.hot.accept();
