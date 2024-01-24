//
//  PaymentMethodViewModel.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/15/21.
//

import Foundation

protocol PaymentMethodViewModelType: AnyObject {
    var inputs: PaymentMethodViewModelInputs { get }
    var outputs: PaymentMethodViewModelOutputs { get }
}

protocol PaymentMethodViewModelInputs: AnyObject {
    func makeCardNumberMasked(cardNumber: String) -> String
    func getPaymentArrayFromStorage() -> [String]
}

protocol PaymentMethodViewModelOutputs: AnyObject {
    var reloadTableView: () -> Void { get set }
    var rows: [String] { get }
    var selectedIndex: Int { get set }
    var paymentItemsArray: [String] { get set }
}

final class PaymentMethodViewModel: PaymentMethodViewModelType,
                                    PaymentMethodViewModelInputs,
                                    PaymentMethodViewModelOutputs {
    private enum Const {
        static let paymentMethodsKey = "paymentMethodStore"
    }

    var inputs: PaymentMethodViewModelInputs { return self }
    var outputs: PaymentMethodViewModelOutputs { return self }
    var coordinator: CheckoutCoordinator?

    var completion: ((PaymentMethodModel) -> Void)?

    var reloadTableView: () -> Void = {}

    var rows: [String] {
            return stringDataSource
    }

     var stringDataSource = [String]() {
        didSet {
            reloadTableView()
        }
    }
    var paymentItemsArray: [String] = []
    var selectedIndex = 0

    init() {
        createMockData()
        paymentItemsArray = getPaymentArrayFromStorage()
        paymentItemsArray.insert("Cash", at: 0)
        paymentItemsArray.append("Add new card")
    }

    func makeCardNumberMasked(cardNumber: String) -> String {
        guard cardNumber != "Add new card" else { return "Add new card" }
        guard cardNumber != "Cash" else { return "Cash" }
        let prefix = cardNumber.prefix(4)
        let suffix = cardNumber.suffix(4)
        let maskedString = "Card, \(prefix) **** **** \(suffix)"
        return maskedString
    }

    func getPaymentArrayFromStorage() -> [String] {
        var objects: [PaymentMethodModel] = []
        var stringObjects: [String] = []
        if let data = UserDefaults.standard.data(forKey: Const.paymentMethodsKey) {
            do {
                let decoder = JSONDecoder()
                let paymentMethods = try decoder.decode([PaymentMethodModel].self, from: data)
                objects = paymentMethods
                for object in objects where !object.cardNumber.isEmpty {
                    stringObjects.append(object.cardNumber)
                }
            } catch {
                print("Unable to Decode Notes (\(error))")
            }
        }
        return stringObjects
    }

    private func createMockData() {
        var objects: [PaymentMethodModel] = []
        var stringObjects: [String] = []

        if let data = UserDefaults.standard.data(forKey: Const.paymentMethodsKey) {
            do {
                let decoder = JSONDecoder()
                let paymentMethods = try decoder.decode([PaymentMethodModel].self, from: data)
                objects = paymentMethods
                for object in objects where !object.cardNumber.isEmpty {
                    stringObjects.append(object.cardNumber)
                }
            } catch {
                print(error.localizedDescription)
            }
        }
        stringDataSource = stringObjects
    }
}
