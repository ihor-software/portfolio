//
//  DishCoordinator.swift
//  iEat
//
//  Created by Igor Vasyliev on 8/3/21.
//

import UIKit

final class DishCoordinator: Coordinator {
    internal var navigationController: UINavigationController

    init(with navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func openDishViewController(_ dishItem: DishItem) {
        let viewController = DishDetailsViewController(dishItem: dishItem)
        navigationController.present(viewController, animated: true)
    }

    func start() {
    }
}
