//
//  VerificationViewController.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 24.05.2021.
//

import UIKit

final class VerificationViewController: UIViewController {
    private enum ViewState {
        case normal
        case expiredVerification
    }

    private enum Constraints {
        static let imageHeight: CGFloat = 58
        static let timeLabelHeight: CGFloat = 50
        static let bodyStackHeight: CGFloat = 50
        static let passcodeViewHeight: CGFloat = 60
        static let mainStackHeight: CGFloat = 350
        static let mainStackSpacing: CGFloat = 20
        static let indent: CGFloat = 16
    }

    // MARK: - Self-executing closures

    private lazy var mainStackView: UIStackView = {
        let mainStackView = UIStackView()
        mainStackView.axis = .vertical
        mainStackView.distribution = .equalCentering
        mainStackView.spacing = Constraints.mainStackSpacing

        mainStackView.addArrangedSubview(logoImage)
        mainStackView.addArrangedSubview(bodyStackView)
        mainStackView.addArrangedSubview(passcodeView)
        mainStackView.addArrangedSubview(timeLabel)
        mainStackView.addArrangedSubview(resendCodeButton)

        return mainStackView
    }()

    private lazy var bodyStackView: UIStackView = {
        let bodyStackView = UIStackView()
        bodyStackView.axis = .vertical
        bodyStackView.distribution = .fillProportionally

        bodyStackView.addArrangedSubview(mainLabel)
        bodyStackView.addArrangedSubview(footnoteLabel)

        return bodyStackView
    }()

    private lazy var resendCodeButton: IEatButton = {
        let resendCodeButton = IEatButton()
        resendCodeButton.setTitle("Resend code", for: .normal)
        resendCodeButton.addTarget(self,
                                   action: #selector(resendCodeButtonTapped),
                                   for: .touchUpInside)

        return resendCodeButton
    }()

    private lazy var mainLabel: UILabel = {
        let mainLabel = UILabel()
        mainLabel.text = "Enter verification code"
        mainLabel.font = .iEatTitleFont
        mainLabel.textAlignment = .center

        return mainLabel
    }()

    private lazy var footnoteLabel: UILabel = {
        let footnoteLabel = UILabel()
        footnoteLabel.textColor = .lightGray
        footnoteLabel.font = .iEatMainFont
        footnoteLabel.textAlignment = .center
        footnoteLabel.numberOfLines = 0

        return footnoteLabel
    }()

    private lazy var timeLabel: UILabel = {
        let timeLabel = UILabel()

        timeLabel.font = .iEatSubtitleFont
        timeLabel.textAlignment = .center

        return timeLabel
    }()

    private lazy var logoImage: UIImageView = {
        let logoImage = UIImageView()
        logoImage.image = UIImage(named: "logo")
        logoImage.contentMode = .scaleAspectFit

        return logoImage
    }()

    private lazy var passcodeView = PasscodeView()

    // MARK: - Private Properties

    private var mainStackFrameOriginY: CGFloat?
    private let viewModel: VerificationViewModelType

    // MARK: - init

    init(with viewModel: VerificationViewModelType) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // MARK: - Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        view.addSubview(mainStackView)
        setupAutoLayout()
        setupNotificationCenter()
        changeViewState(to: .normal)
        setupBindings()

