const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'A comprehensive e-commerce API with authentication, product management, cart, orders, and admin functionality',
      contact: {
        name: 'Rishi Thakkar',
        email: 'rishi@example.com'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? process.env.API_BASE_URL || 'http://localhost:5000'
          : 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            name: {
              type: 'string',
              description: 'User name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Product ID'
            },
            name: {
              type: 'string',
              description: 'Product name'
            },
            description: {
              type: 'string',
              description: 'Product description'
            },
            price: {
              type: 'number',
              description: 'Product price'
            },
            category: {
              type: 'string',
              description: 'Product category'
            },
            stock: {
              type: 'number',
              description: 'Available stock'
            },
            images: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Product images'
            },
            rating: {
              type: 'number',
              description: 'Product rating'
            },
            reviews: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Review'
              }
            }
          }
        },
        Review: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Review ID'
            },
            user: {
              type: 'string',
              description: 'User ID who wrote the review'
            },
            product: {
              type: 'string',
              description: 'Product ID'
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Rating from 1 to 5'
            },
            comment: {
              type: 'string',
              description: 'Review comment'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Cart: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Cart ID'
            },
            user: {
              type: 'string',
              description: 'User ID'
            },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: {
                    $ref: '#/components/schemas/Product'
                  },
                  quantity: {
                    type: 'number',
                    description: 'Quantity of the product'
                  }
                }
              }
            },
            totalPrice: {
              type: 'number',
              description: 'Total cart price'
            }
          }
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Order ID'
            },
            user: {
              type: 'string',
              description: 'User ID'
            },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: {
                    $ref: '#/components/schemas/Product'
                  },
                  quantity: {
                    type: 'number'
                  },
                  price: {
                    type: 'number'
                  }
                }
              }
            },
            totalAmount: {
              type: 'number',
              description: 'Total order amount'
            },
            status: {
              type: 'string',
              enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
              description: 'Order status'
            },
            shippingAddress: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                zipCode: { type: 'string' },
                country: { type: 'string' }
              }
            },
            paymentMethod: {
              type: 'string',
              description: 'Payment method used'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Address: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Address ID'
            },
            user: {
              type: 'string',
              description: 'User ID'
            },
            street: {
              type: 'string',
              description: 'Street address'
            },
            city: {
              type: 'string',
              description: 'City'
            },
            state: {
              type: 'string',
              description: 'State'
            },
            zipCode: {
              type: 'string',
              description: 'ZIP code'
            },
            country: {
              type: 'string',
              description: 'Country'
            },
            isDefault: {
              type: 'boolean',
              description: 'Whether this is the default address'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Error message'
            },
            error: {
              type: 'string',
              description: 'Detailed error information'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              description: 'Success message'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      },
      {
        cookieAuth: []
      }
    ]
  },
  apis: ['./routes/*/*.js', './controllers/*/*.js']
};

const specs = swaggerJSDoc(options);

module.exports = {
  specs,
  swaggerUi
};
