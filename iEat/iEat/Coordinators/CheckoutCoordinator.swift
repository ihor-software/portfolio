//
//  CheckoutCoordinator.swift
//  iEat
//
//  Created by Ihor on 03.11.2021.
//

import UIKit

final class CheckoutCoordinator: Coordinator {
    // MARK: - Internal Properties

    let navigationController: UINavigationController

    // MARK: - Initialization

    init(with navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func start() {
        let viewModel = OrderDetailsViewModel()
        let viewController = OrderDetailsViewController(with: viewModel)

        viewModel.coordinator = self

        navigationController.isNavigationBarHidden = false
        navigationController.pushViewController(viewController, animated: true)
    }
    
    func openAddressSelection() {
        let viewModel = AddressSelectionViewModel()
        let viewController = AddressSelectionViewController(with: viewModel)

        navigationController.pushViewController(viewController, animated: true)
    }
    
    func openPhoneSelection() {
        let viewModel = PhoneNumbersViewModel()
        viewModel.coordinator = self
        let viewController = PhoneNumbersMethodViewController(with: viewModel)

        navigationController.pushViewController(viewController, animated: true)
    }
    
    func openDelieveryTimeSelection() {
        let viewController = TimeSelectionViewController()

        navigationController.pushViewController(viewController, animated: true)
    }
    
    func openPaymentMethodsSelection() {
        let viewModel = PaymentMethodViewModel()
        viewModel.coordinator = self
        let viewController = PaymentMethodViewController(with: viewModel)

        navigationController.pushViewController(viewController, animated: true)
    }
}
