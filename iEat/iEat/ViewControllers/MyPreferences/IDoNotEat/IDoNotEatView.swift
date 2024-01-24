//
//  IDoNotEatView.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 22.09.2021.
//

import UIKit

final class IDoNotEatView: UIView {
    var bindIngredientIndexToView: (Int) -> Void = { _ in }
    var bindAddButtonTapToView: () -> Void = {}

    private var selectedIngredients: [Ingredient]

    private lazy var iDoNotItLabel: UILabel = {
        let label = UILabel()
        label.text = "I DON'T eat:"
        label.font = .boldSystemFont(ofSize: 18)
        label.textColor = .black

        return label
    }()

    private lazy var addButton: UIButton = {
        let button = UIButton()
        button.setTitle("Add +", for: .normal)
        button.setTitleColor(.systemBlue, for: .normal)
        button.addTarget(self,
                         action: #selector(addTapped), for: .touchUpInside)

        return button
    }()

    private lazy var iDoNotEatStackView: UIStackView = {
        let stackView = UIStackView(arrangedSubviews: [
            iDoNotItLabel,
            addButton
        ])

        stackView.axis = .horizontal
        stackView.distribution = .equalSpacing

        return stackView
    }()

    private let bottomStackView = UIStackView()

    private var optionsArray = [IDoNotEatOptionView]()

    init(selectedIngredients: [Ingredient]) {
        self.selectedIngredients = selectedIngredients

        super.init(frame: .zero)

        setupUI()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func updateCheckBoxButtonStateBy(index: Int) {
        optionsArray[index].updateCheckBoxButtonState()
    }

    private func setupUI() {
        setupOptionLabels()
        setupOptionButtons()
        setupStackView()
        setupConstraints()
    }

    private func setupOptionLabels() {
        selectedIngredients.forEach {
            let iDoNotEatOptionView = IDoNotEatOptionView()
            iDoNotEatOptionView.setupLabel(text: $0.dishTag)

            optionsArray.append(iDoNotEatOptionView)
        }
    }

    private func setupOptionButtons() {
        optionsArray.forEach {
            $0.bindIDoNotEatOptionViewToView = { [weak self] view in
                guard let index = self?.optionsArray.firstIndex(of: view) else { return }

                self?.checkBoxTappedOnView(with: index)
            }
        }
    }

    private func checkBoxTappedOnView(with index: Int) {
        bindIngredientIndexToView(index)
    }

    @objc private func addTapped() {
        bindAddButtonTapToView()
    }

    private func setupStackView() {
        bottomStackView.distribution = .fillEqually
        bottomStackView.axis = .vertical
        bottomStackView.spacing = 12

        optionsArray.forEach {
            bottomStackView.addArrangedSubview($0)
        }
    }

    private func setupConstraints() {
        iDoNotEatStackView.translatesAutoresizingMaskIntoConstraints = false
        bottomStackView.translatesAutoresizingMaskIntoConstraints = false

        addSubview(iDoNotEatStackView)
        addSubview(bottomStackView)

        NSLayoutConstraint.activate([
            iDoNotEatStackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            iDoNotEatStackView.topAnchor.constraint(equalTo: topAnchor),
            iDoNotEatStackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            iDoNotEatStackView.heightAnchor.constraint(equalToConstant: 22),

            bottomStackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            bottomStackView.topAnchor.constraint(equalTo: iDoNotEatStackView.bottomAnchor, constant: 14),
            bottomStackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            bottomStackView.bottomAnchor.constraint(equalTo: bottomAnchor)
        ])
    }
}
