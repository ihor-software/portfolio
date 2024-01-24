//
//  SearchDataProvider.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 29.06.2021.
//

import Foundation

protocol SearchDataProviderInput: AnyObject {
    func loadCategories<U: Decodable>(completion: @escaping (NetworkingCompletion<U>))
    func loadDishes(completion: @escaping ([DishItem]) -> Void)
}

final class SearchDataProvider: SearchDataProviderInput {
    private let lettuce = Ingredient(name: "Lettuce",
                                     preferenceName: "No lettuce",
                                     dishTag: "Lettuce")

    private lazy var classicRamen = DishItem(title: "Classic Ramen",
                                             imagePath: "classicRamen",
                                             description: "",
                                             weight: 300,
                                             kcal: 244,
                                             price: 2,
                                             foodCompositions: [.spicyFood],
                                             ingredients: [lettuce])

    private lazy var hotSteak = DishItem(title: "Hot Steak",
                                         imagePath: "hotSteak",
                                         description: "",
                                         weight: 500,
                                         kcal: 848,
                                         price: 8.99,
                                         foodCompositions: [.spicyFood],
                                         ingredients: [lettuce])

    private lazy var sandwich = DishItem(title: "Sunrise Breakfast Sandwich",
                                         imagePath: "sandwich",
                                         description: "",
                                         weight: 250,
                                         kcal: 144,
                                         price: 1.19,
                                         foodCompositions: [.spicyFood],
                                         ingredients: [lettuce])

    private lazy var blueberryToast = DishItem(title: "Blueberry Toast",
                                               imagePath: "blueberryToast",
                                               description: "",
                                               weight: 150,
                                               kcal: 303,
                                               price: 0.99,
                                               foodCompositions: [.spicyFood],
                                               ingredients: [lettuce])

    private lazy var japanesePelemeni = DishItem(title: "Japanese Pelemeni",
                                                 imagePath: "japanesePelemeni",
                                                 description: "",
                                                 weight: 300,
                                                 kcal: 233,
                                                 price: 2,
                                                 foodCompositions: [.spicyFood],
                                                 ingredients: [lettuce])

    private lazy var pizzaMozarella = DishItem(title: "Pizza Mozarella",
                                               imagePath: "pizzaMozarella",
                                               description: "",
                                               weight: 500,
                                               kcal: 745,
                                               price: 4.99,
                                               foodCompositions: [.spicyFood],
                                               ingredients: [lettuce])

    private let networkManager = NetworkManager()

    func loadCategories<U>(completion: @escaping (NetworkingCompletion<U>)) {
        let path = "https://ieat-demo.herokuapp.com/loadAllCategories"

        guard let url = URL(string: path) else {
            completion(.failure(.cantSetupURL))
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.get.rawValue

        networkManager.loadData(urlRequest: request, completion: completion)
    }

    func loadDishes(completion: @escaping ([DishItem]) -> Void) {
        let items = [classicRamen,
                     hotSteak,
                     sandwich,
                     blueberryToast,
                     japanesePelemeni,
                     pizzaMozarella]

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            completion(items)
        }
    }
}
