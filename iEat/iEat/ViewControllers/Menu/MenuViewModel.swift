//
//  MenuViewModel.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 23.07.2021.
//

import Foundation

protocol MenuViewModelType: AnyObject {
    var inputs: MenuViewModelInputs { get }
    var outputs: MenuViewModelOutputs { get }
}

protocol MenuViewModelInputs: AnyObject {
    var eventsArray: [DishItem] { get }
    var georgianCusineArray: [DishItem] { get }
    var youWillLikeItArray: [DishItem] { get }
    func openDishDetailsScreen(indexPath: IndexPath)
}

protocol MenuViewModelOutputs: AnyObject {
    var reloadCollectionView: () -> Void { get set }
}

final class MenuViewModel: MenuViewModelType,
                           MenuViewModelInputs,
                           MenuViewModelOutputs {
    var inputs: MenuViewModelInputs { return self }
    var outputs: MenuViewModelOutputs { return self }
    var coordinator: MenuFlowCoordinator?

    var reloadCollectionView: () -> Void = {}

    var eventsArray: [DishItem] = [] {
        didSet {
            reloadCollectionView()
        }
    }

    var georgianCusineArray: [DishItem] = [] {
        didSet {
            reloadCollectionView()
        }
    }

    var youWillLikeItArray: [DishItem] = [] {
        didSet {
            reloadCollectionView()
        }
    }

    private let container = DIContainer.shared

    private var menuDataProvider: MenuDataProvider {
        return container.resolve(type: MenuDataProvider.self)
    }

    init() {
        loadData()
    }

    private func loadData() {
        menuDataProvider.getEventsDishItems { [weak self] in
            self?.eventsArray = $0
        }

        menuDataProvider.getGeorgianCuisineDishItems { [weak self] in
            self?.georgianCusineArray = $0
        }

        menuDataProvider.getYouWillLikeItDishItems { [weak self] in
            self?.youWillLikeItArray = $0
        }
    }

    func openDishDetailsScreen(indexPath: IndexPath) {
        switch indexPath.section {
        case 1:
            coordinator?.openDishViewController(self.georgianCusineArray[indexPath.row])
        case 2:
            coordinator?.openDishViewController(self.youWillLikeItArray[indexPath.row])
        default:
            break
        }
    }
}
