//
//  PhoneNumbersViewModel.swift
//  iEat
//
//  Created by Ihor Vasyliev on 26.08.2021.
//

import Foundation

protocol PhoneNumbersViewModelType: AnyObject {
    var inputs: PhoneNumbersViewModelInputs { get }
    var outputs: PhoneNumbersViewModelOutputs { get }
}

protocol PhoneNumbersViewModelInputs: AnyObject {
    func makeCardNumberMasked(cardNumber: String) -> String
    func getPaymentArrayFromStorage() -> [String]
}

protocol PhoneNumbersViewModelOutputs: AnyObject {
    var reloadTableView: () -> Void { get set }
    var rows: [String] { get }
    var paymentItemsArray: [String] { get set }
    var selectedIndex: Int { get set }
}

final class PhoneNumbersViewModel: PhoneNumbersViewModelType,
                                   PhoneNumbersViewModelInputs,
                                   PhoneNumbersViewModelOutputs {
    private enum Const {
        static let phoneNumberKey = "phoneNumbersStore"
    }

    var inputs: PhoneNumbersViewModelInputs { return self }
    var outputs: PhoneNumbersViewModelOutputs { return self }
    var coordinator: CheckoutCoordinator?

    var completion: ((PhoneNumbersModel) -> Void)?

    var reloadTableView: () -> Void = {}
    var paymentItemsArray: [String] = []
    var selectedIndex = 0

    var rows: [String] {
            return stringDataSource
    }

     var stringDataSource = [String]() {
        didSet {
            reloadTableView()
        }
    }

    init() {
        createMockData()
        paymentItemsArray = getPaymentArrayFromStorage()
        paymentItemsArray.append("Add new phone")
    }

    func makeCardNumberMasked(cardNumber: String) -> String {
        guard cardNumber != "Add new phone" else { return "Add new phone" }
        guard cardNumber != "+38 (097) 746-45-33" else { return "+38 (097) 746-45-33" }
        let suffix = cardNumber.suffix(7)
        let maskedString = "+38 (097) \(suffix)"
        return maskedString
    }

    private func createMockData() {
        var objects: [PhoneNumbersModel] = []
        var stringObjects: [String] = []

        if let data = UserDefaults.standard.data(forKey: Const.phoneNumberKey) {
            do {
                let decoder = JSONDecoder()
                let paymentMethods = try decoder.decode([PhoneNumbersModel].self, from: data)
                objects = paymentMethods
                for object in objects where !object.phoneNumber.isEmpty {
                    stringObjects.append(object.phoneNumber)
                }
            } catch {
                print(error.localizedDescription)
            }
        }
        stringDataSource = stringObjects
    }
    
    func getPaymentArrayFromStorage() -> [String] {
        var objects: [PhoneNumbersModel] = []
        var stringObjects: [String] = []
        if let data = UserDefaults.standard.data(forKey: Const.phoneNumberKey) {
            do {
                let decoder = JSONDecoder()
                let paymentMethods = try decoder.decode([PhoneNumbersModel].self, from: data)
                objects = paymentMethods
                for object in objects where !object.phoneNumber.isEmpty {
                    stringObjects.append(object.phoneNumber)
                }
            } catch {
                print("Unable to Decode Notes (\(error))")
            }
        }
        return stringObjects
    }
}
