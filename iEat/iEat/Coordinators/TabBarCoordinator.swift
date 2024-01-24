//
//  TabBarCoordinator.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 17.06.2021.
//

import UIKit

protocol TabBarCoordinatorDelegate: AnyObject {
    func tabBarDidFinish(_ coordinator: TabBarCoordinator)
}

final class TabBarCoordinator: Coordinator {
    let navigationController: UINavigationController
    let rootViewController = UITabBarController()
    weak var delegate: TabBarCoordinatorDelegate?

    init(with navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func start() {
        let menuFlowCoordinator = MenuFlowCoordinator(with: navigationController)
        let menuViewController = menuFlowCoordinator.rootViewController
        menuViewController.tabBarItem = UITabBarItem(title: "Menu", image: UIImage(named: "menu.tab.bar.item.image"), tag: 0)

        let searchCoordinator = SearchCoordinator(with: navigationController)
        let searchViewController = searchCoordinator.rootViewController
        searchViewController.tabBarItem = UITabBarItem(title: "Search", image: UIImage(named: "magnifyingglass.tab.bar.item.image"), tag: 1)

        let cartCoordinator = CartCoordinator(with: navigationController)
        cartCoordinator.parentCoordinator = self
        let cartViewController = cartCoordinator.createCartViewController()
        cartViewController.tabBarItem = UITabBarItem(title: "Cart", image: UIImage(named: "cart.tab.bar.item.image"), tag: 2)

        rootViewController.setViewControllers([menuViewController,
                                               searchViewController,
                                               cartViewController], animated: false)
        rootViewController.tabBar.isTranslucent = false

        if #available(iOS 15.0, *) {
            rootViewController.tabBar.standardAppearance.configureWithOpaqueBackground()
            rootViewController.tabBar.scrollEdgeAppearance = rootViewController.tabBar.standardAppearance
        }

        navigationController.setViewControllers([rootViewController], animated: true)
        navigationController.isNavigationBarHidden = true
    }
    
    func finish() {
        delegate?.tabBarDidFinish(self)
    }
}
