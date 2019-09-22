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
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          setCurrentUserRedux({
            id: snapshot.id,
            ...snapshot.data()
          })

          /* this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }) */
        })

      }else{
        /* userAuth should be always null in this case meaning the user logsout
        and we catch that event from our subscriber/observer onAuthStateChanged. */
        setCurrentUser(userAuth)
        //this.setState({currentUser:userAuth})
      }
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    const {currentUserRedux} = this.props
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          {/* {
            if(!currentUserRedux){
              return <Route path='/signin' component={SignInAndSignUpPage} />
            }else{
              return <Route path='/' component={HomePage} />
            }
          } */}
          <Route 
            exact
            path='/signin'
            render={() => currentUserRedux ? (
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
  setCurrentUserRedux: user => dispatch(setCurrentUser(user))
  //setCurrentUserRedux: user => dispatch({type:'SET_CURRENT_USER',payload:user})
})
const mapsStateToProps = ({user}) => ({
  currentUserRedux: user.currentUser
})
export default connect(mapsStateToProps,mapDispatchToProps)(App);