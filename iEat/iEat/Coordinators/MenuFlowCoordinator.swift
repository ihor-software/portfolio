//
//  MenuFlowCoordinator.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/24/21.
//

import UIKit

final class MenuFlowCoordinator: Coordinator {
    var navigationController: UINavigationController
    lazy var rootViewController: UIViewController = createMenuViewController()

    init(with navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func start() {
    }

    func openDishViewController(_ dishItem: DishItem) {
        let child = DishCoordinator(with: navigationController)
        child.openDishViewController(dishItem)
    }

    private func createMenuViewController() -> UIViewController {
        let menuViewModel = MenuViewModel()
        menuViewModel.coordinator = self
        return UINavigationController(rootViewController: MenuViewController(with: menuViewModel))
    }
}
