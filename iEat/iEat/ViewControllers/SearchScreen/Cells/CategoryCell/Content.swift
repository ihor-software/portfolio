//
//  Content.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 29.06.2021.
//

import Foundation

struct Content<T: Codable>: Codable {
    var content: [T]
}
