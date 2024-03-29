import React from 'react'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {toggleCartHidden} from '../../redux/cart/cart.actions.js'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

const CartIcon = ({toggleDropdown,itemCount}) => (
    <div className='cart-icon' onClick={toggleDropdown}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
)
const mapDispatchToProps = dispatch => ({
    toggleDropdown: () => dispatch(toggleCartHidden())
})
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})
export default connect(mapStateToProps,mapDispatchToProps)(CartIcon)