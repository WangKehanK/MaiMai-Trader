// import 'package:dio/dio.dart';

// class HttpRequest {
//   Dio dio;

//   HttpRequest(String url) {
//     dio = Dio();
//     dio.options.baseUrl = url;
//     dio.options.connectTimeout = 5000;
//     dio.options.receiveTimeout = 3000;
//   }

//   Future<Response<T>> postReq() async {
//     return await dio.post(
//       "/verify/request",
//       queryParameters: {
//         "number": this.phoneNumber,
//       },
//     );
//   }

//   getReq() {}
// }
