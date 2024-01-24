//
//  ApplicationFlowCoordinator.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 05.06.2021.
//

import UIKit

protocol Coordinator: AnyObject {
    var navigationController: UINavigationController { get }

    init(with navigationController: UINavigationController)

    func start()
}

final class ApplicationFlowCoordinator {
    let navigationController: UINavigationController

    init(with navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func startMainFlow() {
        let child = TabBarCoordinator(with: navigationController)
        child.delegate = self
        child.start()
    }
    
    func startCheckoutFlow() {
        let child = CheckoutCoordinator(with: navigationController)
        child.start()
    }
}

extension ApplicationFlowCoordinator: Coordinator {
    func start() {
        let child = AuthorizationFlowCoordinator(with: navigationController)
        child.delegate = self
        child.start()
    }
}

extension ApplicationFlowCoordinator: AuthorizationFlowCoordinatorDelegate {
    func authorizationDidFinish(_ coordinator: AuthorizationFlowCoordinator) {
        startMainFlow()
    }
}

extension ApplicationFlowCoordinator: TabBarCoordinatorDelegate {
    func tabBarDidFinish(_ coordinator: TabBarCoordinator) {
        startCheckoutFlow()
    }
}
