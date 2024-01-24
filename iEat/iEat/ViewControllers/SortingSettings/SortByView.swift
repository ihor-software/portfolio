//
//  SortByView.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 30.08.2021.
//

import UIKit

final class SortByView: UIView {
    var bindTappedButtonToView: (SortBySettingType) -> Void = { _ in }

    var selectedSetting: SortBySettingType = .popularFirst {
        didSet {
            updateRadioButtonsState()
        }
    }

    private let sortByLabel: UILabel = {
        let boldFont = UIFont(name: "AvenirNext-Bold", size: 20)

        let attributes: [NSAttributedString.Key: Any] = [
            .foregroundColor: UIColor.black,
            .font: boldFont ?? .init()]

        let label = UILabel()
        label.attributedText = .init(string: "Sort by:", attributes: attributes)
        label.textColor = .black
        label.textAlignment = .left

        return label
    }()

    private let popularFirstSortByOptionView = SortByOptionView()
    private let nameAZSortByOptionView = SortByOptionView()
    private let priceLowToHighSortByOptionView = SortByOptionView()
    private let priceHighToLowSortByOptionView = SortByOptionView()

    private lazy var sortByStackView: UIStackView = {
        let stackView = UIStackView()
        stackView.distribution = .fillEqually
        stackView.axis = .vertical
        stackView.spacing = 12

        return stackView
    }()

    private lazy var optionsArray = [popularFirstSortByOptionView,
                                     nameAZSortByOptionView,
                                     priceLowToHighSortByOptionView,
                                     priceHighToLowSortByOptionView]

    override init(frame: CGRect) {
        super.init(frame: frame)

        setupUI()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    private func setupUI() {
        setupOptionLabels()
        setupOptionSettingTypes()
        setupOptionButtons()
        setupStackView()
        setupConstraints()
    }

    private func setupOptionLabels() {
        popularFirstSortByOptionView.setupLabel(text: "Popular first")
        nameAZSortByOptionView.setupLabel(text: "Name (A-Z)")
        priceLowToHighSortByOptionView.setupLabel(text: "Price: Low to High")
        priceHighToLowSortByOptionView.setupLabel(text: "Price: High to Low")
    }

    private func setupOptionSettingTypes() {
        optionsArray.enumerated().forEach {
            $1.sortBySettingType = SortBySettingType.init(rawValue: $0)
        }
    }

    private func setupOptionButtons() {
        optionsArray.forEach {
            $0.bindRadioButtonActionToView = { [weak self] type in
                self?.radioButtonTapped(with: type)
            }
        }
    }

    private func radioButtonTapped(with type: SortBySettingType) {
        bindTappedButtonToView(type)
    }

    private func updateRadioButtonsState() {
        optionsArray.enumerated().forEach {
            $1.setupRadioButton(isChecked: selectedSetting.rawValue == $0)
        }
    }

    private func setupStackView() {
        sortByStackView.addArrangedSubview(popularFirstSortByOptionView)
        sortByStackView.addArrangedSubview(nameAZSortByOptionView)
        sortByStackView.addArrangedSubview(priceLowToHighSortByOptionView)
        sortByStackView.addArrangedSubview(priceHighToLowSortByOptionView)
    }

    private func setupConstraints() {
        addSubview(sortByLabel)
        addSubview(sortByStackView)

        sortByLabel.translatesAutoresizingMaskIntoConstraints = false
        sortByStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            sortByLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            sortByLabel.topAnchor.constraint(equalTo: topAnchor),
            sortByLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            sortByLabel.heightAnchor.constraint(equalToConstant: 22),

            sortByStackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            sortByStackView.topAnchor.constraint(equalTo: sortByLabel.bottomAnchor, constant: 16),
            sortByStackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            sortByStackView.heightAnchor.constraint(equalToConstant: 124)
        ])
    }
}
