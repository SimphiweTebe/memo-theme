import React from 'react'
import ReactDOM from "react-dom";
import './sass/main.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Context
import CoursesState from './context/courseContext/CourseState'
//COMPONENTS
import SideNav from './components/layout/SideNav'
import Home from './components/HomePage'
import CourseListPage from './components/CourseListPage';
import CourseDetailsPage from './components/CourseDetailsPage'
import PageComponent from './components/PageComponent';
import PaymentPage from './components/PaymentPage';
import ChatPage from './components/ChatPage';
import GroupsPage from './components/GroupsPage';
import StudentsPage from './components/StudentsPage';
import SupportPage from './components/SupportPage';
import AccountPage from './components/AccountPage';
import SettingsPage from './components/SettingsPage';

function App() {

    return (
        <CoursesState>
            <div className="wrapper">
                <SideNav />

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/course-list' component={CourseListPage} />
                    <Route path='/course/:slug' component={CourseDetailsPage} />
                    <Route path='/payment' component={PaymentPage} />
                    <Route path='/chat' component={ChatPage} />
                    <Route path='/payment' component={PaymentPage} />
                    <Route path='/groups' component={GroupsPage} />
                    <Route path='/students' component={StudentsPage} />
                    <Route path='/support' component={SupportPage} />
                    <Route path='/account' component={AccountPage} />
                    <Route path='/settings' component={SettingsPage} />
                </Switch>
            </div>
        </CoursesState>
    )
}

// Routes
const routes = (

    <Router>
        <Route path="/" component={App} />
    </Router>

);

ReactDOM.render((routes), document.getElementById('root'));

