//
//  MenuDataProvider.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 26.07.2021.
//

import Foundation

private let inVinoVeritas = DishItem(title: "In vino veritas",
                                     imagePath: "inVinoVeritas",
                                     description: "Set of fruits, berries and prosciutto, perfect addition to any gathering",
                                     weight: 0,
                                     kcal: 0,
                                     price: 0,
                                     foodCompositions: [.spicyFood],
                                     ingredients: [lettuce])

private let sweetDreams = DishItem(title: "Sweet dreams",
                                   imagePath: "sweetDreams",
                                   description: "Treat your loved ones with your presence",
                                   weight: 0,
                                   kcal: 0,
                                   price: 0,
                                   foodCompositions: [.spicyFood],
                                   ingredients: [lettuce])

private let classicRamen = DishItem(title: "Classic Ramen",
                                    imagePath: "classicRamen",
                                    description: "Classic Ramen description",
                                    weight: 300,
                                    kcal: 244,
                                    price: 2,
                                    foodCompositions: [.spicyFood],
                                    ingredients: [lettuce])

private let hotSteak = DishItem(title: "Hot Steak",
                                imagePath: "hotSteak",
                                description: "Hot Steak description",
                                weight: 500,
                                kcal: 848,
                                price: 8.99,
                                foodCompositions: [.spicyFood],
                                ingredients: [lettuce])

private let sandwich = DishItem(title: "Sunrise Breakfast Sandwich",
                                imagePath: "sandwich",
                                description: "Sunrise Breakfast Sandwich description",
                                weight: 250,
                                kcal: 144,
                                price: 1.19,
                                foodCompositions: [.spicyFood],
                                ingredients: [lettuce])

private let blueberryToast = DishItem(title: "Blueberry Toast",
                                      imagePath: "blueberryToast",
                                      description: "Blubery Toast description",
                                      weight: 150,
                                      kcal: 303,
                                      price: 0.99,
                                      foodCompositions: [.spicyFood],
                                      ingredients: [lettuce])

private let japanesePelemeni = DishItem(title: "Japanese Pelemeni",
                                        imagePath: "japanesePelemeni",
                                        description: "Japanese Pelemeni description",
                                        weight: 300,
                                        kcal: 233,
                                        price: 2,
                                        foodCompositions: [.spicyFood],
                                        ingredients: [lettuce])

private let pizzaMozarella = DishItem(title: "Pizza Mozarella",
                                      imagePath: "pizzaMozarella",
                                      description: "Pizza Mozarella description",
                                      weight: 500,
                                      kcal: 745,
                                      price: 4.99,
                                      foodCompositions: [.spicyFood],
                                      ingredients: [lettuce])

final class MenuDataProvider {
    func getEventsDishItems(callback: @escaping ([DishItem]) -> Void) {
        let items = [inVinoVeritas,
                 sweetDreams]

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            callback(items)
        }
    }

    func getGeorgianCuisineDishItems(callback: @escaping ([DishItem]) -> Void) {
        let items = [classicRamen,
                 hotSteak,
                 sandwich,
                 japanesePelemeni]

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            callback(items)
        }
    }

    func getYouWillLikeItDishItems(callback: @escaping ([DishItem]) -> Void) {
        let items = [sandwich,
                 blueberryToast,
                 japanesePelemeni,
                 pizzaMozarella]

        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            callback(items)
        }
    }
}
