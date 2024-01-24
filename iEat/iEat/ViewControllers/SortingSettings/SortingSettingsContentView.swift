//
//  SortingSettingsContentView.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 11.09.2021.
//

import UIKit

final class SortingSettingsContentView: UIView {
    var bindSortByTappedButtonToView: (SortBySettingType) -> Void = { _ in }
    var bindConsiderMyPreferencesStateToView: () -> Void = {}
    var bindHotPriceOffersButtonStateToView: () -> Void = {}
    var bindNewFromPriceDigitToView: (String) -> Void = { _ in }
    var bindNewToPriceDigitToView: (String) -> Void = { _ in }
    var bindEditButtonToView: () -> Void = {}

    let settingsData: SortingSettingsData
    let superViewFrameWidth: CGFloat

    private let sortByView = SortByView()
    private let sortBySeparatorView = UIView()
    private let filterByPriceView = FilterByPriceView()
    private let filterBySeparatorView = UIView()
    private let considerMyPreferencesCheckBoxButton = CheckBoxButton()
    private let editButton = UIButton()

    private lazy var considerMyPreferencesLabel: UILabel = {
        let label = UILabel()
        label.textColor = .black
        label.font = .iEatSubtitleFont
        label.textAlignment = .left
        label.text = "👌 Consider my preferences"

        return label
    }()

    private lazy var considerMyPreferencesStackView: UIStackView = {
        let stackView = UIStackView(arrangedSubviews: [
            considerMyPreferencesCheckBoxButton,
            considerMyPreferencesLabel,
            editButton
        ])

        stackView.distribution = .fill
        stackView.axis = .horizontal
        stackView.spacing = 10

        return stackView
    }()

    private lazy var preferencesListTextView: UITextView = {
        let textView = UITextView()
        textView.delegate = self
        textView.layer.cornerRadius = 4
        textView.backgroundColor = .iEatSortingSettingsBlue
        textView.textColor = .iEatSortingSettingsGray
        textView.font = .iEatSubtitleFont
        textView.textAlignment = .left
        textView.isUserInteractionEnabled = false
        textView.text = getUserPreferencesList()
        textView.textContainerInset = .init(top: 16,
                                            left: 16,
                                            bottom: 16,
                                            right: 16)

        return textView
    }()

