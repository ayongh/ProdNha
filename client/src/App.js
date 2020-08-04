import React, { Component } from 'react';
import {Actionlogin, ActionLoading, ActionError} from '../src/redux/Action/loginAction'
import {authDispatch} from './redux/DispatchAction/loginDispatch' //'./DispatchAction/loginDispatch'

import {
  BrowserRouter,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import {connect} from 'react-redux'
import {ActionUserIntialize} from './redux/Action/userinfoAction'

//component CSS
import './App.css';
import './component/CSS/login.css';
import './component/CSS/signup.css';
import './component/CSS/searchHome.css';
import './component/CSS/pswd_rest.css';
import './component/CSS/userprofile.css'
import './component/CSS/video.css'
import './component/CSS/responsive.css'


//public facing interface
import Login from './component/public/login';
import Signup from './component/public/signup';
import PasswordReset from './component/public/pswd_reset';
import UserID from './component/public/pswd_userID';

//Other Subcomponent like loading and 404 Page
import Filenotfound from './component/fileNotfound';
import Loading from './component/loading';
import NoInternet from './component/noInternet';

//Private Main page that allows you to browse and search 
import HomePage from './component/private/MainHomepage' //'./Component/private/MainHomepage';
import SearchPage from './component/private/Searchpage';
import BrowsePage from './component/private/Browsepage'
import Main_Browse_Show from './component/private/allBrowseContent';
import Video from './component/private/video'
import Upload from './component/private/upload'
import AboutUs from './component/public/aboutUs'
import Detail from './component/public/detailpage'
import Categorie from './component/public/categorie'

import publicVideo from './component/public/public_video'

// private
import UserProfile from './component/private/profile/userprofile'
import Update_Username from './component/private/profile/update_username'
import Update_Email from './component/private/profile/updateProfileEmail'
import Update_Email_Validation from './component/private/profile/updateEmailConfirmation'

//protected
const ProtectedRoute = ({ component: Comp, loggedIn,validlogin, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if(loggedIn)
        {
          return <Comp {...props}/>
        }
        else
        {
          if(path=== "/pswdreset/NewPswd" || path==="/pswdreset/ConfirmationCode")
          {
            return <Redirect to={{pathname: "/pswdreset", state: {prevLocation: path, route: "You need to login first!"}}}/>
          }
          else if(path === "/signup/emailValidation")
          {
            return <Redirect to={{pathname: "/signup", state: {prevLocation: path, error: "You need to login first!"}}}/>
          }

          return <Redirect to={{pathname: "/", state: {prevLocation: path, error: "You need to login first!"}}}/>
        }//else
        
      }} //render
    /> //Route
  )
}

class App extends Component
{
  componentDidMount()
  {
    authDispatch(this.props)
  }

  render()
  {
    if(this.props.state.login.loading)
    {
      return <Loading/>
    }
    else
    {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/signup" component={Signup}/>

            <Route  exact path="/pswdreset" component={UserID}/>
            <Route  exact path="/course/search/class/:searchtext" component={AboutUs}/>
            <Route  exact path="/course/detail/:courseID" component={Detail}/>
            <Route  exact path="/course/categorieinfo/:categorie" component={Categorie}/>

            <Route  exact path="/video/:classID/:videoID" component={publicVideo}/>

            <ProtectedRoute  exact path="/pswdreset/NewPswd" loggedIn={this.props.state.loginFlag} component={PasswordReset}/>               


            <Route  exact path="/" component={Login}/>
            {/* Main Homepage with recommended classes */}
            <ProtectedRoute exact path="/Homepage" loggedIn={this.props.state.login.loginFlag} component={HomePage}/>
            {/* Main browse Content */}
            <ProtectedRoute exact path="/browse/movie" loggedIn={this.props.state.login.loginFlag} component={BrowsePage}/>
            <ProtectedRoute exact path="/categorie/:categorie" loggedIn={this.props.state.login.loginFlag} component={Main_Browse_Show}/>
            {/* Search class using title and other factors */}
            <ProtectedRoute exact path="/search/movie" loggedIn={this.props.state.login.loginFlag} component={SearchPage}/>

            <ProtectedRoute exact path="/upload" loggedIn={this.props.state.login.loginFlag} component={Upload}/>
            <ProtectedRoute exact path="/profile" loggedIn={this.props.state.login.loginFlag} component={UserProfile}/>
            <ProtectedRoute exact path="/profile/username" loggedIn={this.props.state.login.loginFlag} component={Update_Username}/>
            <ProtectedRoute exact path="/profile/email" loggedIn={this.props.state.login.loginFlag} component={Update_Email}/>
            <ProtectedRoute exact path="/profile/email/validation" loggedIn={this.props.state.login.loginFlag} component={Update_Email_Validation}/>
            <ProtectedRoute exact path="/watch/:classID/:videoID" loggedIn={this.props.state.login.loginFlag} component={Video}/>

            <Route exact path="/noIternet" loggedIn={this.props.state.login.loginFlag} component={NoInternet}/> 
            <ProtectedRoute component={Filenotfound}/>
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

const mapToState = (state) =>{
  return {
    state:state
  }
}

export default connect(mapToState, {Actionlogin, ActionLoading, ActionError,ActionUserIntialize}) (App);
