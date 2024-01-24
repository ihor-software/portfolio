//
//  AuthorizationDataProvider.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 14.06.2021.
//

import Foundation

protocol AuthorizationDataProviderInput: AnyObject {
    func getSigningInResponse<U: Decodable>(parameter: SignInRequestParameter, completion: @escaping (NetworkingCompletion<U>))
    func getTokenFromPhoneAndCode<U: Decodable>(parameter: CodeValidationRequestParameter, completion: @escaping (NetworkingCompletion<U>))
}

final class AuthorizationDataProvider: AuthorizationDataProviderInput {
    private let networkManager: NetworkManager

    init(networkManager: NetworkManager) {
        self.networkManager = networkManager
    }

    func getSigningInResponse<U>(parameter: SignInRequestParameter,
                                 completion: @escaping (NetworkingCompletion<U>)) {
        let path = "https://ieat-demo.herokuapp.com/signIn"

        guard let url = URL(string: path +
                                "?phone=\(parameter.phoneNumber)") else {
            completion(.failure(.cantSetupURL))
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.get.rawValue

        networkManager.loadData(urlRequest: request, completion: completion)
    }

    func getTokenFromPhoneAndCode<U>(parameter: CodeValidationRequestParameter,
                                     completion: @escaping (NetworkingCompletion<U>)) {
        let path = "https://ieat-demo.herokuapp.com/validateCode"

        guard let url = URL(string: path +
                                "?phone=\(parameter.phoneNumber)&code=\(parameter.code)") else {
            completion(.failure(.cantSetupURL))
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.get.rawValue

        networkManager.loadData(urlRequest: request, completion: completion)
    }
}
