//
//  PasscodeTextField.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 27.05.2021.
//

import UIKit

enum TextFieldState {
    case normal
    case error
    case valid
}

class PasscodeTextField: UITextField {
    private var textFieldState = TextFieldState.normal

    private var borderColor: UIColor {
        switch textFieldState {
        case .normal:
            return UIColor(red: 246, green: 246, blue: 246, alpha: 1)
        case .error:
            return .systemRed
        case .valid:
            return .systemGreen
        }
    }

    private var textFieldBackgroundColor: UIColor {
        switch textFieldState {
        case .normal:
            return UIColor(red: 246, green: 246, blue: 246, alpha: 1)
        case .error:
            return UIColor(red: 254, green: 234, blue: 233, alpha: 1)
        case .valid:
            return UIColor(red: 214, green: 230, blue: 218, alpha: 1)
        }
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        layer.cornerRadius = bounds.height * 0.2
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }

    required public init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    private func setup() {
        layer.borderWidth = 2
        layer.borderColor = borderColor.cgColor
        backgroundColor = textFieldBackgroundColor
        textAlignment = .center
        textContentType = .oneTimeCode
        keyboardType = .numberPad
        font = .iEatTitleFont
        tintColor = .black
    }

    func handleChangingState(to state: TextFieldState) {
        textFieldState = state
        layer.borderColor = borderColor.cgColor
        backgroundColor = textFieldBackgroundColor
    }
}
