import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight } from 'lodash' // ~ 'compose' in 'react-apollo' which has been removed
import { gql } from 'apollo-boost'

import CartIcon from './cart-icon.component'


// ToggleCartHidden đã định nghĩa ở type defs
// toggleCartHidden là mutation đã viết ở resolvers
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const CartIconContainer = (props) => {
  // console.log(props)
  const { data: { itemCount }, toggleCartHidden } = props;

  return (
    <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
  )
};

export default flowRight(
  graphql(GET_ITEM_COUNT), // gói trong 'data'
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' }) // mặc định thì tên là 'mutate'
)(CartIconContainer);