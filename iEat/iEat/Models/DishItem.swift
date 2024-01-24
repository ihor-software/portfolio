//
//  DishItem.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 19.07.2021.
//

import Foundation

struct DishItem: Hashable {
    var title: String
    var imagePath: String

    var description: String
    var weight: Int
    var kcal: Int
    var price: Double

    var foodCompositions: Set<FoodComposition>
    var ingredients: [Ingredient]

    func isExists() -> Bool {
        if price == 0 {
            return false
        }
        return true
    }
}
