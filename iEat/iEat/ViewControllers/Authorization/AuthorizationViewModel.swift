//
//  AuthorizationViewModel.swift
//  iEat
//
//  Created by Igor Vasyliev on 5/25/21.
//

import Foundation

enum ButtonState {
    case active, disabled
}

protocol AuthorizationViewModelType: AnyObject {
    var inputs: AuthorizationViewModelInputs { get }
    var outputs: AuthorizationViewModelOutputs { get }
}

protocol AuthorizationViewModelInputs: AnyObject {
    func numbersButtonTapped()
    func nextButtonTapped()
    func addToPhoneNumberNewDigit(_ digit: String)
    func setupInitialCountry()
    func skipAuthorization()
}

protocol AuthorizationViewModelOutputs: AnyObject {
    var maxNumberLength: Int { get }

    var bindSelectedCountryToView: (String) -> Void { get set }
    var bindPhoneNumberToView: (String) -> Void { get set }
    var bindButtonStateToView: (ButtonState) -> Void { get set }

    func getAnswerFromServer() -> Bool
}

final class AuthorizationViewModel: AuthorizationViewModelType,
                                    AuthorizationViewModelInputs,
                                    AuthorizationViewModelOutputs {
    var inputs: AuthorizationViewModelInputs { return self }
    var outputs: AuthorizationViewModelOutputs { return self }

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

    private(set) var maxNumberLength = 0
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

    func nextButtonTapped() {
        coordinator?.startVerificationProcessWith(getFullFormattedPhoneNumber())
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

    func skipAuthorization() {
        coordinator?.finish()
    }

    func getAnswerFromServer() -> Bool {
        return false
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
}
