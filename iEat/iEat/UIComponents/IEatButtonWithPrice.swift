//
//  IEatButtonWithPrice.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 14.07.2021.
//

import UIKit

final class IEatButtonWithPrice: IEatButton {
    private let priceLabel = UILabel()

    init(price: Double) {
        super.init(frame: .zero)
        setupPriceLabel(price: price)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func setPrice(price: Double) {
        priceLabel.text = String(price) + " $"
    }

    private func setupPriceLabel(price: Double) {
        priceLabel.backgroundColor = UIColor(red: 255, green: 255, blue: 255, alpha: 0.28)
        priceLabel.layer.masksToBounds = true
        priceLabel.layer.cornerRadius = 3
        priceLabel.font = .iEatButtonFont
        priceLabel.text = String(price) + " $"
        priceLabel.textAlignment = .center
        priceLabel.textColor = .white

        setupLabelConstraints()
    }

    private func setupLabelConstraints() {
        addSubview(priceLabel)
        priceLabel.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            priceLabel.topAnchor.constraint(equalTo: topAnchor, constant: 13),
            priceLabel.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -13),
            priceLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -17)
        ])
        layoutIfNeeded()
        priceLabel.widthAnchor.constraint(equalToConstant: priceLabel.bounds.width + 20).isActive = true
    }
}
