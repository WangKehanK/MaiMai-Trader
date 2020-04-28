// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ProductDetailModel.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ProductModel _$ProductModelFromJson(Map<String, dynamic> json) {
  return ProductModel(
    title: json['title'] as String,
    description: json['description'] as String,
    category: json['category'] as String,
    condition: json['condition'] as String,
    image: (json['image'] as List)?.map((e) => e as String)?.toList(),
    subCategory: json['subCategory'] as String,
    price: json['price'] == null
        ? null
        : Price.fromJson(json['price'] as Map<String, dynamic>),
    user: json['user'] == null
        ? null
        : User.fromJson(json['user'] as Map<String, dynamic>),
    contact: json['contact'] == null
        ? null
        : Contact.fromJson(json['contact'] as Map<String, dynamic>),
    createdTime: json['createdTime'] as String,
    expiryTime: json['expiryTime'] as String,
    isSellBefore: json['isSellBefore'] as bool,
    delieveryMethod: json['delieveryMethod'] == null
        ? null
        : DelieveryMethod.fromJson(
            json['delieveryMethod'] as Map<String, dynamic>),
  );
}

Map<String, dynamic> _$ProductModelToJson(ProductModel instance) =>
    <String, dynamic>{
      'title': instance.title,
      'description': instance.description,
      'category': instance.category,
      'subCategory': instance.subCategory,
      'condition': instance.condition,
      'image': instance.image,
      'price': instance.price.toJson(),
      // 'user': instance.user.toJson(),
      // 'contact': instance.contact.toJson(),
      // 'createdTime': instance.createdTime,
      'expiryTime': instance.expiryTime,
      'isSellBefore': instance.isSellBefore,
      'delieveryMethod': instance.delieveryMethod.toJson(),
    };

Price _$PriceFromJson(Map<String, dynamic> json) {
  return Price(
    offerPrice: json['offerPrice'] as int,
    originalPrice: json['originalPrice'] as int,
  );
}

Map<String, dynamic> _$PriceToJson(Price instance) => <String, dynamic>{
      'offerPrice': instance.offerPrice,
      'originalPrice': instance.originalPrice,
    };

User _$UserFromJson(Map<String, dynamic> json) {
  return User(
    userId: json['userId'] as String,
    userName: json['userName'] as String,
  );
}

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'userId': instance.userId,
      'userName': instance.userName,
    };

Contact _$ContactFromJson(Map<String, dynamic> json) {
  return Contact(
    email: json['email'] as String,
    phone: json['phone'] as String,
  );
}

Map<String, dynamic> _$ContactToJson(Contact instance) => <String, dynamic>{
      'email': instance.email,
      'phone': instance.phone,
    };

DelieveryMethod _$DelieveryMethodFromJson(Map<String, dynamic> json) {
  return DelieveryMethod(
    acceptPickUp: json['acceptPickUp'] as bool,
    acceptDelievery: json['acceptDelievery'] as bool,
    address: json['address'] as String,
    carrier: json['carrier'] as String,
  );
}

Map<String, dynamic> _$DelieveryMethodToJson(DelieveryMethod instance) =>
    <String, dynamic>{
      'acceptPickUp': instance.acceptPickUp,
      'acceptDelievery': instance.acceptDelievery,
      'address': instance.address,
      'carrier': instance.carrier,
    };
