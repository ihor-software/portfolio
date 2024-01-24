//
//  SortingSettingsViewController.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 03.08.2021.
//

import UIKit

final class SortingSettingsViewController: UIViewController {
    private let scrollView: UIScrollView = {
        let scrollView = UIScrollView()
        scrollView.showsHorizontalScrollIndicator = false
        scrollView.showsVerticalScrollIndicator = false

        return scrollView
    }()

    private lazy var contentView = SortingSettingsContentView(settingsData: viewModel.inputs.settingsData, superViewFrameWidth: view.frame.width)

    private let doneButton = IEatButton()

    private let viewModel: SortingSettingsViewModelType

    init(viewModel: SortingSettingsViewModelType) {
        self.viewModel = viewModel

        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .white

        navigationController?.isNavigationBarHidden = true

        setupUI()
    }

    private func setupUI() {
        setupButton()
        setupTapGestureRecognizer()
        setupBindings()
        setupConstraints()
        setupNotificationCenter()
    }

    private func setupButton() {
        doneButton.setTitle("Done", for: .normal)
        doneButton.addTarget(self,
                             action: #selector(doneTapped),
                             for: .touchUpInside)
    }

    @objc private func considerMyPreferencesCheckBoxButtonTapped() {
        viewModel.inputs.updateConsiderMyPreferencesSettings()
    }

    @objc private func doneTapped() {
        viewModel.inputs.acceptSelectedSettings()

        dismiss(animated: true)
    }

    private func setupTapGestureRecognizer() {
        let tap = UITapGestureRecognizer(
            target: self,
            action: #selector(dismissKeyboard))

        view.addGestureRecognizer(tap)
    }

    @objc func dismissKeyboard() {
        contentView.dismissKeyboard()
    }

    private func setupBindings() {
        viewModel.outputs.bindSettingsDataToView = { [weak self] settingsData in
            self?.contentView.updateSettingsDataState(settingsData: settingsData)
        }

        contentView.bindConsiderMyPreferencesStateToView = { [weak self] in
            self?.viewModel.inputs.updateConsiderMyPreferencesSettings()
        }

        contentView.bindSortByTappedButtonToView = { [weak self] type in
            self?.viewModel.inputs.updateSortBySettings(type: type)
        }

        contentView.bindHotPriceOffersButtonStateToView = { [weak self] in
            self?.viewModel.inputs.updateHotPriceOffersSettings()
        }

        contentView.bindNewFromPriceDigitToView = { [weak self] digit in
            self?.viewModel.inputs.addToFromPriceNew(digit: digit)
        }

        contentView.bindNewToPriceDigitToView = { [weak self] digit in
            self?.viewModel.inputs.addToToPriceNew(digit: digit)
        }

        contentView.bindEditButtonToView = { [weak self] in
            self?.viewModel.inputs.editMyPreferences()
        }
    }

    private func setupConstraints() {
        view.addSubview(scrollView)
        view.addSubview(doneButton)
        scrollView.addSubview(contentView)

        scrollView.translatesAutoresizingMaskIntoConstraints = false
        doneButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: doneButton.topAnchor, constant: -27),

            contentView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
            contentView.topAnchor.constraint(equalTo: scrollView.topAnchor),
            contentView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
            contentView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            contentView.widthAnchor.constraint(equalTo: scrollView.widthAnchor),

            doneButton.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 24),
            doneButton.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -24),
            doneButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16)
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
        scrollView.contentInset.bottom = notification.name == UIResponder.keyboardWillHideNotification ? .zero : 130
    }
}
