//
//  OrderDetailsImageView.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 13.07.2021.
//

import UIKit

final class OrderDetailsImageView: UIImageView {
    private let orderIDLabel = UILabel()
    private let orderIDValueLabel = UILabel()
    private let orderIDStackView = UIStackView()

    private let deliveryTimeLabel = UILabel()
    private let deliveryTimeValueLabel = UILabel()
    private let deliveryStackView = UIStackView()

    private let addressLabel = UILabel()
    private let addressValueLabel = UILabel()
    private let addressStackView = UIStackView()

    private let blueFrameHeaderStackView = UIStackView()

    private let totalLabel = UILabel()
    private let totalValueLabel = UILabel()
    private let totalStackView = UIStackView()

    private let paymentMethodInfoLabel = UILabel()

    private let blueFrameFooterStackView = UIStackView()

    private let blueFrameStackView = UIStackView()

    override init(image: UIImage?) {
        super.init(image: image)

        commonInit()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func commonInit() {
        setupLabels()
        setupStackViews()
        setupConstraintsForBlueFrameStackView()
    }

    private func setupLabels() {
        let titleLabelsArray = [orderIDLabel,
                                 deliveryTimeLabel,
                                 addressLabel,
                                 totalLabel]

        let valueLabelsArray = [orderIDValueLabel,
                                 deliveryTimeValueLabel,
                                 addressValueLabel,
                                 totalValueLabel]

        titleLabelsArray.forEach {
            $0.textColor = .black
            $0.textAlignment = .left
            $0.font = .iEatSubtitleFont
        }

        valueLabelsArray.forEach {
            $0.textColor = .black
            $0.textAlignment = .right
            $0.font = .boldSystemFont(ofSize: 15)
        }

        orderIDLabel.text = "Order ID"
        deliveryTimeLabel.text = "Delivery time"
        addressLabel.text = "Address"
        totalLabel.text = "Total"

        orderIDValueLabel.text = "#78915"
        deliveryTimeValueLabel.text = OrderDetails.shared.time
        addressValueLabel.text = OrderDetails.shared.adress
        addressValueLabel.numberOfLines = 0
        totalValueLabel.text = "100 $"

        paymentMethodInfoLabel.textColor = .black
        paymentMethodInfoLabel.textAlignment = .right
        paymentMethodInfoLabel.font = .iEatMainFont
        paymentMethodInfoLabel.text = "Please, prepare \(OrderDetails.shared.payment)"
    }

    private func setupStackViews() {
        let blueFrameStackViewsArray = [orderIDStackView,
                                        deliveryStackView,
                                        addressStackView,
                                        totalStackView,
                                        blueFrameHeaderStackView,
                                        blueFrameFooterStackView]

        blueFrameStackViewsArray.forEach {
            $0.alignment = .fill
            $0.axis = .horizontal
            $0.spacing = 10
            $0.distribution = .fill
        }

        blueFrameHeaderStackView.axis = .vertical
        blueFrameFooterStackView.axis = .vertical

        orderIDStackView.addArrangedSubview(orderIDLabel)
        orderIDStackView.addArrangedSubview(orderIDValueLabel)

        deliveryStackView.addArrangedSubview(deliveryTimeLabel)
        deliveryStackView.addArrangedSubview(deliveryTimeValueLabel)

        addressStackView.addArrangedSubview(addressLabel)
        addressStackView.addArrangedSubview(addressValueLabel)

        blueFrameHeaderStackView.addArrangedSubview(orderIDStackView)
        blueFrameHeaderStackView.addArrangedSubview(deliveryStackView)
        blueFrameHeaderStackView.addArrangedSubview(addressStackView)
        blueFrameHeaderStackView.addArrangedSubview(totalStackView)

        totalStackView.addArrangedSubview(totalLabel)
        totalStackView.addArrangedSubview(totalValueLabel)

        blueFrameFooterStackView.addArrangedSubview(totalStackView)
        blueFrameFooterStackView.addArrangedSubview(paymentMethodInfoLabel)

        blueFrameStackView.alignment = .fill
        blueFrameStackView.axis = .vertical
        blueFrameStackView.spacing = 29
        blueFrameStackView.distribution = .equalSpacing

        blueFrameStackView.addArrangedSubview(blueFrameHeaderStackView)
        blueFrameStackView.addArrangedSubview(blueFrameFooterStackView)
    }

    private func setupConstraintsForBlueFrameStackView() {
        addSubview(blueFrameStackView)

        blueFrameStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            blueFrameStackView.topAnchor.constraint(equalTo: topAnchor, constant: 24),
            blueFrameStackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 24),
            blueFrameStackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -24),
            blueFrameStackView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -24)
        ])
    }
}
