namespace demo.shoppingMall;

using {
    cuid,
    managed,
    Currency,
    Country
} from '@sap/cds/common';

entity Product {
    key product_id          : String @title: '상품 아이디';
        product_name        : String  @title: '상품명';
        product_description : String  @title: '상품설명';
        product_image       : String  @title: '상품이미지';
        product_price       : Integer @title: '가격';
        stock_quantity      : Integer @title: '재고';
        category_id         : Integer @title: '카테고리 아이디';

};

entity Order {
    key order_id        : Integer @title: '주문 아이디';
        user_id         : Integer @title: '주문자 아이디';
        product_id      : Integer @title: '주문 상품';
        quantity        : Integer @title: '주문 수량';
        total_price     : Integer @title: '총 가격';
        purchase_date   : Date    @title: '주문일';
        payment_status  : String  @title: '결제상태';
        shipping_status : String  @title: '배송상태';
};

entity Customer {
    key user_id       : Integer @title: '유저 아이디';
        user_name     : String  @title: '이름';
        user_nickname : String  @title: '닉네임';
        email         : String  @title: '이메일';
        phone_number  : String  @title: '폰 번호';
        address       : String  @title: '주소';
        user_type     : String  @title: '유저 타입';

};

entity Review {
    key review_id  : Integer @title: '리뷰  아이디';
        user_id    : String  @title: '유저 아이디';
        product_id : String  @title: '상품 아이디';
        rating     : String  @title: '평점';
        comment    : String  @title: '리뷰 내용';
        created_at : Date    @title: '리뷰 작성일';
};

entity Cart {
    key cart_id    : Integer @title: '장바구니 아이디';
        user_id    : String  @title: '유저 아이디';
        product_id : String  @title: '상품 아이디';
        quantity   : String  @title: '수량';
};
