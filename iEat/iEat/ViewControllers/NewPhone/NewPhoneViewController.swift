//
//  NewPhoneViewController.swift
//  iEat
//
//  Created by Ihor Vasyliev on 31.08.2021.
//

import UIKit

final class NewPhoneViewController: UIViewController {
    private enum Const {
        static let textFieldColor = UIColor(red: 246, green: 246, blue: 246, alpha: 1)
        static let textFieldCornerRadius: CGFloat = 15
        static let textFieldToLabelDistance: CGFloat = 12
        static let contentToSideDistance: CGFloat = 16
        static let textFieldHeight: CGFloat = 50
        static let phoneNumberLength = 9
    }

    var isDismissed: (() -> Void)?

    private var viewModel: NewPhoneViewModelType

    init(with viewModel: NewPhoneViewModelType) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }

    private var button: IEatButton = {
        let button = IEatButton()
        button.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        button.setTitle("Done", for: .normal)
        return button
    }()

    private var phoneTitle: UILabel = {
        let title = UILabel()
        title.text = "New Phone"
        title.font = UIFont.boldSystemFont(ofSize: 34.0)
        return title
    }()

    private var phoneNumberLabel: UILabel = {
        let label = UILabel()
        label.text = "Phone"
        label.font = UIFont.boldSystemFont(ofSize: 15)
        return label
    }()

    private var phoneNumberTextField: UITextField = {
        let textField = UITextField()
        textField.backgroundColor = Const.textFieldColor
        textField.keyboardType = .numberPad
        textField.layer.cornerRadius = 12
        return textField
    }()

    private var phoneCodeButton: UIButton = {
        let button = UIButton()
        button.backgroundColor = Const.textFieldColor
        button.setTitle("🇺🇦 +380 ▾", for: .normal)
        button.setTitleColor(.black, for: .normal)
        button.layer.cornerRadius = 12
        return button
    }()

    private var phoneStackView: UIStackView = {
        let stackView = UIStackView()
        stackView.axis = .horizontal
        return stackView
    }()

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        setupSubviews()
        setupBindings()
        setupConstraints()
        viewModel.inputs.setupInitialCountry()
        phoneNumberTextField.delegate = self
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        tap.cancelsTouchesInView = false
        view.addGestureRecognizer(tap)
    }

    @objc private func dismissKeyboard() {
        view.endEditing(true)
    }

    @objc private func buttonAction() {
        guard let phoneText = phoneNumberTextField.text, !phoneText.isEmpty  else { return }
        let phoneNumbers = PhoneNumbersModel()
        phoneNumbers.phoneNumber = phoneText
        viewModel.inputs.addPhoneNumber(phoneNumber: phoneNumbers)
        isDismissed?()
        dismiss(animated: false, completion: nil)
    }

    @objc private func showModalView() {
        viewModel.inputs.numbersButtonTapped()
    }

    private func setupSubviews() {
        phoneStackView.addArrangedSubview(phoneCodeButton)
        phoneStackView.addArrangedSubview(phoneNumberTextField)

        view.addSubview(phoneTitle)
        view.addSubview(phoneNumberLabel)
        view.addSubview(phoneStackView)
        view.addSubview(button)
    }

    private func setupBindings() {
        viewModel.outputs.bindSelectedCountryToView = { [weak self] in
            self?.phoneCodeButton.setTitle($0, for: .normal)
            self?.phoneNumberTextField.text = ""
        }

        viewModel.outputs.bindPhoneNumberToView = { [weak self] in
            self?.phoneNumberTextField.text = $0
        }
    }

    private func setupConstraints() {
        phoneTitle.translatesAutoresizingMaskIntoConstraints = false
        phoneNumberLabel.translatesAutoresizingMaskIntoConstraints = false
        phoneNumberTextField.translatesAutoresizingMaskIntoConstraints = false
        phoneCodeButton.translatesAutoresizingMaskIntoConstraints = false
        phoneStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                phoneTitle.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 15),
                phoneTitle.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),

                phoneNumberLabel.topAnchor.constraint(equalTo: phoneTitle.bottomAnchor, constant: 30),
                phoneNumberLabel.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),

                phoneStackView.topAnchor.constraint(equalTo: phoneNumberLabel.bottomAnchor, constant: Const.textFieldToLabelDistance),
                phoneStackView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                phoneStackView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -Const.contentToSideDistance),

                phoneNumberTextField.heightAnchor.constraint(equalToConstant: Const.textFieldHeight),
                phoneNumberTextField.widthAnchor.constraint(equalTo: phoneStackView.widthAnchor, multiplier: 0.6),

                phoneCodeButton.heightAnchor.constraint(equalToConstant: Const.textFieldHeight),
                phoneCodeButton.widthAnchor.constraint(equalTo: phoneStackView.widthAnchor, multiplier: 0.35),

                button.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -Const.contentToSideDistance),
                button.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                button.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -Const.contentToSideDistance)
            ]
        )
    }
}

extension NewPhoneViewController: UITextFieldDelegate {
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        viewModel.inputs.addToPhoneNumberNewDigit(string)

        return false
    }
}
