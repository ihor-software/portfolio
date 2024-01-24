//
//  EmptyCartViewController.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 02.07.2021.
//

import UIKit

final class EmptyCartViewController: UIViewController {
    private let dogImageView = UIImageView()
    private let infoLabel = UILabel()
    private let adviceLabel = UILabel()
    private let labelsStackView = UIStackView()
    private let mainStackView = UIStackView()

    private var cartManager: CartManager {
        DIContainer.shared.resolve(type: CartManager.self)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        setupUI()
    }

    override func viewWillDisappear(_ animated: Bool) {
        if !cartManager.getBasket().isEmpty {
            navigationController?.popViewController(animated: false)
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        if !cartManager.getBasket().isEmpty {
            navigationController?.popViewController(animated: false)
        }
    }

    private func setupUI() {
        view.backgroundColor = .white

        navigationItem.title = "Cart"
        navigationItem.setHidesBackButton(true, animated: true)

        setupImageView()
        setupLabels()
        setupStackViews()
    }

    private func setupImageView() {
        dogImageView.image = UIImage(named: "empty.cart")
    }

    private func setupLabels() {
        infoLabel.textColor = .black
        infoLabel.textAlignment = .center
        infoLabel.font = .boldSystemFont(ofSize: 24)
        infoLabel.text = "Wow, such empty"

        adviceLabel.textColor = .gray
        adviceLabel.textAlignment = .center
        adviceLabel.font = .iEatSubtitleFont
        adviceLabel.text = "Start choosing yammies, treat your inner animal"
    }

    private func setupStackViews() {
        labelsStackView.alignment = .center
        labelsStackView.axis = .vertical
        labelsStackView.spacing = 10
        labelsStackView.distribution = .equalSpacing

        mainStackView.alignment = .center
        mainStackView.axis = .vertical
        mainStackView.distribution = .equalSpacing
        mainStackView.spacing = 40

        labelsStackView.addArrangedSubview(infoLabel)
        labelsStackView.addArrangedSubview(adviceLabel)
        mainStackView.addArrangedSubview(dogImageView)
        mainStackView.addArrangedSubview(labelsStackView)

        view.addSubview(mainStackView)

        mainStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            mainStackView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            mainStackView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            mainStackView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            mainStackView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            mainStackView.heightAnchor.constraint(equalToConstant: 267)
        ])
    }
}
