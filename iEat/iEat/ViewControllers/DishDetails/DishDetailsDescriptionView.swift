//
//  OpenCardDescriptionView.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 19.07.2021.
//

import UIKit

final class DishDetailsDescriptionView: UIView {
    private let descriptionLabel: UILabel = {
        let descriptionLabel = UILabel()
        descriptionLabel.font = .iEatOpenCardDescriptionFont
        descriptionLabel.textColor = .black
        descriptionLabel.numberOfLines = 3

        return descriptionLabel
    }()

    private let foodCategoriesStack: UIStackView = {
        let stack = UIStackView()
        stack.axis = .horizontal

        return stack
    }()

    init(description: String, categories: [FoodCategory]) {
        super.init(frame: .zero)
        commonInit(description: description, categories: categories)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func commonInit(description: String, categories: [FoodCategory]) {
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.lineSpacing = 10

        let attributedString = NSMutableAttributedString(string: description)
        attributedString.addAttribute(NSAttributedString.Key.paragraphStyle,
                                      value: paragraphStyle,
                                      range: NSRange(location: 0, length: attributedString.length))

        descriptionLabel.attributedText = attributedString

        setupTextViewConstraints()
        setupFoodCategoriesStack(categories: categories)
    }

    private func setupFoodCategoriesStack(categories: [FoodCategory]) {
        categories.forEach {
            let label = FoodCategoryLabel(style: $0.style)
            label.text = $0.title
            foodCategoriesStack.addArrangedSubview(label)
        }
        foodCategoriesStack.distribution = .equalSpacing
        foodCategoriesStack.spacing = 8

        setupStackConstraints()
    }
}

// MARK: - methods for setting constraints

private extension DishDetailsDescriptionView {
    private func setupTextViewConstraints() {
        addSubview(descriptionLabel)
        descriptionLabel.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            descriptionLabel.topAnchor.constraint(equalTo: topAnchor),
            descriptionLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            descriptionLabel.trailingAnchor.constraint(equalTo: trailingAnchor)
        ])
    }

    private func setupStackConstraints() {
        addSubview(foodCategoriesStack)
        foodCategoriesStack.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            foodCategoriesStack.topAnchor.constraint(equalTo: descriptionLabel.bottomAnchor, constant: 16),
            foodCategoriesStack.leadingAnchor.constraint(equalTo: leadingAnchor)
        ])
    }
}
