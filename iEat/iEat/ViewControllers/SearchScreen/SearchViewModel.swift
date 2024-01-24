//
//  SearchViewModel.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 29.06.2021.
//

import Foundation

protocol SearchViewModelType: AnyObject {
    var inputs: SearchViewModelInputs { get }
    var outputs: SearchViewModelOutputs { get }
}

protocol SearchViewModelInputs: AnyObject {
    var categories: [Category] { get }
    var selectedCategoryIndexes: Set<Int> { get set }
    var selfReference: SearchViewModel { get }
    var sections: [Section<Category>] { get }
    var rows: [DishItem] { get }

    func loadDishes()
    func loadCategories()
    func filterContentForSearchText(_ text: String)
    func didSelectItemAt(indexPath: IndexPath)
    func openSortingSettings()
}

protocol SearchViewModelOutputs: AnyObject {
    var reloadCollectionView: () -> Void { get set }
}

final class SearchViewModel: SearchViewModelType,
                             SearchViewModelInputs,
                             SearchViewModelOutputs {
    // MARK: - Internal Properties

    var inputs: SearchViewModelInputs { return self }
    var outputs: SearchViewModelOutputs { return self }

    var selfReference: SearchViewModel { self }

    var reloadCollectionView: () -> Void = {}

    var settingsData = SortingSettingsData()

    var rows: [DishItem] {
        guard !filter.isEmpty else { return .init() }

        return getFullyFilteredDishesArray()
    }

    var selectedCategoryIndexes = Set<Int>()

    var coordinator: SearchCoordinator?

    // MARK: - Private Properties

    private var dishesArray = [DishItem]()

    private(set) var sections = [Section<Category>]()

    private(set) var categories = [Category]() {
        didSet {
            generateSections()
            reloadCollectionView()
        }
    }

    private var filter: String = "" {
        didSet {
            reloadCollectionView()
        }
    }

    private let baseCategories = [Category(name: "💫 All")]

    private let container = DIContainer.shared

    private var searchDataProvider: SearchDataProvider {
        return container.resolve(type: SearchDataProvider.self)
    }

    init() {
        categories = baseCategories

        loadDishes()
    }

    // MARK: - Internal Methods

    func didSelectItemAt(indexPath: IndexPath) {
        switch indexPath.section {
        case 0:
            selectOrDeselectCategory(at: indexPath)
        default:
            openDishDetailsScreen(at: indexPath)
        }
    }

    func openSortingSettings() {
        coordinator?.completion = { settingsData in
            self.settingsData = settingsData
            self.reloadCollectionView()
        }

        coordinator?.startSortingSettingsFlow(settingsData: settingsData)
    }

    func loadCategories() {
        searchDataProvider.loadCategories { (result: Result<Content<Category>, NetworkingError>) in
            switch result {
            case .success(let categoriesInContent):
                let fullContent = self.baseCategories + categoriesInContent.content
                self.categories = fullContent
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }

    func loadDishes() {
        searchDataProvider.loadDishes { [weak self] in
            self?.dishesArray = $0
        }
    }

    func filterContentForSearchText(_ text: String) {
        filter = text
    }

    // MARK: - Private Methods

    private func getFullyFilteredDishesArray() -> [DishItem] {
        let filterByPriceRange = settingsData.fromPriceOrToPricaChanged
        let filterByPreferences = settingsData.considerMyPreferences

        let dishesArrayFilteredByUserInput = getDishesArrayFilteredByUserInputFrom(dishesArray)

        let dishesArrayFilteredByPriceRange = filterByPriceRange ?
        getDishesArrayFilteredByPriceRangeFrom(dishesArrayFilteredByUserInput) :
        dishesArrayFilteredByUserInput

        let dishesArrayFilteredByUserPreferences = filterByPreferences ?
        getDishesArrayFilteredByUserPreferencesFrom(dishesArrayFilteredByPriceRange) :
        dishesArrayFilteredByPriceRange

        switch settingsData.sortBy {
        case .popularFirst:
            return dishesArrayFilteredByUserPreferences

        case .nameAZ:
            return dishesArrayFilteredByUserPreferences.sorted { $0.title < $1.title }

        case .priceLowToHigh:
            return dishesArrayFilteredByUserPreferences.sorted { $0.price < $1.price }

        case .priceHighToLow:
            return dishesArrayFilteredByUserPreferences.sorted { $0.price > $1.price }
        }
    }

    private func getDishesArrayFilteredByUserInputFrom(_ dishesArray: [DishItem]) -> [DishItem] {
        return dishesArray.filter { (dish: DishItem) -> Bool in
            return dish.title.lowercased().contains(filter.lowercased())
        }
    }

    private func getDishesArrayFilteredByPriceRangeFrom(_ dishesArray: [DishItem]) -> [DishItem] {
        return dishesArray.filter {
            guard let fromPrice = Double(settingsData.fromPrice) else { return false }
            guard let toPrice = Double(settingsData.toPrice) else { return false }

            return $0.price >= fromPrice && $0.price <= toPrice
        }
    }

    private func getDishesArrayFilteredByUserPreferencesFrom(_ dishesArray: [DishItem]) -> [DishItem] {
        return dishesArray.filter { dish in
            var dishIsFromWantedFoodCompositions = false
            var dishDoesNotContainUnwantedIngredients = true

            dish.foodCompositions.forEach {
                guard settingsData.foodCompositions.contains($0) else { return }

                dishIsFromWantedFoodCompositions = true
            }

            dish.ingredients.forEach {
                guard settingsData.iDoNotEat.contains($0) else { return }

                dishDoesNotContainUnwantedIngredients = false
            }

            return dishIsFromWantedFoodCompositions &&
                   dishDoesNotContainUnwantedIngredients
        }
    }

    private func generateSections() {
        let categoriesSection = Section<Category>(type: .categoryList, objects: categories)

        sections.append(categoriesSection)
    }

    private func selectOrDeselectCategory(at indexPath: IndexPath) {
        if selectedCategoryIndexes.contains(indexPath.row) {
            selectedCategoryIndexes.remove(indexPath.row)
            selectedCategoryIndexes.insert(0)
        } else {
            selectedCategoryIndexes.removeAll()
            selectedCategoryIndexes.insert(indexPath.row)
        }
    }

    private func openDishDetailsScreen(at indexPath: IndexPath) {
        coordinator?.openDishViewController(rows[indexPath.row])
    }
}
