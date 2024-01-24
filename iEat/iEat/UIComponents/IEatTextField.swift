//
//  IEatTextField.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/15/21.
//
import UIKit

class IEatTextField: UITextField {
    override init(frame: CGRect) {
        super.init(frame: frame)
        let leftViewForInset = UIView(frame: .init(x: 0, y: 0, width: 20, height: 5))
        self.leftView = leftViewForInset
        self.leftViewMode = .always
        self.textColor = .black
        self.tintColor = .black
        self.font = .systemFont(ofSize: UIFont.buttonFontSize)
        self.backgroundColor = .init(red: 246, green: 246, blue: 246, alpha: 1)
        self.keyboardType = .numberPad
        self.layer.cornerRadius = 13
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
