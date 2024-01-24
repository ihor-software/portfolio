//
//  CountryPickerViewModel.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 23.05.2021.
//

import Foundation

protocol CountryPickerViewModelType: AnyObject {
    var inputs: CountryPickerViewModelInputs { get }
    var outputs: CountryPickerViewModelOutputs { get }
}

protocol CountryPickerViewModelInputs: AnyObject {
    func filterContentForSearchText(_ text: String)
    func passToModelSelected()
    func selectCellAtRow(row: Int)
}

protocol CountryPickerViewModelOutputs: AnyObject {
    var reloadTableView: () -> Void { get set }
    var rows: [CountryCodeDataModel] { get }
    var selectedCountry: CountryCodeDataModel { get }
}

final class CountryPickerViewModel: CountryPickerViewModelType,
                                    CountryPickerViewModelInputs,
                                    CountryPickerViewModelOutputs {
    var inputs: CountryPickerViewModelInputs { return self }
    var outputs: CountryPickerViewModelOutputs { return self }

    var completion: ((CountryCodeDataModel) -> Void)?

    var reloadTableView: () -> Void = {}

    var rows: [CountryCodeDataModel] {
            guard !filter.isEmpty else { return dataSource }
            return dataSource.filter { (country: CountryCodeDataModel) -> Bool in
                country.name.lowercased().contains(filter.lowercased()) || String(country.code).contains(filter)
        }
    }

    var selectedCountry: CountryCodeDataModel {
        didSet {
            reloadTableView()
        }
    }

    private var filter: String = "" {
        didSet {
            reloadTableView()
        }
    }

    private var dataSource = [CountryCodeDataModel]() {
        didSet {
            reloadTableView()
        }
    }

    init(country: CountryCodeDataModel) {
        selectedCountry = country
        createMockData()
    }

    private func createMockData() {
        let ukraine = CountryCodeDataModel(
            flag: "🇺🇦",
            name: "Ukraine",
            code: "+380")

        let belarus = CountryCodeDataModel(
            flag: "🇧🇾",
            name: "Belarus",
            code: "+375")

        let russia = CountryCodeDataModel(
            flag: "🇷🇺",
            name: "Russia",
            code: "+7")

        dataSource = [ukraine, belarus, russia]
    }

    func selectCellAtRow(row: Int) {
        selectedCountry = rows[row]
    }

    func filterContentForSearchText(_ text: String) {
        filter = text
    }

    func passToModelSelected() {
        self.completion?(selectedCountry)
    }
}
