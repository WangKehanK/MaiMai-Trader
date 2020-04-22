import 'package:json_annotation/json_annotation.dart';

part 'ProductCardModel.g.dart';

@JsonSerializable()
class ProductCardModel {
  final String postId;
  final String title;
  final String description;
  final List<String> image;
  final Price price;
  final bool isNew;
  ProductCardModel(
    this.postId,
    this.title,
    this.description,
    this.image,
    this.price,
    this.isNew,
  );

  factory ProductCardModel.fromJson(Map<String, dynamic> json) =>
      _$ProductCardModelFromJson(json);
  Map<String, dynamic> toJson() => _$ProductCardModelToJson(this);
}

@JsonSerializable()
class Price {
  final int offerPrice;
  final int originalPrice;
  Price({this.offerPrice, this.originalPrice});

  factory Price.fromJson(Map<String, dynamic> json) => _$PriceFromJson(json);
  Map<String, dynamic> toJson() => _$PriceToJson(this);
}
