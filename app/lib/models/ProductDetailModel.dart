import 'package:json_annotation/json_annotation.dart';

part 'ProductDetailModel.g.dart';

// flutter pub run build_runner build

@JsonSerializable()
class ProductModel {
  String title;
  String description;
  String category;
  String subCategory;
  String condition;
  List<String> image;
  Price price;
  User user;
  Contact contact;
  ProductModel({
    this.title,
    this.description,
    this.category,
    this.condition,
    this.image,
    this.subCategory,
    this.price,
    this.user,
    this.contact,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) =>
      _$ProductModelFromJson(json);
  Map<String, dynamic> toJson() => _$ProductModelToJson(this);
}

@JsonSerializable()
class Price {
  int offerPrice;
  int originalPrice;
  Price({this.offerPrice, this.originalPrice});

  factory Price.fromJson(Map<String, dynamic> json) => _$PriceFromJson(json);
  Map<String, dynamic> toJson() => _$PriceToJson(this);
}

@JsonSerializable()
class User {
  String userId;
  String userName;
  User(this.userId, this.userName);

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}

@JsonSerializable()
class Contact {
  String email;
  String phone;
  Contact(this.email, this.phone);

  factory Contact.fromJson(Map<String, dynamic> json) =>
      _$ContactFromJson(json);
  Map<String, dynamic> toJson() => _$ContactToJson(this);
}
