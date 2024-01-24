//
//  SortByOptionView.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 16.09.2021.
//

import UIKit

final class SortByOptionView: UIView {
    var bindRadioButtonActionToView: (SortBySettingType) -> Void = { _ in }

    var sortBySettingType: SortBySettingType?

    private lazy var radioButton: RadioButton = {
        let button = RadioButton()
        button.addTarget(self,
                         action: #selector(radioButtonTapped),
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

    func setupRadioButton(isChecked state: Bool) {
        radioButton.isChecked = state
    }

    @objc private func radioButtonTapped() {
        guard let type = sortBySettingType else { return }

        bindRadioButtonActionToView(type)
    }

    private func setupConstraints() {
        addSubview(radioButton)
        addSubview(label)

        radioButton.translatesAutoresizingMaskIntoConstraints = false
        label.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            radioButton.leadingAnchor.constraint(equalTo: leadingAnchor),

            label.leadingAnchor.constraint(equalTo: radioButton.trailingAnchor, constant: 10),
            label.centerYAnchor.constraint(equalTo: radioButton.centerYAnchor)
        ])
    }
}
