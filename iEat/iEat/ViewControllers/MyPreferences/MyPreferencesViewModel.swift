//
//  MyPreferencesViewModel.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 22.09.2021.
//

import Foundation

protocol MyPreferencesViewModelType: AnyObject {
    var inputs: MyPreferencesViewModelInputs { get }
    var outputs: MyPreferencesViewModelOutputs { get }
}

protocol MyPreferencesViewModelInputs: AnyObject {
    var settingsData: SortingSettingsData { get }
    var deselectedIngredients: Set<Ingredient> { get }

    func updateFoodCompositionsSettings(type: FoodComposition)
    func updateIngredientStateBy(index: Int)
    func confirmPreferences()
    func showListOfIngredientsScreen()
}

protocol MyPreferencesViewModelOutputs: AnyObject {
    var bindSettingsDataToView: (SortingSettingsData) -> Void { get set }
    var bindUpdatedIngredientStateIndexToView: (Int) -> Void { get set }
}

final class MyPreferencesViewModel: MyPreferencesViewModelType,
                                    MyPreferencesViewModelInputs,
                                    MyPreferencesViewModelOutputs {
    var coordinator: SearchCoordinator?

    var inputs: MyPreferencesViewModelInputs { return self }
    var outputs: MyPreferencesViewModelOutputs { return self }

    var bindSettingsDataToView: (SortingSettingsData) -> Void = { _ in }
    var bindUpdatedIngredientStateIndexToView: (Int) -> Void = { _ in }

    var settingsData: SortingSettingsData {
        didSet {
            bindSettingsDataToView(settingsData)
        }
    }

    var deselectedIngredients = Set<Ingredient>()

    init(settingsData: SortingSettingsData) {
        self.settingsData = settingsData
    }

    func updateFoodCompositionsSettings(type: FoodComposition) {
        if settingsData.foodCompositions.contains(type) {
            settingsData.foodCompositions.remove(type)
        } else {
            settingsData.foodCompositions.insert(type)
        }
    }

    func updateIngredientStateBy(index: Int) {
        let ingredient = settingsData.iDoNotEat[index]

        if deselectedIngredients.contains(ingredient) {
            deselectedIngredients.remove(ingredient)
        } else {
            deselectedIngredients.insert(ingredient)
        }

        bindUpdatedIngredientStateIndexToView(index)
    }

    func confirmPreferences() {
        updateIDoNotEatSettings()

        coordinator?.startSortingSettingsFlow(settingsData: settingsData)
    }

    func showListOfIngredientsScreen() {
        coordinator?.showListOfIngredientsScreen(settingsData: settingsData)
    }

    private func updateIDoNotEatSettings() {
        deselectedIngredients.forEach {
            guard let index = settingsData.iDoNotEat.firstIndex(of: $0) else { return }

            settingsData.iDoNotEat.remove(at: index)
        }
    }
}
