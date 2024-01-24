//
//  OrderPlacedViewController.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 02.07.2021.
//

import UIKit

final class OrderPlacedViewController: UIViewController {
    private let cartImageView = UIImageView()
    private let infoLabel = UILabel()
    private let adviceLabel = UILabel()
    private let cartLabelsStackView = UIStackView()
    private let cartImageWithInfoStackView = UIStackView()
    private let blueFrameImage = UIImage(named: "frame.for.oreder.details")
    private lazy var blueFrameImageView = OrderDetailsImageView(image: blueFrameImage)
    private let mainStackView = UIStackView()

    private let button = IEatButton()

    override func viewDidLoad() {
        super.viewDidLoad()

        setupUI()
    }

    private func setupUI() {
        view.backgroundColor = .white

        setupImageView()
        setupLabels()
        setupStackViews()
        setupConstraints()
        setupButton()
    }

    private func setupImageView() {
        cartImageView.image = UIImage(named: "placed.order.cart")
    }

    private func setupLabels() {
        infoLabel.textColor = .black
        infoLabel.textAlignment = .center
        infoLabel.font = .boldSystemFont(ofSize: 24)
        infoLabel.text = "Your order is placed 🎒"

        adviceLabel.textColor = .gray
        adviceLabel.textAlignment = .center
        adviceLabel.font = .iEatSubtitleFont
        adviceLabel.text = "Our team is on its way to deliver your order"
    }

    private func setupStackViews() {
        cartLabelsStackView.alignment = .center
        cartLabelsStackView.axis = .vertical
        cartLabelsStackView.spacing = 12
        cartLabelsStackView.distribution = .equalSpacing

        cartLabelsStackView.addArrangedSubview(infoLabel)
        cartLabelsStackView.addArrangedSubview(adviceLabel)

        cartImageWithInfoStackView.alignment = .center
        cartImageWithInfoStackView.axis = .vertical
        cartImageWithInfoStackView.distribution = .equalSpacing
        cartImageWithInfoStackView.spacing = 30

        cartImageWithInfoStackView.addArrangedSubview(cartImageView)
        cartImageWithInfoStackView.addArrangedSubview(cartLabelsStackView)

        mainStackView.alignment = .center
        mainStackView.axis = .vertical
        mainStackView.spacing = 32
        mainStackView.distribution = .equalSpacing

        mainStackView.addArrangedSubview(cartImageWithInfoStackView)
        mainStackView.addArrangedSubview(blueFrameImageView)
    }

    private func setupConstraints() {
        view.addSubview(mainStackView)

        mainStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            mainStackView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            mainStackView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 26),
            mainStackView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            mainStackView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            mainStackView.heightAnchor.constraint(equalToConstant: 519)
        ])
    }

    private func setupButton() {
        button.setTitle("Go to main page", for: .normal)
        button.addTarget(self, action: #selector(goBack), for: .touchUpInside)

        view.addSubview(button)

        button.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            button.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            button.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            button.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16)
        ])
    }

    @objc private func goBack() {
        navigationController?.popToRootViewController(animated: true)
    }
}
