import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import CartIcon from './cart-icon.component'


// ToggleCartHidden đã định nghĩa ở type defs
// toggleCartHidden là mutation đã viết ở resolvers
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const CartIconContainer = () => (
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {
      toggleCartHidden => {
        console.log('CartIconContainer');
        return <CartIcon toggleCartHidden={toggleCartHidden} />;
      }
    }
  </Mutation>
);

export default CartIconContainer;