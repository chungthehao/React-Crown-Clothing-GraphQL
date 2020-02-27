import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartDropdown from './cart-dropdown.component';


// AddItemToCart đã định nghĩa ở type defs
// addItemToCart là mutation đã viết ở resolvers
// const ADD_ITEM_TO_CART = gql`
//   mutation AddItemToCart {
//     addItemToCart @client
//   }
// `;

// ToggleCartHidden đã định nghĩa ở type defs
// toggleCartHidden là mutation đã viết ở resolvers
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
      cartItems @client
  }
`;

const CartDropdownContainer = () => (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            toggleCartHidden => (
                <Query query={GET_CART_ITEMS}>
                    {
                        ({ data: { cartItems } }) => <CartDropdown cartItems={cartItems} toggleCartHidden={toggleCartHidden}  />
                    }
                </Query>
            )
        }
    </Mutation>
);

export default CartDropdownContainer;