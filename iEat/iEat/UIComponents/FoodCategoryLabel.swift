//
//  FoodCategoryLabel.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 19.07.2021.
//

import UIKit

enum FoodCategoryStyle {
    case red
    case blue
}

final class FoodCategoryLabel: UILabel {
    private let oneSideSpacing: CGFloat = 20

    override var intrinsicContentSize: CGSize {
        var contentSize = super.intrinsicContentSize
        contentSize.width += oneSideSpacing * 2
        return contentSize
    }

    init(style: FoodCategoryStyle) {
        super.init(frame: .zero)
        commonInit(style: style)
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    private func commonInit(style: FoodCategoryStyle) {
        layer.cornerRadius = 17
        layer.borderWidth = 1
        layer.masksToBounds = true
        textAlignment = .center

        if style == .blue {
            setupBlueColors()
        } else {
            setupRedColors()
        }

        setupConstraints()
    }

    private func setupRedColors() {
        textColor = UIColor(red: 237, green: 110, blue: 110, alpha: 1)
        backgroundColor = UIColor(red: 237,
                                  green: 110,
                                  blue: 110,
                                  alpha: 0.1)
        layer.borderColor = CGColor(red: 237 / 255,
                                    green: 110 / 255,
                                    blue: 110 / 255,
                                    alpha: 1)
    }

    private func setupBlueColors() {
        backgroundColor = UIColor(red: 0, green: 122, blue: 255, alpha: 0.1)
        textColor = UIColor(red: 0, green: 122, blue: 255, alpha: 1)
        layer.borderColor = CGColor(red: 0,
                                    green: 122 / 255,
                                    blue: 255 / 255,
                                    alpha: 1)
    }

    private func setupConstraints() {
        translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 34)
        ])
    }
}
