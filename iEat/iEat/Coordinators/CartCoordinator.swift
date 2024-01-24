//
//  CartCoordinator.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/24/21.
//

import UIKit

final class CartCoordinator: Coordinator {
    var parentCoordinator: TabBarCoordinator?
    var navigationController: UINavigationController
    lazy var rootViewController: UIViewController = createCartViewController()

    init(with navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func start() {
    }

    func createCartViewController() -> UIViewController {
        let cartViewModel = CartViewModel()
        cartViewModel.coordinator = parentCoordinator

        return UINavigationController(rootViewController: CartViewController(viewModel: cartViewModel))
    }
}
