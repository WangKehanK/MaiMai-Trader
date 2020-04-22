// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ProductCardModel.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ProductCardModel _$ProductCardModelFromJson(Map<String, dynamic> json) {
  return ProductCardModel(
    json['postId'] as String,
    json['title'] as String,
    json['description'] as String,
    (json['image'] as List)?.map((e) => e as String)?.toList(),
    json['price'] == null
        ? null
        : Price.fromJson(json['price'] as Map<String, dynamic>),
    json['isNew'] as bool,
  );
}

Map<String, dynamic> _$ProductCardModelToJson(ProductCardModel instance) =>
    <String, dynamic>{
      'postId': instance.postId,
      'title': instance.title,
      'description': instance.description,
      'image': instance.image,
      'price': instance.price,
      'isNew': instance.isNew,
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
