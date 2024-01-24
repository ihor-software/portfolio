//
//  PasscodeView.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 27.05.2021.
//

import UIKit

typealias PasscodeClosure = (String) -> Void

final class PasscodeView: UIView {
    var didEnteredPasscode: PasscodeClosure?

    private let spacing: CGFloat = 15

    private let textFieldsStack = UIStackView()

    private let firstNumberTextfield = PasscodeTextField()
    private let secondNumberTextfield = PasscodeTextField()
    private let thirdNumberTextfield = PasscodeTextField()
    private let fourthNumberTextfield = PasscodeTextField()

    private let statusLabel = UILabel()
    private let checkMarkImageView = UIImageView()

    private lazy var textfieldArray = [firstNumberTextfield,
                                       secondNumberTextfield,
                                       thirdNumberTextfield,
                                       fourthNumberTextfield]

    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    private func commonInit() {
        textFieldsStack.axis = .horizontal
        textFieldsStack.alignment = .fill
        textFieldsStack.distribution = .fillEqually
        textFieldsStack.spacing = 15

        textfieldArray.forEach {
            setupField(textfield: $0)
        }

        addSubview(textFieldsStack)
        textFieldsStack.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            textFieldsStack.trailingAnchor.constraint(equalTo: trailingAnchor),
            textFieldsStack.leadingAnchor.constraint(equalTo: leadingAnchor),
            textFieldsStack.topAnchor.constraint(equalTo: topAnchor),
            firstNumberTextfield.heightAnchor.constraint(equalTo: firstNumberTextfield.widthAnchor)
        ])

        setupLabel()
    }

    private func setupField(textfield: UITextField) {
        textfield.addTarget(self, action: #selector(handleResponders(_:)), for: .editingChanged)
        textFieldsStack.addArrangedSubview(textfield)
    }

    private func setupLabel() {
        statusLabel.font = .iEatTitleFont

        addSubview(statusLabel)
        statusLabel.translatesAutoresizingMaskIntoConstraints = false
        print(statusLabel.frame.size.height)
        NSLayoutConstraint.activate([
            statusLabel.centerXAnchor.constraint(equalTo: centerXAnchor),
            statusLabel.topAnchor.constraint(equalTo: firstNumberTextfield.bottomAnchor, constant: spacing)
        ])

        setupImageView()
    }

    private func setupImageView() {
        checkMarkImageView.image = UIImage(named: "checkMark")
        checkMarkImageView.isHidden = true

        addSubview(checkMarkImageView)
        checkMarkImageView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            checkMarkImageView.leadingAnchor.constraint(equalTo: statusLabel.trailingAnchor, constant: -37),
            checkMarkImageView.topAnchor.constraint(equalTo: statusLabel.topAnchor, constant: -7),
            checkMarkImageView.bottomAnchor.constraint(equalTo: statusLabel.bottomAnchor, constant: 7),
            checkMarkImageView.widthAnchor.constraint(equalTo: checkMarkImageView.heightAnchor)
        ])
    }
}

// MARK: - When this screen appears, focus should be set on the first field, when the user inserts number, textfield focus(UI)  switches to the next field.
private extension PasscodeView {
    @objc func handleResponders(_ textField: UITextField) {
        guard let digit = textField.text?.last?.description else { return }
        guard let digitsCount = textField.text?.count,
              digitsCount > 1 else { return }

        textField.text?.removeLast()

        guard textField != thirdNumberTextfield else {
            fourthNumberTextfield.text = digit

            return endEditing()
        }

        switch textField {
        case firstNumberTextfield:
            secondNumberTextfield.text = digit
            secondNumberTextfield.becomeFirstResponder()
        case secondNumberTextfield:
            thirdNumberTextfield.text = digit
            thirdNumberTextfield.becomeFirstResponder()
        default:
            endEditing()
        }
    }
}

// MARK: - states
extension PasscodeView {
    func validState() {
        setupValidState()
        textfieldArray.forEach {
            $0.handleChangingState(to: .valid)
        }
    }

    func normalState() {
        statusLabel.isHidden = true
        checkMarkImageView.isHidden = true
        textfieldArray.forEach {
            $0.handleChangingState(to: .normal)
        }
    }

    func errorState() {
        setupErrorState()
        textfieldArray.forEach {
            $0.handleChangingState(to: .error)
        }
    }

    private func setupErrorState() {
        statusLabel.isHidden = false
        statusLabel.text = "Invalid Code"
        statusLabel.textColor = .systemRed

        textfieldArray.forEach {
            $0.text = ""
        }

        beginResponderFlow()
    }

    private func turnOffUserInteractionForTextFields() {
        textfieldArray.forEach {
            $0.isUserInteractionEnabled = false
        }
    }

    private func setupValidState() {
        statusLabel.isHidden = false
        statusLabel.text = "Verified   ・"
        statusLabel.textColor = .systemGreen
        checkMarkImageView.isHidden = false

        turnOffUserInteractionForTextFields()
    }
}

extension PasscodeView {
    func resetFields() {
        textfieldArray.forEach {
            $0.text = ""
        }

        normalState()

        firstNumberTextfield.becomeFirstResponder()
    }

    func endEditing() {
        endEditing(false)
        var code: String

        code = firstNumberTextfield.text ?? ""
        code += secondNumberTextfield.text ?? ""
        code += thirdNumberTextfield.text ?? ""
        code += fourthNumberTextfield.text ?? ""

        didEnteredPasscode?(code)
    }

    func beginResponderFlow() {
        firstNumberTextfield.becomeFirstResponder()
    }
}
