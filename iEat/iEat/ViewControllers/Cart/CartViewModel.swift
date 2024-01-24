//
//  CartViewModel.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 28.07.2021.
//

import Foundation

protocol CartViewModelType: AnyObject {
    var inputs: CartViewModelInputs { get }
    var outputs: CartViewModelOutputs { get }
}

protocol CartViewModelInputs: AnyObject {
    var cartItems: [CartItem] { get }
    var maxDishItemsQuantity: Int { get }

    func loadData()
    func decrementDishItemsQuantityBy(dishItem: DishItem)
    func incrementDishItemsQuantityBy(dishItem: DishItem)
    func check(promocode: String)
    func startCheckoutFlow()
}

protocol CartViewModelOutputs: AnyObject {
    var bindCartItemsDataToView: () -> Void { get set }
    var bindTotalPriceToView: (String) -> Void { get set }
    var bindDiscountToView: (String) -> Void { get set }
    var bindPromocodeStateToView: (Bool) -> Void { get set }
}

final class CartViewModel: CartViewModelType,
                           CartViewModelInputs,
                           CartViewModelOutputs {
    var inputs: CartViewModelInputs { return self }
    var outputs: CartViewModelOutputs { return self }

    var bindCartItemsDataToView: () -> Void = {}
    var bindTotalPriceToView: (String) -> Void = { _ in }
    var bindDiscountToView: (String) -> Void = { _ in }
    var bindPromocodeStateToView: (Bool) -> Void = { _ in }
    var coordinator: TabBarCoordinator?

    let maxDishItemsQuantity = 99

    var cartItems = [CartItem]() {
        didSet {
            bindCartItemsDataToView()
        }
    }

    private var cartManager: CartManager {
        DIContainer.shared.resolve(type: CartManager.self)
    }

    private let validPromocode = "RATATOUILLE#10"

    private var isPromocodeValid = false {
        didSet {
            bindPromocodeStateToView(isPromocodeValid)
        }
    }

    private var totalPrice = 0.0 {
        didSet {
            bindTotalPriceToView(totalPrice.removeZerosFromEnd())
        }
    }

    private var discount = 0.0 {
        didSet {
            bindDiscountToView(discount.removeZerosFromEnd())
        }
    }

    func loadData() {
        cartItems = cartManager.getBasket()

        setupTotalPrice()
        setupDiscount()
    }

    func decrementDishItemsQuantityBy(dishItem: DishItem) {
        let firstIndex = cartItems.firstIndex {
            $0.dishItem == dishItem
        }

        guard let index = firstIndex else { return }

        cartItems[index].quantity -= 1

        setupTotalPrice()
    }

    func incrementDishItemsQuantityBy(dishItem: DishItem) {
        let firstIndex = cartItems.firstIndex {
            $0.dishItem == dishItem
        }

        guard let index = firstIndex else { return }

        cartItems[index].quantity += 1

        setupTotalPrice()
    }

    func check(promocode: String) {
        guard !promocode.isEmpty else { return }

        if promocode == validPromocode {
            isPromocodeValid = true
            discount = 10.0
            totalPrice -= discount
        } else {
            isPromocodeValid = false
        }
    }
    
    func startCheckoutFlow() {
        coordinator?.finish()
    }

    private func setupTotalPrice() {
        var totalPrice = 0.0

        cartItems.forEach {
            totalPrice += Double($0.quantity) * $0.dishItem.price
        }

        self.totalPrice = totalPrice - discount
    }

    private func setupDiscount() {
        discount = 0
    }
}
