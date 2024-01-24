//
//  NewCardViewController.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/6/21.
//

import UIKit

final class NewCardViewController: UIViewController {
    private enum Const {
        static let textFieldColor = UIColor(red: 246, green: 246, blue: 246, alpha: 1)
        static let textFieldCornerRadius: CGFloat = 15
        static let textFieldToLabelDistance: CGFloat = 12
        static let contentToSideDistance: CGFloat = 16
        static let textFieldHeight: CGFloat = 50
        static let textFieldWidth: CGFloat = 58
        static let paymentMethodsKey = "paymentMethodStore"
    }

    var isDismissed: (() -> Void)?
    let viewModel: NewCardViewModelType

    private var button: IEatButton = {
        let button = IEatButton()
        button.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        button.setTitle("Done", for: .normal)
        return button
    }()

    private var cardTitle: UILabel = {
        let title = UILabel()
        title.text = "New card"
        title.font = UIFont.boldSystemFont(ofSize: 34.0)
        return title
    }()

    private var slashLabel: UILabel = {
        let label = UILabel()
        label.text = " / "
        label.textColor = .lightGray
        label.font = label.font.withSize(27)
        return label
    }()

    private var cardNumberLabel: UILabel = {
        let label = UILabel()
        label.text = "Card number"
        return label
    }()

    private var cvcLabel: UILabel = {
        let label = UILabel()
        label.text = "CVC"
        return label
    }()

    private var expirationDateLabel: UILabel = {
        let label = UILabel()
        label.text = "Expiration date"
        return label
    }()

    private var cardNumberTextField: IEatTextField = {
        let textField = IEatTextField()
        textField.backgroundColor = Const.textFieldColor
        return textField
    }()

    private var cvcField: IEatTextField = {
        let textField = IEatTextField()
        textField.backgroundColor = Const.textFieldColor
        textField.addTarget(self, action: #selector(limitTextCvcLength), for: .editingChanged)
        return textField
    }()

    private var expirationDayTextField: IEatTextField = {
        let textField = IEatTextField()
        textField.layer.cornerRadius = Const.textFieldCornerRadius
        textField.backgroundColor = Const.textFieldColor
        textField.addTarget(self, action: #selector(limitTextDayLength), for: .editingChanged)
        return textField
    }()

    private var expirationMonthTextField: IEatTextField = {
        let textField = IEatTextField()
        textField.backgroundColor = Const.textFieldColor
        textField.addTarget(self, action: #selector(limitTextMonthLength), for: .editingChanged)
        return textField
    }()

    private var dateStackView: UIStackView = {
        let stackView = UIStackView()
        stackView.axis  = .horizontal
        stackView.distribution  = .equalSpacing
        stackView.alignment = .center
        return stackView
    }()

    init(with viewModel: NewCardViewModelType) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        setupSubviews()
        setupConstraints()
        cardNumberTextField.delegate = self

        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        tap.cancelsTouchesInView = false
        view.addGestureRecognizer(tap)
    }

    @objc private func dismissKeyboard() {
        view.endEditing(true)
    }

    @objc private func buttonAction() {
        guard let cardText = cardNumberTextField.text, !cardText.isEmpty  else { return }
        guard let dayText = expirationDayTextField.text, !dayText.isEmpty  else { return }
        guard let monthText = expirationMonthTextField.text, !monthText.isEmpty  else { return }
        guard let cvcText = cvcField.text, !cvcText.isEmpty else { return }
        let payment = PaymentMethodModel()
        payment.cardNumber = cardText
        payment.date = "\(dayText).\(monthText)"
        payment.cvc = cvcText
        viewModel.inputs.addPaymentMethod(paymentMethod: payment)
        isDismissed?()
        dismiss(animated: false, completion: nil)
    }

    @objc private func limitTextCvcLength() {
        if cvcField.text?.count ?? 0 >= 3 {
            cvcField.endEditing(true)
        }
    }

    @objc private func limitTextDayLength() {
        if expirationDayTextField.text?.count ?? 0 >= 2 {
            expirationDayTextField.endEditing(true)
        }
    }

    @objc private func limitTextMonthLength() {
        if expirationMonthTextField.text?.count ?? 0 >= 2 {
            expirationMonthTextField.endEditing(true)
        }
    }

    private func setupSubviews() {
        view.addSubview(cardTitle)
        view.addSubview(cardNumberLabel)
        view.addSubview(cardNumberTextField)
        view.addSubview(expirationDateLabel)
        view.addSubview(cvcLabel)
        view.addSubview(cvcField)
        view.addSubview(button)
        view.addSubview(dateStackView)

        dateStackView.addArrangedSubview(expirationMonthTextField)
        dateStackView.addArrangedSubview(slashLabel)
        dateStackView.addArrangedSubview(expirationDayTextField)
    }

    private func setupConstraints() {
        cardTitle.translatesAutoresizingMaskIntoConstraints = false
        cardNumberLabel.translatesAutoresizingMaskIntoConstraints = false
        cardNumberTextField.translatesAutoresizingMaskIntoConstraints = false
        expirationDateLabel.translatesAutoresizingMaskIntoConstraints = false
        cvcLabel.translatesAutoresizingMaskIntoConstraints = false
        cvcField.translatesAutoresizingMaskIntoConstraints = false
        dateStackView.translatesAutoresizingMaskIntoConstraints = false
        expirationDayTextField.translatesAutoresizingMaskIntoConstraints = false
        expirationMonthTextField.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                cardTitle.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 15),
                cardTitle.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                cardNumberLabel.topAnchor.constraint(equalTo: cardTitle.bottomAnchor, constant: 30),
                cardNumberLabel.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                cardNumberTextField.topAnchor.constraint(equalTo: cardNumberLabel.bottomAnchor, constant: Const.textFieldToLabelDistance),
                cardNumberTextField.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                cardNumberTextField.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor,
                                                              constant: -Const.contentToSideDistance),
                cardNumberTextField.heightAnchor.constraint(equalToConstant: Const.textFieldHeight),
                expirationDateLabel.topAnchor.constraint(equalTo: cardNumberTextField.bottomAnchor, constant: 25),
                expirationDateLabel.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                cvcLabel.topAnchor.constraint(equalTo: cardNumberTextField.bottomAnchor, constant: 25),
                cvcLabel.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -70),
                cvcField.topAnchor.constraint(equalTo: cvcLabel.bottomAnchor, constant: Const.textFieldToLabelDistance),
                cvcField.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -Const.contentToSideDistance),
                cvcField.leadingAnchor.constraint(equalTo: cvcLabel.leadingAnchor),
                cvcField.heightAnchor.constraint(equalToConstant: Const.textFieldHeight),
                expirationDayTextField.widthAnchor.constraint(equalToConstant: Const.textFieldWidth),
                expirationDayTextField.heightAnchor.constraint(equalToConstant: Const.textFieldHeight),
                expirationMonthTextField.widthAnchor.constraint(equalToConstant: Const.textFieldWidth),
                expirationMonthTextField.heightAnchor.constraint(equalToConstant: Const.textFieldHeight),
                dateStackView.topAnchor.constraint(equalTo: expirationDateLabel.bottomAnchor, constant: Const.textFieldToLabelDistance),
                dateStackView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                button.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -Const.contentToSideDistance),
                button.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                button.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -Const.contentToSideDistance)
            ]
        )
    }
}

extension NewCardViewController: UITextFieldDelegate {
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        viewModel.inputs.formatTextField(textField: textField,
                                         cardTextField: cardNumberTextField,
                                         shouldChangeCharactersIn: range,
                                         replacementString: string)
    }
}
