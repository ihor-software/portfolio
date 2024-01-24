//
//  SortingSettingsViewModel.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 03.08.2021.
//

import Foundation

protocol SortingSettingsViewModelType: AnyObject {
    var inputs: SortingSettingsViewModelInputs { get }
    var outputs: SortingSettingsViewModelOutputs { get }
}

protocol SortingSettingsViewModelInputs: AnyObject {
    var settingsData: SortingSettingsData { get }

    func acceptSelectedSettings()
    func updateSortBySettings(type: SortBySettingType)
    func updateHotPriceOffersSettings()
    func updateConsiderMyPreferencesSettings()
    func addToFromPriceNew(digit: String)
    func addToToPriceNew(digit: String)
    func editMyPreferences()
}

protocol SortingSettingsViewModelOutputs: AnyObject {
    var bindSettingsDataToView: (SortingSettingsData) -> Void { get set }
}

final class SortingSettingsViewModel: SortingSettingsViewModelType,
                                      SortingSettingsViewModelInputs,
                                      SortingSettingsViewModelOutputs {
    var coordinator: SearchCoordinator?

    var inputs: SortingSettingsViewModelInputs { return self }
    var outputs: SortingSettingsViewModelOutputs { return self }

    var bindSettingsDataToView: (SortingSettingsData) -> Void = { _ in }

    var settingsData: SortingSettingsData {
        didSet {
            bindSettingsDataToView(settingsData)
        }
    }

    private let maxPriceLength = 3

    init(settingsData: SortingSettingsData) {
        self.settingsData = settingsData
    }

    func updateSortBySettings(type: SortBySettingType) {
        settingsData.sortBy = type
    }

    func updateHotPriceOffersSettings() {
        settingsData.hotPriceOffers.toggle()
    }

    func updateConsiderMyPreferencesSettings() {
        settingsData.considerMyPreferences.toggle()
    }

    func acceptSelectedSettings() {
        coordinator?.finishSortingSettingsFlow(with: settingsData)
    }

    func addToFromPriceNew(digit: String) {
        settingsData.fromPrice = setupPrice(settings: settingsData.fromPrice, with: digit)
    }

    func addToToPriceNew(digit: String) {
        settingsData.toPrice = setupPrice(settings: settingsData.toPrice, with: digit)
    }

    func editMyPreferences() {
        coordinator?.showMyPreferencesScreen(settingsData: settingsData)
    }

    private func setupPrice(settings: String, with digit: String) -> String {
        settingsData.fromPriceOrToPricaChanged = true

        guard Int(digit) != nil || digit.isEmpty else { return settings }

        var priceSettings = settings

        if digit.isEmpty {
            priceSettings.removeLast()
        } else {
            priceSettings += digit
        }

        guard priceSettings.count > maxPriceLength else {
            return priceSettings
        }

        priceSettings.removeLast()

        return priceSettings
    }
}
