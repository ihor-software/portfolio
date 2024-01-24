//
//  MyPreferencesViewController.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 22.09.2021.
//

import UIKit

final class MyPreferencesViewController: UIViewController {
    let viewModel: MyPreferencesViewModelType

    private lazy var scrollView: UIScrollView = {
        let scrollView = UIScrollView()
        scrollView.showsHorizontalScrollIndicator = false
        scrollView.showsVerticalScrollIndicator = false

        return scrollView
    }()

    private lazy var contentView = MyPreferencesContentView(settingsData: viewModel.inputs.settingsData)

    private lazy var confirmButton: IEatButton = {
        let button = IEatButton()
        button.setTitle("Confirm", for: .normal)
        button.addTarget(self,
                         action: #selector(confirmTapped),
                         for: .touchUpInside)

        return button
    }()

    init(viewModel: MyPreferencesViewModelType) {
        self.viewModel = viewModel

        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .white

        setupBindings()
        setupConstraints()
    }

    @objc private func confirmTapped() {
        viewModel.inputs.confirmPreferences()
    }

    private func setupBindings() {
        viewModel.outputs.bindSettingsDataToView = { [weak self] settingsData in
            self?.contentView.updateFoodCompositionsState(settingsData: settingsData)
        }

        viewModel.outputs.bindUpdatedIngredientStateIndexToView = { [weak self] index in
            self?.contentView.updateIngredientStateBy(index: index)
        }

        contentView.bindFoodCompositionToView = { [weak self] type in
            self?.viewModel.inputs.updateFoodCompositionsSettings(type: type)
        }

        contentView.bindIngredientIndexToView = { [weak self] index in
            self?.viewModel.inputs.updateIngredientStateBy(index: index)
        }

        contentView.bindAddButtonTapToView = { [weak self] in
            self?.viewModel.inputs.showListOfIngredientsScreen()
        }
    }

    private func setupConstraints() {
        view.addSubview(scrollView)
        view.addSubview(confirmButton)

        scrollView.addSubview(contentView)

        scrollView.translatesAutoresizingMaskIntoConstraints = false
        contentView.translatesAutoresizingMaskIntoConstraints = false
        confirmButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: confirmButton.topAnchor, constant: -27),

            contentView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
            contentView.topAnchor.constraint(equalTo: scrollView.topAnchor),
            contentView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
            contentView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            contentView.widthAnchor.constraint(equalTo: scrollView.widthAnchor),

            confirmButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            confirmButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
            confirmButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16)
        ])
    }

}
