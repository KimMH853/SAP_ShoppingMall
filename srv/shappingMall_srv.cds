using demo.shoppingMall from '../db/shoppingMall';

service ShoppingMallService {
 
 entity Product 
 as projection on shoppingMall.Product;
 
 entity Order 
 as projection on shoppingMall.Order;

 entity Customer 
 as projection on shoppingMall.Customer;

 entity Review 
 as projection on shoppingMall.Review;

 entity Cart 
 as projection on shoppingMall.Cart;
 
}