    init(settingsData: SortingSettingsData,
         superViewFrameWidth: CGFloat) {
        self.settingsData = settingsData
        self.superViewFrameWidth = superViewFrameWidth

        super.init(frame: .zero)

        setupUI()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func updateSettingsDataState(settingsData: SortingSettingsData) {
        sortByView.selectedSetting = settingsData.sortBy

        filterByPriceView.filteredByPriceSettings = settingsData

        considerMyPreferencesCheckBoxButton.isChecked = settingsData.considerMyPreferences
    }

    func dismissKeyboard() {
        filterByPriceView.dismissKeyboard()
    }

    private func setupUI() {
        setupButtons()
        setupSeparators()
        setupConstraints()
        setupBindings()

        updateSettingsDataState(settingsData: settingsData)
    }
    private func getUserPreferencesList() -> String {
        var preferencesList = ""

        FoodComposition.allCases.forEach {
            guard settingsData.foodCompositions.contains($0) else { return }

            preferencesList += "\($0.preferenceName) | "
        }

        settingsData.iDoNotEat.forEach {
            preferencesList += "\($0.preferenceName) | "
        }

        preferencesList.removeLast(2)

        return preferencesList
    }

    private func setupButtons() {
        considerMyPreferencesCheckBoxButton.addTarget(self,
                                                      action: #selector(considerMyPreferencesCheckBoxButtonTapped),
                                                      for: .touchUpInside)

        editButton.setTitle("Edit", for: .normal)
        editButton.setTitleColor(.systemBlue, for: .normal)
        editButton.addTarget(self,
                             action: #selector(editTapped),
                             for: .touchUpInside)
    }

    @objc private func considerMyPreferencesCheckBoxButtonTapped() {
        bindConsiderMyPreferencesStateToView()
    }

    @objc private func editTapped() {
        bindEditButtonToView()
    }

    private func setupSeparators() {
        sortBySeparatorView.backgroundColor = .iEatSeparator

        filterBySeparatorView.backgroundColor = .iEatSeparator
    }

    private func setupBindings() {
        sortByView.bindTappedButtonToView = { [weak self] type in
            self?.bindSortByTappedButtonToView(type)
        }

        filterByPriceView.bindHotPriceOffersButtonStateToView = { [weak self] in
            self?.bindHotPriceOffersButtonStateToView()
        }

        filterByPriceView.bindNewFromPriceDigitToView = { [weak self] digit in
            self?.bindNewFromPriceDigitToView(digit)
        }

        filterByPriceView.bindNewToPriceDigitToView = { [weak self] digit in
            self?.bindNewToPriceDigitToView(digit)
        }
    }

    private func setupConstraints() {
        addSubview(sortByView)
        addSubview(sortBySeparatorView)
        addSubview(filterByPriceView)
        addSubview(filterBySeparatorView)
        addSubview(considerMyPreferencesStackView)
        addSubview(preferencesListTextView)

        translatesAutoresizingMaskIntoConstraints = false
        sortByView.translatesAutoresizingMaskIntoConstraints = false
        sortBySeparatorView.translatesAutoresizingMaskIntoConstraints = false
        filterByPriceView.translatesAutoresizingMaskIntoConstraints = false
        filterBySeparatorView.translatesAutoresizingMaskIntoConstraints = false
        considerMyPreferencesStackView.translatesAutoresizingMaskIntoConstraints = false
        preferencesListTextView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            sortByView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
            sortByView.topAnchor.constraint(equalTo: topAnchor, constant: 48),
            sortByView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24),
            sortByView.heightAnchor.constraint(equalToConstant: 162),

            sortBySeparatorView.leadingAnchor.constraint(equalTo: leadingAnchor),
            sortBySeparatorView.topAnchor.constraint(equalTo: sortByView.bottomAnchor, constant: 24),
            sortBySeparatorView.trailingAnchor.constraint(equalTo: trailingAnchor),
            sortBySeparatorView.heightAnchor.constraint(equalToConstant: 1),

            filterByPriceView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
            filterByPriceView.topAnchor.constraint(equalTo: sortBySeparatorView.bottomAnchor, constant: 24),
            filterByPriceView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24),
            filterByPriceView.heightAnchor.constraint(equalToConstant: 114),

            filterBySeparatorView.leadingAnchor.constraint(equalTo: leadingAnchor),
            filterBySeparatorView.topAnchor.constraint(equalTo: filterByPriceView.bottomAnchor, constant: 24),
            filterBySeparatorView.trailingAnchor.constraint(equalTo: trailingAnchor),
            filterBySeparatorView.heightAnchor.constraint(equalToConstant: 1),

            considerMyPreferencesStackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
            considerMyPreferencesStackView.topAnchor.constraint(equalTo: filterBySeparatorView.bottomAnchor, constant: 22),
            considerMyPreferencesStackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24),
            considerMyPreferencesStackView.heightAnchor.constraint(equalToConstant: 22),

            preferencesListTextView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
            preferencesListTextView.topAnchor.constraint(equalTo: considerMyPreferencesStackView.bottomAnchor, constant: 16),
            preferencesListTextView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24),
            preferencesListTextView.heightAnchor.constraint(equalToConstant: 80),
            preferencesListTextView.bottomAnchor.constraint(equalTo: bottomAnchor)
        ])

        textViewDidChange(preferencesListTextView)
    }
}

// MARK: - UITextViewDelegate

extension SortingSettingsContentView: UITextViewDelegate {
    func textViewDidChange(_ textView: UITextView) {
        setupSuitableHeightAnchorFor(textView: textView)
    }

    private func setupSuitableHeightAnchorFor(textView: UITextView) {
        let leadingAndTrailingIndentsConstantsSum: CGFloat = 48
        let size = CGSize(width: superViewFrameWidth - leadingAndTrailingIndentsConstantsSum,
                          height: .infinity)
        let estimatedSize = textView.sizeThatFits(size)

        textView.constraints.forEach {
            guard $0.firstAttribute == .height else { return }

            $0.constant = estimatedSize.height
        }
    }
}
