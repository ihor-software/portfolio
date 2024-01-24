//
//  AuthorizationViewController.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 21.05.2021.
//

import UIKit

final class AuthorizationViewController: UIViewController {
    private lazy var logoImageView: UIImageView = {
        let logoImageView = UIImageView(image: UIImage(named: "logo"))
        return logoImageView
    }()

    private let wrapperView = UIView()
    private let invitingLabel = UILabel()
    private let infoLabel = UILabel()
    private let numbersButton = UIButton()
    private let textField = UITextField()
    private let nextButton = UIButton()

    private var wrapperViewsFrameOriginY = CGFloat()

    private var viewModel: AuthorizationViewModelType

    init(with viewModel: AuthorizationViewModelType) {
        self.viewModel = viewModel

        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)

        wrapperViewsFrameOriginY = wrapperView.frame.origin.y
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white

        setupUI()
        setupBindings()

        viewModel.inputs.setupInitialCountry()
    }

    private func setupBindings() {
        viewModel.outputs.bindSelectedCountryToView = { [weak self] in
            self?.numbersButton.setTitle($0, for: .normal)
            self?.textField.text = ""
        }

        viewModel.outputs.bindPhoneNumberToView = { [weak self] in
            self?.textField.text = $0
        }

        viewModel.outputs.bindButtonStateToView = { [weak self] buttonState in
            switch buttonState {
            case .active: self?.makeNextButtonActive()
            case .disabled: self?.makeNextButtonDisabled()
            }
        }
    }

    private func setupUI() {
        setupNavBar()
        setupLabels()
        setupButtons()
        setupTextField()
        setupConstraints()
        setupNotificationCenter()
    }

    private func setupNavBar() {
        let skipAuthorizationButton = UIBarButtonItem(
            title: "Skip authorization",
            style: .plain,
            target: self,
            action: #selector(skipAuthorizationTapped))

        navigationItem.rightBarButtonItem = skipAuthorizationButton

        navigationController?.navigationBar.barStyle = .black
        navigationController?.navigationBar.barTintColor = .white
    }

    @objc private func skipAuthorizationTapped() {
        viewModel.inputs.skipAuthorization()
    }

    private func setupLabels() {
        invitingLabel.textAlignment = .center
        invitingLabel.font = .boldSystemFont(ofSize: 26)
        invitingLabel.textColor = .black
        invitingLabel.text = "Enter your phone number"

        infoLabel.textAlignment = .center
        infoLabel.font = .systemFont(ofSize: 13.5)
        infoLabel.textColor = .gray
        infoLabel.numberOfLines = 2
        infoLabel.text = "We will send you the unique code to start your\n\"omnomnom\" 🍔 experience."
    }

    private func setupButtons() {
        numbersButton.layer.cornerRadius = 14
        numbersButton.backgroundColor = .iEatLightGrey
        numbersButton.setTitleColor(.black, for: .normal)
        numbersButton.addTarget(self, action: #selector(showModalView), for: .touchUpInside)

        nextButton.layer.cornerRadius = 14
        nextButton.setTitle("Next", for: .normal)
        nextButton.titleLabel?.font = .boldSystemFont(ofSize: 15)
        nextButton.setTitleColor(.darkGray, for: .normal)
        nextButton.addTarget(self, action: #selector(segueToNextScreen), for: .touchUpInside)

        makeNextButtonDisabled()
    }

    @objc private func showModalView() {
        viewModel.inputs.numbersButtonTapped()
    }

    @objc private func segueToNextScreen() {
        viewModel.inputs.nextButtonTapped()
    }

    private func setupTextField() {
        let leftViewForInset = UIView(frame: .init(x: 0, y: 0, width: 20, height: 5))

        textField.leftView = leftViewForInset
        textField.leftViewMode = .always
        textField.textColor = .black
        textField.tintColor = .black
        textField.font = .systemFont(ofSize: UIFont.buttonFontSize)
        textField.backgroundColor = .iEatLightGrey
        textField.keyboardType = .numberPad
        textField.layer.cornerRadius = 13
        textField.delegate = self
    }

    private func setupConstraints() {
        setupConstraintsForContentView()
        setupConstraintsForLogo()
        setupConstraintsForLabels()
        setupConstraintsForNumberButtonAndTextView()
        setupConstraintsForNextButton()
    }

    private func setupConstraintsForContentView() {
        wrapperView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(wrapperView)

        NSLayoutConstraint.activate([
            wrapperView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            wrapperView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            wrapperView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            wrapperView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            wrapperView.heightAnchor.constraint(equalToConstant: 323)
        ])
    }

    private func setupConstraintsForLogo() {
        logoImageView.translatesAutoresizingMaskIntoConstraints = false

        wrapperView.addSubview(logoImageView)

        NSLayoutConstraint.activate([
            logoImageView.topAnchor.constraint(equalTo: wrapperView.topAnchor),
            logoImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            logoImageView.heightAnchor.constraint(equalToConstant: 58),
            logoImageView.widthAnchor.constraint(equalToConstant: 60)
        ])
    }

    private func setupConstraintsForLabels() {
        invitingLabel.translatesAutoresizingMaskIntoConstraints = false
        infoLabel.translatesAutoresizingMaskIntoConstraints = false

        wrapperView.addSubview(invitingLabel)
        wrapperView.addSubview(infoLabel)

        NSLayoutConstraint.activate([
            invitingLabel.leadingAnchor.constraint(equalTo: wrapperView.leadingAnchor),
            invitingLabel.topAnchor.constraint(equalTo: logoImageView.bottomAnchor, constant: 20),
            invitingLabel.trailingAnchor.constraint(equalTo: wrapperView.trailingAnchor),
            invitingLabel.bottomAnchor.constraint(equalTo: invitingLabel.topAnchor, constant: 40),

            infoLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            infoLabel.topAnchor.constraint(equalTo: invitingLabel.bottomAnchor),
            infoLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            infoLabel.bottomAnchor.constraint(equalTo: infoLabel.topAnchor, constant: 40)
        ])
    }

    private func setupConstraintsForNumberButtonAndTextView() {
        numbersButton.translatesAutoresizingMaskIntoConstraints = false
        textField.translatesAutoresizingMaskIntoConstraints = false

        wrapperView.addSubview(numbersButton)
        wrapperView.addSubview(textField)

        NSLayoutConstraint.activate([
            numbersButton.leadingAnchor.constraint(equalTo: wrapperView.leadingAnchor),
            numbersButton.topAnchor.constraint(equalTo: infoLabel.bottomAnchor, constant: 20),
            numbersButton.trailingAnchor.constraint(equalTo: numbersButton.leadingAnchor, constant: 120),
            numbersButton.bottomAnchor.constraint(equalTo: numbersButton.topAnchor, constant: 50),

            textField.leadingAnchor.constraint(equalTo: numbersButton.trailingAnchor, constant: 8),
            textField.topAnchor.constraint(equalTo: infoLabel.bottomAnchor, constant: 20),
            textField.trailingAnchor.constraint(equalTo: wrapperView.trailingAnchor),
            textField.bottomAnchor.constraint(equalTo: textField.topAnchor, constant: 50)
        ])
    }

    private func setupConstraintsForNextButton() {
        nextButton.translatesAutoresizingMaskIntoConstraints = false

        wrapperView.addSubview(nextButton)

        NSLayoutConstraint.activate([
            nextButton.leadingAnchor.constraint(equalTo: wrapperView.leadingAnchor),
            nextButton.topAnchor.constraint(equalTo: textField.bottomAnchor, constant: 45),
            nextButton.trailingAnchor.constraint(equalTo: wrapperView.trailingAnchor),
            nextButton.bottomAnchor.constraint(equalTo: nextButton.topAnchor, constant: 50)
        ])
    }

    private func setupNotificationCenter() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateView),
                                               name: UIResponder.keyboardWillShowNotification,
                                               object: nil)

        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateView),
                                               name: UIResponder.keyboardWillHideNotification,
                                               object: nil)
    }

    @objc private func updateView(notification: Notification) {
        let userInfo = notification.userInfo

        guard let keyboardRect = (userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue else { return }

        if notification.name == UIResponder.keyboardWillHideNotification {
            let requiredDownShiftForWrapperView = wrapperViewsFrameOriginY - wrapperView.frame.minY

            UIView.animate(withDuration: 0.5,
                           delay: 0,
                           options: [.curveEaseOut]) { [weak self] in
                guard let self = self else { return }

                self.wrapperView.transform = self.wrapperView.transform.translatedBy(
                    x: 0,
                    y: requiredDownShiftForWrapperView)
            }

        } else {
            let spaceBetweenButtonAndKeyboard: CGFloat = 10
            let requiredUpShiftForWrapperView = keyboardRect.minY - wrapperView.frame.maxY - spaceBetweenButtonAndKeyboard

            UIView.animate(withDuration: 0.5,
                           delay: 0,
                           options: [.curveEaseOut]) { [weak self] in
                guard let self = self else { return }

                self.wrapperView.transform = self.wrapperView.transform.translatedBy(
                    x: 0,
                    y: requiredUpShiftForWrapperView)
            }
        }
    }

    func makeNextButtonDisabled() {
        nextButton.backgroundColor = .iEatLightGrey
        nextButton.setTitleColor(.darkGray, for: .normal)
        nextButton.isUserInteractionEnabled = false
    }

    func makeNextButtonActive() {
        nextButton.backgroundColor = .init(red: 0, green: 122, blue: 255, alpha: 1)
        nextButton.setTitleColor(.white, for: .normal)
        nextButton.isUserInteractionEnabled = true
    }
}

// MARK: - UITextFieldDelegate

extension AuthorizationViewController: UITextFieldDelegate {
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        viewModel.inputs.addToPhoneNumberNewDigit(string)

        return false
    }
}
