//
//  IngredientDataProvider.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 12.10.2021.
//

import Foundation

let avocado = Ingredient(name: "Avocado",
                         preferenceName: "No avocado",
                         dishTag: "🥑 Avocado")

let cheese = Ingredient(name: "Cheese",
                        preferenceName: "No cheese",
                        dishTag: "🧀 Cheese")

let cucumber = Ingredient(name: "Cucumber",
                          preferenceName: "No cucumber",
                          dishTag: "🥒 Cucumber")

let lemon = Ingredient(name: "Lemon",
                       preferenceName: "No lemon",
                       dishTag: "🍋 Lemon")

let lettuce = Ingredient(name: "Lettuce",
                         preferenceName: "No lettuce",
                         dishTag: "🥬 Lettuce")

let melon = Ingredient(name: "Melon",
                       preferenceName: "No melon",
                       dishTag: "🍈 Melon")

let milk = Ingredient(name: "Milk",
                      preferenceName: "No milk",
                      dishTag: "🥛 Milk")

let nuts = Ingredient(name: "Nuts",
                      preferenceName: "No nuts",
                      dishTag: "🥜 Nuts")

let pepper = Ingredient(name: "Pepper",
                        preferenceName: "No pepper",
                        dishTag: "🫑 Pepper")

let salt = Ingredient(name: "Salt",
                      preferenceName: "No salt",
                      dishTag: "🧂 Salt")

let tomato = Ingredient(name: "Tomato",
                        preferenceName: "No tomato",
                        dishTag: "🍅 Tomato")

let watermelon = Ingredient(name: "Watermelon",
                            preferenceName: "No watermelon",
                            dishTag: "🍉 Watermelon")

final class IngredientDataProvider {
    func getEventsDishItems(callback: @escaping ([Ingredient]) -> Void) {
        let items = [avocado,
                     cheese,
                     cucumber,
                     lemon,
                     lettuce,
                     melon,
                     milk,
                     nuts,
                     pepper,
                     salt,
                     tomato,
                     watermelon]

        callback(items)
    }
}
