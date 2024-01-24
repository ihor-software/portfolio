//
//  FoodCompositionView.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 22.09.2021.
//

import UIKit

final class FoodCompositionView: UIView {
    var bindFoodCompositionToView: (FoodComposition) -> Void = { _ in }

    var selectedFoodCompositions: Set<FoodComposition> = .init() {
        didSet {
            updateCheckBoxButtonsState()
        }
    }

    private lazy var foodCompositionLabel: UILabel = {
        let label = UILabel()
        label.text = "Food composition"
        label.font = .boldSystemFont(ofSize: 18)
        label.textColor = .black

        return label
    }()

    private let vegeterianFoodCompositionOptionView = FoodCompositionOptionView()
    private let balancedHealthyFoodCompositionOptionView = FoodCompositionOptionView()
    private let lowInCaloriesFoodCompositionOptionView = FoodCompositionOptionView()
    private let substantialFoodCompositionOptionView = FoodCompositionOptionView()
    private let spicyFoodFoodCompositionOptionView = FoodCompositionOptionView()

    private lazy var foodCompositionStackView: UIStackView = {
        let stackView = UIStackView(arrangedSubviews: [
            vegeterianFoodCompositionOptionView,
            balancedHealthyFoodCompositionOptionView,
            lowInCaloriesFoodCompositionOptionView,
            substantialFoodCompositionOptionView,
            spicyFoodFoodCompositionOptionView
        ])

        stackView.distribution = .fillEqually
        stackView.axis = .vertical
        stackView.spacing = 12

        return stackView
    }()

    private lazy var optionsArray = [
        vegeterianFoodCompositionOptionView,
        balancedHealthyFoodCompositionOptionView,
        lowInCaloriesFoodCompositionOptionView,
        substantialFoodCompositionOptionView,
        spicyFoodFoodCompositionOptionView
    ]

    init() {
        super.init(frame: .zero)

        setupUI()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupUI() {
        setupOptionLabels()
        setupOptionSettingTypes()
        setupOptionButtons()
        setupConstraints()
    }

    private func setupOptionLabels() {
        vegeterianFoodCompositionOptionView.setupLabel(text: "🥗 Vegetarian")
        balancedHealthyFoodCompositionOptionView.setupLabel(text: "🍱 Balanced and healthy")
        lowInCaloriesFoodCompositionOptionView.setupLabel(text: "🍽️ Low in calories")
        substantialFoodCompositionOptionView.setupLabel(text: "🍗 Substantial")
        spicyFoodFoodCompositionOptionView.setupLabel(text: "🌶 Spicy food")
    }

    private func setupOptionSettingTypes() {
        optionsArray.enumerated().forEach {
            $1.foodCompositionType = FoodComposition.init(rawValue: $0)
        }
    }

    private func setupOptionButtons() {
        optionsArray.forEach {
            $0.bindFoodCompositionTypeToView = { [weak self] type in
                self?.checkBoxTapped(with: type)
            }
        }
    }

    private func checkBoxTapped(with type: FoodComposition) {
        bindFoodCompositionToView(type)
    }

    private func updateCheckBoxButtonsState() {
        optionsArray.forEach {
            guard let type = $0.foodCompositionType else { return }

            $0.setupCheckBoxButton(isChecked: selectedFoodCompositions.contains(type))
        }
    }

    private func setupConstraints() {
        addSubview(foodCompositionLabel)
        addSubview(foodCompositionStackView)

        foodCompositionLabel.translatesAutoresizingMaskIntoConstraints = false
        foodCompositionStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            foodCompositionLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            foodCompositionLabel.topAnchor.constraint(equalTo: topAnchor),
            foodCompositionLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            foodCompositionLabel.heightAnchor.constraint(equalToConstant: 22),

            foodCompositionStackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            foodCompositionStackView.topAnchor.constraint(equalTo: foodCompositionLabel.bottomAnchor, constant: 16),
            foodCompositionStackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            foodCompositionStackView.bottomAnchor.constraint(equalTo: bottomAnchor)
        ])
    }
}
