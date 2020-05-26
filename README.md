# Documentation

## API Documentation

The API end points are as follows.

### **GET** `/api/v1/product/get?query`

  This Route is used to fetch product from the Database. Based on the query parameter the product retrieval can be specified.

  `limit` This query parameter will limit the product received. The default parameter is 10.

  `category` This query parameter will fetch product belonging to a specific category. Multiple categories can be specified by `category=food,category=fruit`

  `stock` This query parameter will fetch product belonging to a specific stock boundary. Only one `stock` parameter will fetch product greater than equal that stock. If two stock query parameter is provided it wll fetch product greater than equal firs one and less than equal second one like `stock=10,stock=20` will fetch  product where `product.stock > 10 && product.stock < 20`.

  `price` Same as stock

  `sort` based on the parameter will sort the data based on the parameter.`sort=title` will sort product ascending and `sort=-title` will sort product descending. Multiple sort parameter can be provide. Please check the `stock` section for details

### **POST** `/api/v1/product/save`

This route will save a product to the database. Necessary parameters are:

- title
- category. Multiple category can be added. Just send it followed by ','.
- price
- stock
- image. This will be auto resized by server to 200x200
- unit.

### **GET** `/api/v1/order/get`

This will fetch all the orders of an user based on the JWT Token. JWT Authorization needed.

### **POST** `/api/v1/order/new`

This endpoint will store an order to the database. JWT Authorization needed. User collection is updated by inserting order id. That can be used later to fetch all user orders. Necessary parameters are:

`orderItems: [
 "title",
 "price",
 "quantity"
 "productId"
]
"totalPrice"`

### **POST** `/api/v1/register`

This endpoint will register a new user. Necessary parameters are as follows:

- name
- email
- password
- passwordConfirm

### **POST** `/api/v1/login`

This endpoint will log an user in. JWT Authorization needed. Necessary parameters are:

- email
- password

### **POST** `/api/v1/verify`

 This endPoint is for only JWT Authorization.

### **GET** `/api/v1/account`

This endpoint will fetch user information. JWT Authorization needed.

### **PUT** `/api/v1/account`

This endpoint will update an user info. JWT Authorization needed.

## Front-End Documentation

The app has three routes.

### `/`

This is the Homepage.

### `/product`

This is the product show case. product can be placed in the cart and order can be sent from this route.

Product page has an Cart element. Where based on user input order is rendered. Navbar element for displaying Nav. Products are rendered dynamically based on the query set.

### `/login`

User can login from this page.

### `/register`

User can register from this page.
