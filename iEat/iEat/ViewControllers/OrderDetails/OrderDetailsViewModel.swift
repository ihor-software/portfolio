//
//  OrderDetailsViewModel.swift
//  iEat
//
//  Created by Ihor on 03.11.2021.
//

import Foundation

protocol OrderDetailsViewModelType: AnyObject {
    var inputs: OrderDetailsViewModelInputs { get }
    var outputs: OrderDetailsViewModelOutputs { get }
}

protocol OrderDetailsViewModelInputs: AnyObject {
    func navigateSelectionScreen(row: Int)
}

protocol OrderDetailsViewModelOutputs: AnyObject {
}

final class OrderDetailsViewModel: OrderDetailsViewModelType,
                                   OrderDetailsViewModelInputs,
                                   OrderDetailsViewModelOutputs {
    var inputs: OrderDetailsViewModelInputs { return self }
    var outputs: OrderDetailsViewModelOutputs { return self }
    var coordinator: CheckoutCoordinator?
    
    func navigateSelectionScreen(row: Int) {
        switch row {
        case 0:
            coordinator?.openAddressSelection()
        case 1:
            coordinator?.openPhoneSelection()
        case 2:
            coordinator?.openDelieveryTimeSelection()
        case 3:
            coordinator?.openPaymentMethodsSelection()
        default:
            break
        }
    }
}
