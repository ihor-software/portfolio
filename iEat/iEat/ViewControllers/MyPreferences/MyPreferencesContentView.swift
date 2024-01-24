//
//  MyPreferencesContentView.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 22.09.2021.
//

import UIKit

final class MyPreferencesContentView: UIView {
    var bindFoodCompositionToView: (FoodComposition) -> Void = { _ in }
    var bindIngredientIndexToView: (Int) -> Void = { _ in }
    var bindAddButtonTapToView: () -> Void = {}

    var settingsData: SortingSettingsData

    private let foodCompositionView = FoodCompositionView()
    private lazy var iDoNotEatView = IDoNotEatView(
        selectedIngredients: settingsData.iDoNotEat)

    private lazy var myPreferencesLabel: UILabel = {
        let boldFont = UIFont(name: "AvenirNext-Bold", size: 20)

        let attributes: [NSAttributedString.Key: Any] = [
            .foregroundColor: UIColor.black,
            .font: boldFont ?? .init()]

        let label = UILabel()
        label.attributedText = .init(string: "My preferences", attributes: attributes)
        label.textColor = .black
        label.textAlignment = .center

        return label
    }()

    private lazy var separatorView: UIView = {
        let view = UIView()
        view.backgroundColor = .iEatSeparator

        return view
    }()

    init(settingsData: SortingSettingsData) {
        self.settingsData = settingsData

        super.init(frame: .zero)

        setupUI()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func updateFoodCompositionsState(settingsData: SortingSettingsData) {
        foodCompositionView.selectedFoodCompositions = settingsData.foodCompositions
    }

    func updateIngredientStateBy(index: Int) {
        iDoNotEatView.updateCheckBoxButtonStateBy(index: index)
    }

    private func setupUI() {
        setupConstraints()
        setupBindings()
        updateFoodCompositionsState(settingsData: settingsData)
    }

    private func setupBindings() {
        foodCompositionView.bindFoodCompositionToView = { [weak self] type in
            self?.bindFoodCompositionToView(type)
        }

        iDoNotEatView.bindIngredientIndexToView = { [weak self] index in
            self?.bindIngredientIndexToView(index)
        }

        iDoNotEatView.bindAddButtonTapToView = { [weak self] in
            self?.bindAddButtonTapToView()
        }
    }

    private func setupConstraints() {
        addSubview(myPreferencesLabel)
        addSubview(foodCompositionView)
        addSubview(separatorView)
        addSubview(iDoNotEatView)

        myPreferencesLabel.translatesAutoresizingMaskIntoConstraints = false
        foodCompositionView.translatesAutoresizingMaskIntoConstraints = false
        separatorView.translatesAutoresizingMaskIntoConstraints = false
        iDoNotEatView.translatesAutoresizingMaskIntoConstraints = false

        let ingredientsCount = CGFloat(settingsData.iDoNotEat.count * 22)
        let spaceBetweenIngredients = CGFloat(settingsData.iDoNotEat.count - 1) * 12

        NSLayoutConstraint.activate([
            myPreferencesLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
            myPreferencesLabel.topAnchor.constraint(equalTo: topAnchor, constant: 48),
            myPreferencesLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24),
            myPreferencesLabel.heightAnchor.constraint(equalToConstant: 22),

            foodCompositionView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
            foodCompositionView.topAnchor.constraint(equalTo: myPreferencesLabel.bottomAnchor, constant: 32),
            foodCompositionView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24),
            foodCompositionView.heightAnchor.constraint(equalToConstant: 194),

            separatorView.leadingAnchor.constraint(equalTo: leadingAnchor),
            separatorView.topAnchor.constraint(equalTo: foodCompositionView.bottomAnchor, constant: 24),
            separatorView.trailingAnchor.constraint(equalTo: trailingAnchor),
            separatorView.heightAnchor.constraint(equalToConstant: 1),

            iDoNotEatView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
            iDoNotEatView.topAnchor.constraint(equalTo: separatorView.bottomAnchor, constant: 24),
            iDoNotEatView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24),
            iDoNotEatView.bottomAnchor.constraint(equalTo: bottomAnchor),
            iDoNotEatView.heightAnchor.constraint(equalToConstant: 40 +
                                                  ingredientsCount +
                                                  spaceBetweenIngredients)
        ])
    }

}
