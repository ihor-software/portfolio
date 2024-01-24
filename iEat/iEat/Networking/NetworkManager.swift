//
//  NetworkManager.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 10.06.2021.
//

import Foundation

public enum NetworkingError: Error {
    case cantGetResponse
    case cantGetDataFromResponse
    case cantSetupURL
    case cantParseJSON
    case responseFailed
    case undefined
}

public typealias NetworkingCompletion<T: Decodable> = (_ result: Result<T, NetworkingError>) -> Void

protocol NetworkManagerInput {
    func loadData<T: Decodable>(urlRequest: URLRequest, completion: @escaping (NetworkingCompletion<T>))
}

final class NetworkManager: NetworkManagerInput {
    func loadData<T: Decodable>(urlRequest: URLRequest,
                                completion: @escaping (NetworkingCompletion<T>)) {
        let task = URLSession.shared.dataTask(with: urlRequest) { [weak self] (data, response, _) in
            guard let self = self else { return }

            guard let httpResponse = response as? HTTPURLResponse else {
                completion(.failure(.cantGetResponse))
                return
            }

            self.handleServerStatusCode(httpResponse.statusCode) { validation in
                switch validation {
                case .success:
                    do {
                        guard let data = data else {
                            completion(.failure(.cantGetDataFromResponse))
                            return
                        }

                        let decoder = JSONDecoder()
                        let parsedData = try decoder.decode(T.self, from: data)

                        completion(.success(parsedData))
                    } catch {
                        completion(.failure(.cantParseJSON))
                    }
                case .failure, .internalServerError:
                    completion(.failure(.responseFailed))
                case .unknown:
                    completion(.failure(.undefined))
                }
            }
        }

        task.resume()
    }
}

extension NetworkManager: StatusCodeHandlerProtocol {
    func handleServerStatusCode(_ code: Int, completion: @escaping StatusCodeValidationCompletion) {
        switch HTTPStatusCode(rawValue: code) {
        case .success?:
            completion(.success)
        case .notFound?:
            completion(.failure)
        case .internalServerError?:
            completion(.internalServerError)
        default:
            completion(.unknown)
        }
    }
}