        viewModel.inputs.setupInitialPhoneNumber()
    }

    private func setupBindings() {
        viewModel.outputs.bindPhoneNumberToView = { [weak self] in
            let footnote = "Code was sent to number \($0)"
            let myMutableString = NSMutableAttributedString(string: footnote)

            myMutableString.addAttribute(NSAttributedString.Key.foregroundColor,
                                         value: UIColor.black,
                                         range: NSRange(location: 24, length: $0.count))

            self?.footnoteLabel.attributedText = myMutableString
        }

        passcodeView.didEnteredPasscode = { [weak self] code in
            self?.viewModel.inputs.verify(enteredPasscode: code)
        }

        viewModel.outputs.bindCodeStateToView = { [weak self] codeState in
            switch codeState {
            case .verified:
                self?.timeLabel.text = ""

                self?.hideResendCodeButton()
                self?.passcodeView.validState()
                self?.viewModel.inputs.stopTimer()
            case .invalid:
                self?.passcodeView.errorState()
            default:
                break
            }
        }

        viewModel.outputs.bindSecondsToView = { [weak self] seconds in
            if Int(seconds) == 0 {
                self?.changeViewState(to: .expiredVerification)
            } else {
                self?.timeLabel.text = "Resend code in 00:\(seconds)"
            }
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(true)

        mainStackFrameOriginY = mainStackView.frame.origin.y
        viewModel.inputs.startTimer()
        passcodeView.beginResponderFlow()
    }

    // MARK: - Private Methods

    private func setupAutoLayout() {
        mainStackView.translatesAutoresizingMaskIntoConstraints = false
        passcodeView.translatesAutoresizingMaskIntoConstraints = false
        logoImage.translatesAutoresizingMaskIntoConstraints = false
        timeLabel.translatesAutoresizingMaskIntoConstraints = false
        bodyStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            mainStackView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor,
                                                   constant: Constraints.indent),
            mainStackView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor,
                                                    constant: -Constraints.indent),
            mainStackView.heightAnchor.constraint(equalToConstant: Constraints.mainStackHeight),
            mainStackView.centerYAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerYAnchor)
        ])

        NSLayoutConstraint.activate([
            passcodeView.heightAnchor.constraint(equalToConstant: Constraints.passcodeViewHeight),
            passcodeView.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor),
            passcodeView.centerYAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerYAnchor)
        ])

        logoImage.heightAnchor.constraint(equalToConstant: Constraints.imageHeight).isActive = true
        timeLabel.heightAnchor.constraint(equalToConstant: Constraints.timeLabelHeight).isActive = true
        bodyStackView.heightAnchor.constraint(equalToConstant: Constraints.bodyStackHeight).isActive = true
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

    private func hideResendCodeButton() {
        resendCodeButton.setTitle("", for: .normal)
        resendCodeButton.backgroundColor = .white
        resendCodeButton.isUserInteractionEnabled = false
    }

    private func changeViewState(to viewState: ViewState) {
        switch viewState {
        case .normal:
            resendCodeButton.isHidden = true
            timeLabel.isHidden = false
        case .expiredVerification:
            resendCodeButton.isHidden = false
            timeLabel.isHidden = true
        }
    }

    // MARK: - Actions

    @objc
    private func resendCodeButtonTapped() {
        changeViewState(to: .normal)
        passcodeView.resetFields()
        viewModel.inputs.startTimer()
    }

    @objc
    private func updateView(notification: Notification) {
        let userInfo = notification.userInfo
        guard let keyboardRectValue = (userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue else { return }

        if notification.name == UIResponder.keyboardWillHideNotification {
            UIView.animate(withDuration: 2,
                           delay: 0,
                           options: [.curveEaseOut]) { [weak self] in
                guard let self = self,
                      let mainStackViewFrameOriginY = self.mainStackFrameOriginY else { return }

                self.mainStackView.transform = self.mainStackView.transform.translatedBy(
                    x: 0,
                    y: -self.mainStackView.frame.origin.y + mainStackViewFrameOriginY)
            }
        } else {
            let keyboardCoordinateY = view.bounds.size.height - keyboardRectValue.height
            let overlappedViewSize = self.mainStackView.frame.origin.y + self.mainStackView.bounds.height - keyboardCoordinateY

            UIView.animate(withDuration: 2,
                           delay: 0,
                           options: [.curveEaseOut]) { [weak self] in
                guard let self = self else { return }

                self.mainStackView.transform = self.mainStackView.transform.translatedBy(
                    x: 0,
                    y: -overlappedViewSize - 20)
            }
        }
    }
}
