//
//  CartManager.swift
//  iEat
//
//  Created by Igor Vasyliev on 8/6/21.
//

import Foundation

final class CartManager {
    private var cart: Set<CartItem> = []

    func setBasket(array: [CartItem]) {
        array.forEach { item in
            if item.quantity < 1 || !item.dishItem.isExists() {
                self.cart.remove(item)
            } else {
                if self.cart.contains(item) {
                    self.cart.remove(item)
                }
                self.cart.insert(item)
            }
        }
    }

    func getBasket() -> [CartItem] {
        return Array(cart)
    }
}
