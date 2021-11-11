import bcrypt from 'bcryptjs';
const data = {
  users:[
    {
      name:'Abir',
      email:'admin@example.com',
      password: bcrypt.hashSync('1234',8),
      isAdmin: true,
    },
    {
      name:'ghazi',
      email:'user@example.com',
      password: bcrypt.hashSync('1234',8),
      isAdmin: false,
    },
  ],
    products: [
      {
      
        name: 'Rabbit Handmade',
        category: 'Toys',
        image: '/images/p1.jpg',
        price: 25,
        countInStock: 10,
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        
        name: 'jouets de pépinière en dinosaure',
        category: 'Toys',
        image: '/images/p2.jpg',
        price: 15,
        countInStock: 20,
        rating: 4.0,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        
        name: 'Wall Fish',
        category: 'Decoration Articles',
        image: '/images/p3.jpg',
        price: 50,
        countInStock: 0,
        rating: 3.8,
        numReviews: 17,
        description: 'high quality product',
      },
      {
       
        name: 'Dream Catcher',
        category: 'Decoration Articles',
        image: '/images/p4.jpg',
        price: 35,
        countInStock: 15,
        rating: 5,
        numReviews: 20,
        description: 'high quality product',
      },
      {
       
        name: 'Round Baskets',
        category: 'Decoration Articles',
        image: '/images/p5.jpg',
        price: 65,
        countInStock: 5,
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        name: 'Handbag',
        category: 'Accessories',
        image: '/images/p6.jpg',
        price: 99,
        countInStock: 12,
        rating: 4.9,
        numReviews: 15,
        description: 'high quality product',
      },
    ],
  };
export default data;