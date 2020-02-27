import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount } from './cart.utils';

// - type definition
// extend nhung gi da co san o phia graphql backend (o day chua co, nhung sau nay co thi no tu extend)
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

// Viet query GET_CART_HIDDEN
// @client directive: to specify to Apollo that this is on the client side
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// - Resolver
// Dinh nghia mutations, queries, additional types
export const resolvers = {
  // Mutation is at the very highest level of our actual cache object
  Mutation: {
    // _root: parent o phia backend, truong hop nay no la empty object {}
    // _args: la cac tham so duoc pass vo ma minh co the lay duoc
    // _context: la thu ma apollo client co the access (bao gom cache va client)
    // _info: has information about our query or our mutation
    toggleCartHidden: (_root, _args, _context, _info) => {
      const { cache } = _context;
      const data = cache.readQuery({
        query: GET_CART_HIDDEN
      });
      const { cartHidden } = data;

      // toggle the value
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      return !cartHidden;
    },

    addItemToCart: (_root, _args, _context, _info) => {
      const { item } = _args;
      const { cache } = _context;

      const data = cache.readQuery({
        query: GET_CART_ITEMS
      });
      const { cartItems } = data;

      // add item to cart
      const newCartItems = addItemToCart(cartItems, item);

      // Update cartItems in local cache state
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
      });

      // Update itemCount
      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) }
      });

      return newCartItems;
    }
  }
};
