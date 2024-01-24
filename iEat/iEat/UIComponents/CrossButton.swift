//
//  CrossButton.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 19.07.2021.
//

import UIKit

final class CrossButton: UIButton {
    init() {
        super.init(frame: .zero)
        commonInit()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    private func commonInit() {
        tintColor = .darkGray
        backgroundColor = .clear
        layer.cornerRadius = 12
        setImage(UIImage(systemName: "xmark.circle.fill"), for: .normal)

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
