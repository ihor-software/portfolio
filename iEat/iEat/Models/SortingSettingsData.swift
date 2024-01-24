//
//  SortingSettingsData.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 25.08.2021.
//

import Foundation

struct SortingSettingsData {
    var sortBy: SortBySettingType = .popularFirst
    var hotPriceOffers = false
    var considerMyPreferences = true

    var fromPrice = ""
    var toPrice = ""
    var fromPriceOrToPricaChanged = false

    var foodCompositions: Set<FoodComposition> = [
        .vegetarian,
        .balancedAndHealthy
    ]

    var iDoNotEat: [Ingredient] = [
        Ingredient(name: "Nuts", preferenceName: "No nuts", dishTag: "🥜 Nuts"),
        Ingredient(name: "Lettuce", preferenceName: "No lettuce", dishTag: "🥬 Lettuce")
    ]
}
