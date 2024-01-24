//
//  AddressSelectionViewModel.swift
//  iEat
//
//  Created by Ihor on 04.10.2021.
//

import UIKit

protocol AddressSelectionViewModelType: AnyObject {
    var inputs: AddressSelectionViewModelInputs { get }
    var outputs: AddressSelectionViewModelOutputs { get }
}

protocol AddressSelectionViewModelInputs: AnyObject {
}

protocol AddressSelectionViewModelOutputs: AnyObject {
    var items: [Sections<String>] { get set }
}

final class AddressSelectionViewModel: AddressSelectionViewModelType,
                                       AddressSelectionViewModelInputs,
                                       AddressSelectionViewModelOutputs {
    private enum Const {
        static let paymentMethodsKey = "paymentMethodStore"
    }

    var inputs: AddressSelectionViewModelInputs { return self }
    var outputs: AddressSelectionViewModelOutputs { return self }

    var items = [Sections<String>]()

    func createMockData() {
        items.removeAll()

        var yourAddressesArray = ["Moscow, Pokrovka str., 21", "Moscow, Pokrovka str., 22"]
        yourAddressesArray.append("Add new")
        items.append(Sections(name: "Your Adresses", objects: yourAddressesArray))

        let pickUpPointArray = ["Moscow, Pokrovka str., 21", "Moscow, Pokrovka str., 22"]
        items.append(Sections(name: "Pick Up Point", objects: pickUpPointArray))
    }
}
