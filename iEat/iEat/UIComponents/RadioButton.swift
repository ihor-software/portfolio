//
//  RadioButton.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 05.08.2021.
//

import UIKit

final class RadioButton: UIButton {
    private enum ImageName: String {
        case radioButtonChecked
        case radioButtonUnchecked
    }

    private let checkedStateImage = UIImage(named: ImageName.radioButtonChecked.rawValue)
    private let uncheckedStateImage = UIImage(named: ImageName.radioButtonUnchecked.rawValue)

    var isChecked = false {
        didSet {
            changeButtonState()
        }
    }

    init() {
        super.init(frame: .zero)

        setupConstraints()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    @objc private func changeButtonState() {
        setImage(isChecked ? checkedStateImage : uncheckedStateImage, for: .normal)
    }

    private func setupConstraints() {
        translatesAutoresizingMaskIntoConstraints = false

        widthAnchor.constraint(equalToConstant: 16).isActive = true
        heightAnchor.constraint(equalToConstant: 16).isActive = true
    }
}
