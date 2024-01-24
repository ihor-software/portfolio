//
//  NewPhoneViewModel.swift
//  iEat
//
//  Created by Ihor Vasyliev on 02.09.2021.
//

import Foundation

protocol NewPhoneViewModelType: AnyObject {
    var inputs: NewPhoneViewModelInputs { get }
    var outputs: NewPhoneViewModelOutputs { get }
}

protocol NewPhoneViewModelInputs: AnyObject {
    func numbersButtonTapped()
    func addToPhoneNumberNewDigit(_ digit: String)
    func setupInitialCountry()
    func addPhoneNumber(phoneNumber: PhoneNumbersModel)
}

protocol NewPhoneViewModelOutputs: AnyObject {
    var bindSelectedCountryToView: (String) -> Void { get set }
    var bindPhoneNumberToView: (String) -> Void { get set }
    var bindButtonStateToView: (ButtonState) -> Void { get set }
}

final class NewPhoneViewModel: NewPhoneViewModelType,
                               NewPhoneViewModelInputs,
                               NewPhoneViewModelOutputs {
    private enum Const {
        static let phoneNumberKey = "phoneNumbersStore"
    }
    var inputs: NewPhoneViewModelInputs { return self }
    var outputs: NewPhoneViewModelOutputs { return self }

    var bindSelectedCountryToView: (String) -> Void = { _ in }
    var bindPhoneNumberToView: (String) -> Void = { _ in }
    var bindButtonStateToView: (ButtonState) -> Void = { _ in }

    var coordinator: AuthorizationFlowCoordinator?

    private var selectedCountry = "" {
        didSet {
            bindSelectedCountryToView(selectedCountry)
        }
    }

    private var formattedPhoneNumber = "" {
        didSet {
            bindPhoneNumberToView(formattedPhoneNumber)
        }
    }

    private var buttonState: ButtonState = .disabled {
        didSet {
            bindButtonStateToView(buttonState)
        }
    }

    private var maxNumberLength = 0
    private var phoneFormat = ""
    private var selectedCountryModel = CountryCodeDataModel(flag: "🇺🇦", name: "Ukraine", code: "+380")
    private var phoneNumber = ""

    init() {
        setupFormattingDataForUserInput()
    }

    func addToPhoneNumberNewDigit(_ digit: String) {
        guard Int(digit) != nil || digit.isEmpty else { return }

        if digit.isEmpty {
            phoneNumber.removeLast()
        } else {
            phoneNumber += digit
        }

        guard phoneNumber.count <= maxNumberLength else {
            phoneNumber.removeLast()

            return
        }

        formattedPhoneNumber = formatPhone(number: phoneNumber)

        changeButtonState()
    }

    private func changeButtonState() {
        let digitsCount = phoneNumber.count

        if digitsCount >= maxNumberLength {
            buttonState = .active
        } else {
            buttonState = .disabled
        }
    }

    func numbersButtonTapped() {
        coordinator?.openCountryList(selectedCountryModel) { [weak self] country in
            guard let self = self else { return }

            self.selectedCountryModel = country

            let data = self.mapCountryToString()

            self.setupFormattingDataForUserInput()

            self.selectedCountry = data
            self.phoneNumber = ""
            self.formattedPhoneNumber = ""
        }
    }

    func setupInitialCountry() {
        let data = mapCountryToString()

        selectedCountry = data
    }

    private func mapCountryToString() -> String {
        return selectedCountryModel.flag + " " + selectedCountryModel.code + " ▾"
    }

    private func setupFormattingDataForUserInput() {
        let code = selectedCountryModel.code

        switch code {
        case "+380":
            maxNumberLength = 9
            phoneFormat = "(XX) XXX-XX-XX"
        case "+375":
            maxNumberLength = 9
            phoneFormat = "(XX) XXX-XX-XX"
        case "+7":
            maxNumberLength = 10
            phoneFormat = "(XXX) XXX-XX-XX"
        default:
            maxNumberLength = 1
        }
    }

    private func formatPhone(number: String) -> String {
        var formattedPhoneNumber = ""
        var index = number.startIndex

        phoneFormat.forEach { symbol in
            guard index < number.endIndex else { return }

            if symbol == "X" {
                formattedPhoneNumber.append(number[index])

                index = number.index(after: index)

            } else {
                formattedPhoneNumber.append(symbol)
            }
        }

        return formattedPhoneNumber
    }

    private func getFullFormattedPhoneNumber() -> String {
        let code = selectedCountryModel.code
        let fullFormattedPhoneNumber = "\(code) \(formattedPhoneNumber)"

        return fullFormattedPhoneNumber
    }
    
    func addPhoneNumber(phoneNumber: PhoneNumbersModel) {
        if let data = UserDefaults.standard.data(forKey: Const.phoneNumberKey) {
            do {
                let decoder = JSONDecoder()
                var phoneNumbers = try decoder.decode([PhoneNumbersModel].self, from: data)
                phoneNumbers.append(phoneNumber)
                addToDefaults(phoneModel: phoneNumbers)
            } catch {
                print(error.localizedDescription)
            }
        } else {
            addToDefaults(phoneModel: [PhoneNumbersModel()])
        }
    }

    private func addToDefaults(phoneModel: [PhoneNumbersModel]) {
        do {
            let encoder = JSONEncoder()
            let data = try encoder.encode(phoneModel)
            UserDefaults.standard.set(data, forKey: Const.phoneNumberKey)
        } catch {
            print(error.localizedDescription)
        }
    }
}
