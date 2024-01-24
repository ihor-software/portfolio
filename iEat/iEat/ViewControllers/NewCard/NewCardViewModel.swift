//
//  NewCardViewModel.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/21/21.
//

import UIKit

protocol NewCardViewModelType: AnyObject {
    var inputs: NewCardViewModelInputs { get }
    var outputs: NewCardViewModelOutputs { get }
}

protocol NewCardViewModelInputs: AnyObject {
    func addPaymentMethod(paymentMethod: PaymentMethodModel)
    func formatTextField(textField: UITextField, cardTextField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool
}

protocol NewCardViewModelOutputs: AnyObject {
}

final class NewCardViewModel: NewCardViewModelType,
                                    NewCardViewModelInputs,
                                    NewCardViewModelOutputs {
    private enum Const {
        static let paymentMethodsKey = "paymentMethodStore"
    }

    var inputs: NewCardViewModelInputs { return self }
    var outputs: NewCardViewModelOutputs { return self }

    func formatTextField(textField: UITextField, cardTextField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        guard let currentText = (textField.text as NSString?)?.replacingCharacters(in: range, with: string) else { return true }
        if textField == cardTextField {
            textField.text = currentText.grouping(every: 4, with: " ")
        }
        if cardTextField.text?.count ?? 0 >= 19 {
            cardTextField.endEditing(true)
        }
        return false
    }

    func addPaymentMethod(paymentMethod: PaymentMethodModel) {
        if let data = UserDefaults.standard.data(forKey: Const.paymentMethodsKey) {
            do {
                let decoder = JSONDecoder()
                var paymentMethods = try decoder.decode([PaymentMethodModel].self, from: data)
                paymentMethods.append(paymentMethod)
                addToDefaults(paymentModel: paymentMethods)
            } catch {
                print(error.localizedDescription)
            }
        } else {
            addToDefaults(paymentModel: [PaymentMethodModel()])
        }
    }

    private func addToDefaults(paymentModel: [PaymentMethodModel]) {
        do {
            let encoder = JSONEncoder()
            let data = try encoder.encode(paymentModel)
            print(paymentModel)
            UserDefaults.standard.set(data, forKey: Const.paymentMethodsKey)
        } catch {
            print(error.localizedDescription)
        }
    }
}
