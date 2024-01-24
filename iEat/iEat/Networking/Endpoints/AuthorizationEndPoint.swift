//
//  AuthorizationEndPoint.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 22.06.2021.
//

import Foundation

enum AuthorizationEndPoint {
    case signIn
    case codeValidation
}

extension AuthorizationEndPoint: EndPoint {
    var path: String {
        switch self {
        case .signIn:
            return "/signIn"
        case .codeValidation:
            return "/validateCode"
        }
    }

    var header: HTTPHeaders? {
        switch self {
        default:
            return nil
        }
    }

    var httpMethod: HTTPMethod {
        return .get
    }
}
