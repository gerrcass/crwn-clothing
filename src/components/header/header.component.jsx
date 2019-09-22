import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { ReactComponent as Logo} from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import './header.styles.scss'


const Header = ({currentUser,hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/shop'>CONTACT</Link>
            {
                currentUser ?
                    <div className='option' onClick={() =>auth.signOut()}>SIGN OUT</div>
                :
                    <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown />
        }

    </div>
)

/* advanced destructuring here: from the state get only user.currentUser and cart.hidden
(those are the only properties anyway, just for using the ES6 feature below when passing
same key/value as just one entry
 */
const mapsStateToProps = ({ user: {currentUser}, cart: {hidden} }) => ({
    currentUser,
    hidden    
})
export default connect(mapsStateToProps)(Header)