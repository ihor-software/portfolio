//
//  HTTPMethod.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 02.08.2021.
//

import Foundation

enum HTTPMethod: String, CaseIterable {
    case get  = "GET"
    case post = "POST"
    case put = "PUT"
    case patch = "PATCH"
    case delete = "DELETE"
}
