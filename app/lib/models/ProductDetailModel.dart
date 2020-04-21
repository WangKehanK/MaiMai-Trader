import 'package:json_annotation/json_annotation.dart';

part 'ProductDetailModel.g.dart';

@JsonSerializable()
class Product {
  final String title;
  final String description;
  final String category;
  final String condition;
  final List<String> image;
  final Price price;
  final User user;
  final Contact contact;
  Product(
    this.title,
    this.description,
    this.category,
    this.condition,
    this.image,
    this.price,
    this.user,
    this.contact,
  );

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
  Map<String, dynamic> toJson() => _$ProductToJson(this);
}

@JsonSerializable()
class Price {
  final int offerPrice;
  final int originalPrice;
  Price({this.offerPrice, this.originalPrice});

  factory Price.fromJson(Map<String, dynamic> json) => _$PriceFromJson(json);
  Map<String, dynamic> toJson() => _$PriceToJson(this);
}

@JsonSerializable()
class User {
  final String userId;
  final String userName;
  User(this.userId, this.userName);

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}

@JsonSerializable()
class Contact {
  final String email;
  final String phone;
  Contact(this.email, this.phone);

  factory Contact.fromJson(Map<String, dynamic> json) =>
      _$ContactFromJson(json);
  Map<String, dynamic> toJson() => _$ContactToJson(this);
}
