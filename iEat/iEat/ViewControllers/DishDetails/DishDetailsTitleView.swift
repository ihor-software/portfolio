//
//  OpenCardTitleView.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 19.07.2021.
//

import UIKit

final class DishDetailsTitleView: UIView {
    private let decrementButton = QuantityButton(style: .decrement)
    private let incrementButton = QuantityButton(style: .increment)

    private var dishQuantity: Int = 1 {
        didSet {
            if dishQuantity <= 1 {
                decrementButton.makeDeactivated()
                dishQuantity = 1
            } else {
                decrementButton.makeActivated()
            }
            if dishQuantity >= 99 {
                dishQuantity = 99
                incrementButton.makeDeactivated()
            } else {
                incrementButton.makeActivated()
            }
            quantityLabel.text = String(dishQuantity)
        }
    }

    private let quantityLabel: UILabel = {
        let quantityLabel = UILabel()
        quantityLabel.textAlignment = .center
        quantityLabel.text = "1"

        return quantityLabel
    }()

    private let titleLabel: UILabel = {
        let titleLabel = UILabel()
        titleLabel.font = .iEatOpenCardTitleFont

        return titleLabel
    }()

    private let weightCaloriesLabel: UILabel = {
        let kcalLabel = UILabel()
        kcalLabel.font = .iEatOpenCardWeightCaloriesFont
        kcalLabel.textColor = .iEatTextLightGrey

        return kcalLabel
    }()

    init(title: String, weight: Int, calories: Int) {
        super.init(frame: .zero)
        commonInit(title: title, weight: weight, calories: calories)
        decrementButton.makeDeactivated()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func commonInit(title: String, weight: Int, calories: Int) {
        titleLabel.text = title
        weightCaloriesLabel.text = "\(weight)g | \(calories) kcal"
        backgroundColor = .white

        setupConstraints()

        decrementButton.addTarget(self,
                                  action: #selector(didDecrement),
                                  for: .touchUpInside)

        incrementButton.addTarget(self,
                                  action: #selector(didIncrement),
                                  for: .touchUpInside)
    }

    @objc func didIncrement() {
        dishQuantity += 1
    }

    @objc private func didDecrement() {
        dishQuantity -= 1
    }
}

// MARK: - methods for setting constraints

private extension DishDetailsTitleView {
    func setupConstraints() {
        setupQuantityLabelConstraints()
        setupButtonsConstraints()
        setupLabelsConstraints()
        setupSeparatorViewConstraints()
    }

    func setupLabelsConstraints() {
        addSubview(titleLabel)
        addSubview(weightCaloriesLabel)

        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        weightCaloriesLabel.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: topAnchor, constant: 17),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor,
                                                constant: 17),
            weightCaloriesLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            weightCaloriesLabel.leadingAnchor.constraint(equalTo: leadingAnchor,
                                                         constant: 17)
        ])
    }

    func setupQuantityLabelConstraints() {
        addSubview(quantityLabel)
        quantityLabel.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            quantityLabel.widthAnchor.constraint(equalToConstant: 40),
            quantityLabel.heightAnchor.constraint(equalToConstant: 20),
            quantityLabel.topAnchor.constraint(equalTo: topAnchor, constant: 27)
        ])
    }

    func setupButtonsConstraints() {
        addSubview(incrementButton)
        addSubview(decrementButton)

        NSLayoutConstraint.activate([
            incrementButton.leadingAnchor.constraint(equalTo: quantityLabel.trailingAnchor),
            incrementButton.topAnchor.constraint(equalTo: quantityLabel.topAnchor),

            decrementButton.trailingAnchor.constraint(equalTo: quantityLabel.leadingAnchor),
            decrementButton.topAnchor.constraint(equalTo: quantityLabel.topAnchor),

            incrementButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16)
        ])
    }

    func setupSeparatorViewConstraints() {
        let separatorView = UIView()
        separatorView.backgroundColor = .lightGray

        addSubview(separatorView)

        separatorView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            separatorView.topAnchor.constraint(equalTo: weightCaloriesLabel.bottomAnchor, constant: 16),
            separatorView.heightAnchor.constraint(equalToConstant: 0.5),
            separatorView.widthAnchor.constraint(equalToConstant: 500)
        ])
    }
}
