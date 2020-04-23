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
      'price': instance.price,
      'user': instance.user,
      'contact': instance.contact,
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
    json['userId'] as String,
    json['userName'] as String,
  );
}

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'userId': instance.userId,
      'userName': instance.userName,
    };

Contact _$ContactFromJson(Map<String, dynamic> json) {
  return Contact(
    json['email'] as String,
    json['phone'] as String,
  );
}

Map<String, dynamic> _$ContactToJson(Contact instance) => <String, dynamic>{
      'email': instance.email,
      'phone': instance.phone,
    };
