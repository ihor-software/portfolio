//
//  StatusCodeHandler.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 16.06.2021.
//

import Foundation

enum StatusCodeValidation {
    case success
    case internalServerError
    case failure
    case unknown
}

enum HTTPStatusCode: Int {
    case success = 200
    case notFound = 404
    case internalServerError = 500
}

typealias StatusCodeValidationCompletion = (_ result: StatusCodeValidation) -> Void

protocol StatusCodeHandlerProtocol {
    func handleServerStatusCode(_ code: Int, completion: @escaping StatusCodeValidationCompletion)
}
