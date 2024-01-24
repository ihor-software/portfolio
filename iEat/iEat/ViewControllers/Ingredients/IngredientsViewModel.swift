//
//  IngredientsViewModel.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 08.10.2021.
//

import Foundation

protocol IngredientsViewModelType: AnyObject {
    var inputs: IngredientsViewModelInputs { get }
    var outputs: IngredientsViewModelOutputs { get }
}

protocol IngredientsViewModelInputs: AnyObject {
    func goBackToMyPreferencesScreen()
    func filterContentForSearchText(_ text: String)
    func selectCellAtRow(row: Int)
    func addSelectedIngredient()
}

protocol IngredientsViewModelOutputs: AnyObject {
    var ingredientList: [Ingredient] { get }
    var reloadTableView: () -> Void { get set }
    var rows: [Ingredient] { get }
    var addedIngredients: [Ingredient] { get }
    var selectedIngredient: Ingredient { get }
}

final class IngredientsViewModel: IngredientsViewModelType,
                                  IngredientsViewModelInputs,
                                  IngredientsViewModelOutputs {
    var coordinator: SearchCoordinator?

    var inputs: IngredientsViewModelInputs { return self }
    var outputs: IngredientsViewModelOutputs { return self }

    var reloadTableView: () -> Void = {}

    var addedIngredients: [Ingredient]
    var settingsData: SortingSettingsData

    var rows: [Ingredient] {
            guard !filter.isEmpty else { return ingredientList }
            return ingredientList.filter { (ingredient: Ingredient) -> Bool in
                ingredient.name.lowercased().contains(filter.lowercased())
        }
    }

    var selectedIngredient = Ingredient(name: "",
                                        preferenceName: "",
                                        dishTag: "") {
        didSet {
            reloadTableView()
        }
    }

    var ingredientList = [Ingredient]()

    private var filter: String = "" {
        didSet {
            reloadTableView()
        }
    }

    private let container = DIContainer.shared

    private var ingredientDataProvider: IngredientDataProvider {
        return container.resolve(type: IngredientDataProvider.self)
    }

    init(settingsData: SortingSettingsData) {
        self.settingsData = settingsData
        addedIngredients = settingsData.iDoNotEat

        loadIngredients()
    }

    func goBackToMyPreferencesScreen() {
        coordinator?.showMyPreferencesScreen(settingsData: settingsData)
    }

    func selectCellAtRow(row: Int) {
        selectedIngredient = rows[row]
    }

    func filterContentForSearchText(_ text: String) {
        filter = text
    }

    func addSelectedIngredient() {
        if !selectedIngredient.name.isEmpty {
            settingsData.iDoNotEat.append(selectedIngredient)
            settingsData.iDoNotEat.sort { $0.name < $1.name }
        }

        goBackToMyPreferencesScreen()
    }

    private func loadIngredients() {
        ingredientDataProvider.getEventsDishItems { [weak self] in
            self?.ingredientList = $0
        }
    }
}
