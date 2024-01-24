//
//  IEatButton.swift
//  iEat
//
//  Created by Macbook on 27.05.2021.
//

import UIKit

class IEatButton: UIButton {
    // MARK: - Private Properties

    private let buttonHeight: CGFloat = 50

    // MARK: - Initialization

    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // MARK: - Private Methods

    private func setup() {
        clipsToBounds = true
        titleLabel?.font = UIFont.iEatButtonFont
        backgroundColor = UIColor(red: 0.0,
                                  green: 122.0 / 255.0,
                                  blue: 225.0 / 255.0,
                                  alpha: 1.0)
        translatesAutoresizingMaskIntoConstraints = false
        heightAnchor.constraint(equalToConstant: buttonHeight).isActive = true
        layer.cornerRadius = 14
    }
}
