//
//  DishCellProtocol.swift
//  iEat
//
//  Created by Ihor Vasyliev on 19.08.2021.
//

import Foundation

protocol DishCellProtocol {
    var dishItem: DishItem { get set }
    var dishQuantity: Int { get set }
}
