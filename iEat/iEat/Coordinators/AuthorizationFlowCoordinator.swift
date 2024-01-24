//
//  AuthorizationFlowCoordinator.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 05.06.2021.
//

import UIKit
protocol AuthorizationFlowCoordinatorDelegate: AnyObject {
    func authorizationDidFinish(_ coordinator: AuthorizationFlowCoordinator)
}

final class AuthorizationFlowCoordinator {
    // MARK: - Internal Properties

    let navigationController: UINavigationController
    weak var delegate: AuthorizationFlowCoordinatorDelegate?

    // MARK: - Initialization

    init(with navigationController: UINavigationController) {
        self.navigationController = navigationController
    }
}

extension AuthorizationFlowCoordinator: Coordinator {
    func start() {
        let viewModel = AuthorizationViewModel()
        let viewController = AuthorizationViewController(with: viewModel)

        viewModel.coordinator = self

        navigationController.pushViewController(viewController, animated: true)
    }

    func openCountryList(_ country: CountryCodeDataModel, completion: @escaping (CountryCodeDataModel) -> Void) {
        let viewModel = CountryPickerViewModel(country: country)
        let viewController = CountryPickerViewController(with: viewModel)
        let navigationController = UINavigationController(rootViewController: viewController)

        viewModel.completion = completion

        self.navigationController.present(navigationController, animated: true)
    }

    func startVerificationProcessWith(_ phoneNumber: String) {
        let viewModel = VerificationViewModel(phoneNumber: phoneNumber)
        let viewController = VerificationViewController(with: viewModel)

        viewModel.coordinator = self

        navigationController.pushViewController(viewController, animated: true)
    }

    func finish() {
        delegate?.authorizationDidFinish(self)
    }
}
