//
//  FoodComposition.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 24.09.2021.
//

import Foundation

enum FoodComposition: Int, CaseIterable {
    case vegetarian = 0
    case balancedAndHealthy
    case lowInCalories
    case substantial
    case spicyFood

    var preferenceName: String {
        switch self {
        case .vegetarian:
            return "Vegetarian"
        case .balancedAndHealthy:
            return "Balanced and healthy"
        case .lowInCalories:
            return "Low in calories"
        case .substantial:
            return "Substantial"
        case .spicyFood:
            return "Spicy food"
        }
    }

    var dishTag: String {
            switch self {
            case .vegetarian:
                return "🥗 Vegetarian"
            case .balancedAndHealthy:
                return "🍱 Balanced and healthy"
            case .lowInCalories:
                return "🍽️ Low in calories"
            case .substantial:
                return "🍗 Substantial"
            case .spicyFood:
                return "🌶 Spicy"
            }
        }
}
