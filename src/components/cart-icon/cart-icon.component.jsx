import React from 'react'
import {connect} from 'react-redux'
import {toggleCartHidden} from '../../redux/cart/cart.actions.js'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

const CartIcon = ({toggleDropdown}) => (
    <div className='cart-icon' onClick={toggleDropdown}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>0</span>
    </div>
)
const mapDispatchToProps = dispatch => ({
    toggleDropdown: () => dispatch(toggleCartHidden())
})
export default connect(null,mapDispatchToProps)(CartIcon)