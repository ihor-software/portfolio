//
//  FilterByPriceView.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 30.08.2021.
//

import UIKit

final class FilterByPriceView: UIView {
    var bindHotPriceOffersButtonStateToView: () -> Void  = {}
    var bindNewFromPriceDigitToView: (String) -> Void = { _ in }
    var bindNewToPriceDigitToView: (String) -> Void = { _ in }

    var filteredByPriceSettings = SortingSettingsData() {
        didSet {
            updateSettingsDataState()
        }
    }

    private let filterByPriceLabel = UILabel()
    private let fromPriceTextField = UITextField()
    private let toPriceTextField = UITextField()
    private let fromToStackView = UIStackView()

    private let hotPriceOffersCheckBoxButton = CheckBoxButton()
    private let hotPriceOffersLabel = UILabel()
    private let hotPriceOffersStackView = UIStackView()

    override init(frame: CGRect) {
        super.init(frame: frame)

        setupUI()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    func dismissKeyboard() {
        if toPriceTextField.isFirstResponder {
            toPriceTextField.resignFirstResponder()
        } else {
            fromPriceTextField.resignFirstResponder()
        }
    }

    private func setupUI() {
        setupLabels()
        setupTextFields()
        setupButton()
        setupStackViews()
        setupConstraints()
    }

    private func setupLabels() {
        let labelsArray = [filterByPriceLabel,
                           hotPriceOffersLabel]

        labelsArray.forEach {
            $0.textColor = .black
            $0.font = .iEatSubtitleFont
            $0.textAlignment = .left
        }

        guard let boldFont = UIFont(name: "AvenirNext-Bold", size: 20) else { return }

        let attributes: [NSAttributedString.Key: Any] = [
            .foregroundColor: UIColor.black,
            .font: boldFont]

        filterByPriceLabel.attributedText = .init(string: "Filter by price:", attributes: attributes)
        hotPriceOffersLabel.text = "🔥 Hot price offers"
    }

    private func setupTextFields() {
        let fromLabel = createLeftViewWith(text: "From:")
        let toLabel = createLeftViewWith(text: "To:")

        fromPriceTextField.leftView = fromLabel
        toPriceTextField.leftView = toLabel

        fromPriceTextField.addTarget(self,
                                     action: #selector(changeStateOf),
                                     for: .editingDidBegin)
        toPriceTextField.addTarget(self,
                                   action: #selector(changeStateOf),
                                   for: .editingDidBegin)

        let textFieldsArray = [fromPriceTextField,
                               toPriceTextField]

        textFieldsArray.forEach {
            $0.delegate = self
            $0.tintColor = .black
            $0.backgroundColor = .iEatLightGrey
            $0.textAlignment = .right
            $0.font = .iEatSubtitleFont
            $0.leftViewMode = .always
            $0.rightViewMode = .always
            $0.rightView = UIView(frame: .init(x: 0, y: 0, width: 15, height: 10))
            $0.layer.cornerRadius = 4
            $0.keyboardType = .numberPad
        }
    }

    private func createLeftViewWith(text: String) -> UIView {
        let containerView = UIView(frame: .init(x: 0, y: 0, width: 50, height: 30))

        let label = UILabel(frame: .init(x: 10, y: 5, width: 40, height: 20))
        label.text = text
        label.textColor = .gray
        label.font = .systemFont(ofSize: 14)

        containerView.addSubview(label)

        return containerView
    }

    @objc private func changeStateOf(textField: UITextView) {
        if textField == toPriceTextField {
            toPriceTextField.textColor = .black
            fromPriceTextField.textColor = .gray
        } else {
            toPriceTextField.textColor = .gray
            fromPriceTextField.textColor = .black
        }
    }

    private func setupButton() {
        hotPriceOffersCheckBoxButton.addTarget(
            self,
            action: #selector(hotPriceOffersCheckBoxButtonTapped),
            for: .touchUpInside)
    }

    @objc private func hotPriceOffersCheckBoxButtonTapped() {
        bindHotPriceOffersButtonStateToView()
    }

    private func updateSettingsDataState() {
        hotPriceOffersCheckBoxButton.isChecked = filteredByPriceSettings.hotPriceOffers

        let fromPrice = filteredByPriceSettings.fromPrice
        let toPrice = filteredByPriceSettings.toPrice

        fromPriceTextField.text = fromPrice.isEmpty ? "" : "\(fromPrice) $"
        toPriceTextField.text = toPrice.isEmpty ? "" : "\(toPrice) $"
    }

    private func setupStackViews() {
        hotPriceOffersStackView.distribution = .fill
        hotPriceOffersStackView.axis = .horizontal
        hotPriceOffersStackView.spacing = 10

        hotPriceOffersStackView.addArrangedSubview(hotPriceOffersCheckBoxButton)
        hotPriceOffersStackView.addArrangedSubview(hotPriceOffersLabel)

        fromToStackView.distribution = .fillEqually
        fromToStackView.axis = .horizontal
        fromToStackView.spacing = 18
        fromToStackView.addArrangedSubview(fromPriceTextField)
        fromToStackView.addArrangedSubview(toPriceTextField)
    }

    private func setupConstraints() {
        addSubview(filterByPriceLabel)
        addSubview(fromToStackView)
        addSubview(hotPriceOffersStackView)

        filterByPriceLabel.translatesAutoresizingMaskIntoConstraints = false
        fromToStackView.translatesAutoresizingMaskIntoConstraints = false
        hotPriceOffersStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            filterByPriceLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            filterByPriceLabel.topAnchor.constraint(equalTo: topAnchor),
            filterByPriceLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            filterByPriceLabel.heightAnchor.constraint(equalToConstant: 22),

            fromToStackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            fromToStackView.topAnchor.constraint(equalTo: filterByPriceLabel.bottomAnchor, constant: 16),
            fromToStackView.widthAnchor.constraint(equalToConstant: 256),
            fromToStackView.heightAnchor.constraint(equalToConstant: 38),

            hotPriceOffersStackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            hotPriceOffersStackView.topAnchor.constraint(equalTo: fromToStackView.bottomAnchor, constant: 16),
            hotPriceOffersStackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            hotPriceOffersStackView.heightAnchor.constraint(equalToConstant: 22)
        ])
    }
}

// MARK: - UITextFieldDelegate

extension FilterByPriceView: UITextFieldDelegate {
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        switch textField {
        case fromPriceTextField:
            bindNewFromPriceDigitToView(string)
        default:
            bindNewToPriceDigitToView(string)
        }

        return false
    }
}
