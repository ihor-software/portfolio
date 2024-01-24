//
//  FoodCompositionOptionView.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 23.09.2021.
//

import UIKit

final class FoodCompositionOptionView: UIView {
    var bindFoodCompositionTypeToView: (FoodComposition) -> Void = { _ in }

    var foodCompositionType: FoodComposition?

    private lazy var checkBoxButton: CheckBoxButton = {
        let button = CheckBoxButton()
        button.addTarget(self,
                         action: #selector(checkBoxButtonTapped),
                         for: .touchUpInside)

        return button
    }()

    private lazy var label: UILabel = {
        let label = UILabel()
        label.textColor = .black
        label.font = .iEatSubtitleFont
        label.textAlignment = .left

        return label
    }()

    init() {
        super.init(frame: .zero)

        setupConstraints()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func setupLabel(text: String) {
        label.text = text
    }

    func setupCheckBoxButton(isChecked state: Bool) {
        checkBoxButton.isChecked = state
    }

    @objc private func checkBoxButtonTapped() {
        guard let type = foodCompositionType else { return }

        bindFoodCompositionTypeToView(type)
    }

    private func setupConstraints() {
        addSubview(checkBoxButton)
        addSubview(label)

        checkBoxButton.translatesAutoresizingMaskIntoConstraints = false
        label.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            checkBoxButton.leadingAnchor.constraint(equalTo: leadingAnchor),

            label.leadingAnchor.constraint(equalTo: checkBoxButton.trailingAnchor, constant: 10),
            label.centerYAnchor.constraint(equalTo: checkBoxButton.centerYAnchor)
        ])
    }
}
