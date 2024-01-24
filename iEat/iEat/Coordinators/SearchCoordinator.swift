//
//  SearchCoordinator.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 03.08.2021.
//

import UIKit

final class SearchCoordinator {
    let navigationController: UINavigationController
    weak var parentCoordinator: TabBarCoordinator?
    lazy var rootViewController: UIViewController = createSearchViewController()
    var completion: ((SortingSettingsData) -> Void)?

    init(with navigationController: UINavigationController) {
        self.navigationController = navigationController

        navigationController.modalTransitionStyle = .coverVertical
    }

    func openDishViewController(_ dishItem: DishItem) {
        let child = DishCoordinator(with: navigationController)
        child.openDishViewController(dishItem)
    }

    func startSortingSettingsFlow(settingsData: SortingSettingsData) {
        let sortingSettingsVievModel = SortingSettingsViewModel(
            settingsData: settingsData)
        let sortingSettingsViewController = SortingSettingsViewController(viewModel: sortingSettingsVievModel)
        let navigationControllerSort = UINavigationController(rootViewController: sortingSettingsViewController)

        sortingSettingsVievModel.coordinator = self

        navigationController.dismiss(animated: true)
        navigationController.present(navigationControllerSort,
                                     animated: true)
    }

    func showMyPreferencesScreen(settingsData: SortingSettingsData) {
        let myPreferencesViewModel = MyPreferencesViewModel(
            settingsData: settingsData)
        let myPreferencesViewController = MyPreferencesViewController(viewModel: myPreferencesViewModel)

        myPreferencesViewModel.coordinator = self

        navigationController.dismiss(animated: true)
        navigationController.present(myPreferencesViewController,
                                     animated: true)
    }

    func showListOfIngredientsScreen(settingsData: SortingSettingsData) {
        let ingredientsViewModel = IngredientsViewModel(
            settingsData: settingsData)
        let ingredientsViewController = IngredientsViewController(
            viewModel: ingredientsViewModel)
        let ingredientsNavigationVonstroller = UINavigationController(
            rootViewController: ingredientsViewController)

        ingredientsViewModel.coordinator = self

        navigationController.dismiss(animated: true)
        navigationController.present(ingredientsNavigationVonstroller,
                                     animated: true)
    }

    func finishSortingSettingsFlow(with settingsData: SortingSettingsData) {
        completion?(settingsData)
        completion = nil

        navigationController.dismiss(animated: true)
    }

    private func createSearchViewController() -> UIViewController {
        let searchViewModel = SearchViewModel()
        let searchViewController = SearchViewController(with: searchViewModel)

        searchViewModel.coordinator = self

        return UINavigationController(rootViewController: searchViewController)
    }
}

extension SearchCoordinator: Coordinator {
    func start() {}
}
