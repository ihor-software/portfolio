//
//  Section.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 29.06.2021.
//

import Foundation

enum SectionType: Int, CaseIterable {
    case categoryList
    case dishesList
}

struct Section<T: Hashable>: Hashable {
    let type: SectionType
    var objects: [T]
}
