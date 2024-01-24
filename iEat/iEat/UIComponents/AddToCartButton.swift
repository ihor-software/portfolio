//
//  AddToCartButton.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 07.07.2021.
//

import UIKit

class AddToCartButton: IEatButton {
    static let width = 50
    private let buttonImage = UIImage(named: "cart")

    override init(frame: CGRect) {
        super.init(frame: frame)
        setImage(buttonImage, for: .normal)
        tintColor = .white
        imageEdgeInsets = UIEdgeInsets(top: 16.5, left: 14.5, bottom: 15.9, right: 15)
        setupConstraints()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    private func setupConstraints() {
        translatesAutoresizingMaskIntoConstraints = false
        widthAnchor.constraint(equalToConstant: 50).isActive = true
    }
}
