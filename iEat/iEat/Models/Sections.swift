//
//  Sections.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 19.07.2021.
//

import Foundation

struct Sections<T: Hashable>: Hashable {
    let name: String
    var objects: [T]

    func hash(into hasher: inout Hasher) {
        hasher.combine(name)
        hasher.combine(objects)
    }
}
