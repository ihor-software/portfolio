//
//  CategoryState.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 02.08.2021.
//

import UIKit

enum CategoryState {
    case normal
    case selected

    var textColor: UIColor? {
        switch self {
        case .normal:
            return UIColor(red: 0, green: 122, blue: 255, alpha: 1)
        case .selected:
            return .white
        }
    }

    var backgroundColor: UIColor? {
        switch self {
        case .normal:
            return .white
        case .selected:
            return UIColor(red: 0, green: 122, blue: 255, alpha: 1)
        }
    }
}
