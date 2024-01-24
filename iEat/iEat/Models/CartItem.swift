//
//  CartItem.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 16.08.2021.
//

import Foundation

struct CartItem: Hashable {
    let dishItem: DishItem
    var quantity = 0
}
