import React from 'react';
import { Switch, Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

import './App.css';


import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth,createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUserRedux} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          setCurrentUserRedux({
            id: snapshot.id,
            ...snapshot.data()
          })
        })

      }else{
        /* userAuth should be always null in this case meaning the user logsout
        and we catch that event from our subscriber/observer onAuthStateChanged. */
        setCurrentUserRedux(userAuth)
      }
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    const {currentUser} = this.props
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route 
            exact
            path='/signin'
            render={() => currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
        
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  /* just to be clear this time I called setCurrentUserRedux instead of setCurrentUser. 
  But it can be called the same way as the user actions. */
  setCurrentUserRedux: user => dispatch(setCurrentUser(user))
  /* same as:
  setCurrentUserRedux: user => dispatch({type:'SET_CURRENT_USER',payload:user}) */
})
const mapsStateToProps = ({user}) => ({
  currentUser: user.currentUser
})
export default connect(mapsStateToProps,mapDispatchToProps)(App);