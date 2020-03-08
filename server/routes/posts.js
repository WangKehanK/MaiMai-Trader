var posts = [
  {
    postId: "507f1f77bcf86cd799439011",
    title: "漂亮桌子",
    description: "搬家甩卖！！！（桌子，椅子，餐桌，电饭锅，厨房 方形梳妆镜 20刀↵4. 实木书桌 $50",
    category: "Furniture",
    condition: "New",
    image: {},
    delieveryMethod: {
      "type": "pickUp",
      "address": "1079 Commonwealth Avenue",
      "carrier": "UPS"
    },
    price: {
      "offerPrice": 15,
      "originalPrice": 35
    },
    user: {
      userId: "myz1998313",
      userName: "马小跳",
      school: "波士顿大学"
    }
  }
];

var postSchema = `
      type Post {
        postId: String
        title: String
        description: String
        category: Category
        condition: Condition
        image: [String]
        delieveryMethod: DelieveryMethod
        price: Price
        user: User
      }

      type DelieveryMethod {
        type: String
        address: String
        carrier: String
      }

      enum Condition {
        New
        GentlyUsed
        Used
        VeryUsed
      }

      enum Category {
        Furniture
        ElectronicDevice
        Fashion
        HomeAppliance
      }

      type Price {
        offerPrice: Float
        originalPrice: Float
      }
`;

var getPost = function (args) { console.log(args); return posts[0]; }
var retrievePosts = function (args) {
  return posts;
}

exports.postSchema = postSchema
exports.getPost = getPost
exports.retrievePosts = retrievePosts