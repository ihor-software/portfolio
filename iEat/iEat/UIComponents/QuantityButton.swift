//
//  QuantityButton.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 19.07.2021.
//

import UIKit

final class QuantityButton: UIButton {
    enum QuantityStyle {
        case increment
        case decrement
    }

    private(set) var isActivated = true

    init(style: QuantityStyle) {
        super.init(frame: .zero)
        commonInit(style: style)
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    func toggleActivation() {
        isActivated ? makeDeactivated() : makeActivated()
    }

    func makeDeactivated() {
        isActivated.toggle()
        backgroundColor = .iEatGrey
    }

    func makeActivated() {
        isActivated.toggle()
        backgroundColor = .iEatBlue
    }

    private func commonInit(style: QuantityStyle) {
        if style == .increment {
            self.setImage(UIImage(systemName: "plus"), for: .normal)
        } else {
            self.setImage(UIImage(systemName: "minus"), for: .normal)
        }

        tintColor = .white
        backgroundColor = .iEatBlue
        layer.cornerRadius = 8

        setupConstraints()
    }

    private func setupConstraints() {
        translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            widthAnchor.constraint(equalToConstant: 24),
            heightAnchor.constraint(equalToConstant: 24)
        ])
    }
}
