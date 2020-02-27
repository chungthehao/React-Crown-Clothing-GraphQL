import React from 'react'
import { Mutation, Query } from 'react-apollo'
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

const CartIconContainer = () => (
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {
      toggleCartHidden => (
        <Query query={GET_ITEM_COUNT}>
            {
              ({ data: { itemCount } }) => {
                console.log('CartIconContainer');
                return <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />;
              }
            }
        </Query>
      )
    }
  </Mutation>
);

export default CartIconContainer;