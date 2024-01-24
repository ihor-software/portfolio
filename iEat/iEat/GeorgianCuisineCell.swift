//
//  GeorgianCuisineCell.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 05.06.2021.
//

import UIKit

final class GeorgianCuisineCell: MenuCollectionViewCell {
    // MARK: - Static Properties

    static let identifier = "GeorgianCuisineCell"

    private enum Constant {
        static let imageHeight: CGFloat = 175
        static let infoStackHeight: CGFloat = 100
        static let indent: CGFloat = 10
    }

    // MARK: - Self-executing closures

    private lazy var mainStackView: UIStackView = {
        let mainStackView = UIStackView()
        mainStackView.axis = .vertical
        mainStackView.distribution = .equalCentering

        mainStackView.addArrangedSubview(dishImage)
        mainStackView.addArrangedSubview(bodyStackView)

        return mainStackView
    }()

    private lazy var bodyStackView: UIStackView = {
        let bodyStackView = UIStackView()
        bodyStackView.axis = .horizontal
        bodyStackView.distribution = .fillEqually

        bodyStackView.addArrangedSubview(infoStackView)
        bodyStackView.addArrangedSubview(subviewWithButton)

        return bodyStackView
    }()

    private lazy var infoStackView: UIStackView = {
        let infoStackView = UIStackView()
        infoStackView.axis = .vertical
        infoStackView.distribution = .equalSpacing

        infoStackView.addArrangedSubview(itemNameLabel)
        infoStackView.addArrangedSubview(descriptionLabel)
        infoStackView.addArrangedSubview(priсeLabel)

        return infoStackView
    }()

    private lazy var subviewWithButton: UIView = {
        let subviewWithButton = UIView()
        subviewWithButton.addSubview(addToShoppingBasketButton)

        return subviewWithButton
    }()

    private lazy var dishImage: UIImageView = {
        let dishImage = UIImageView()
        dishImage.contentMode = .scaleAspectFit

        return dishImage
    }()

    private lazy var itemNameLabel: UILabel = {
        let itemNameLabel = UILabel()
        itemNameLabel.numberOfLines = 0
        itemNameLabel.font = UIFont.iEatDishNameFont

        return itemNameLabel
    }()

    private lazy var descriptionLabel: UILabel = {
        let descriptionLabel = UILabel()
        descriptionLabel.font = UIFont.iEatMainFont
        descriptionLabel.textColor = .lightGray

        return descriptionLabel
    }()

    private lazy var priсeLabel: UILabel = {
        let priсeLabel = UILabel()
        priсeLabel.font = UIFont.iEatPriceFont

        return priсeLabel
    }()

    private lazy var addToShoppingBasketButton: IEatButton = {
        let addToShoppingBasketButton = IEatButton()
        let image = UIImage(systemName: "cart")
        addToShoppingBasketButton.setImage(image, for: .normal)
        addToShoppingBasketButton.tintColor = .white
        addToShoppingBasketButton.addTarget(self,
                                            action: #selector(addToShoppingBasketButtonTapped),
                                            for: .touchUpInside)

        return addToShoppingBasketButton
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)

        contentView.clipsToBounds = true
        contentView.addSubview(mainStackView)
        setupAutoLayout()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    // MARK: - Private Methods

    private func setupAutoLayout() {
        mainStackView.translatesAutoresizingMaskIntoConstraints = false
        dishImage.translatesAutoresizingMaskIntoConstraints = false
        addToShoppingBasketButton.translatesAutoresizingMaskIntoConstraints = false
        infoStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            mainStackView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor,
                                                   constant: Constant.indent),
            mainStackView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor,
                                                    constant: -Constant.indent),
            mainStackView.topAnchor.constraint(equalTo: contentView.topAnchor),
            mainStackView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor,
                                                  constant: -Constant.indent)
        ])

        NSLayoutConstraint.activate([
            addToShoppingBasketButton.widthAnchor.constraint(equalTo: addToShoppingBasketButton.heightAnchor,
                                                             multiplier: 1),
            addToShoppingBasketButton.centerYAnchor.constraint(equalTo: subviewWithButton.centerYAnchor),
            addToShoppingBasketButton.centerXAnchor.constraint(equalTo: subviewWithButton.centerXAnchor)
        ])

        infoStackView.heightAnchor.constraint(equalToConstant: Constant.infoStackHeight).isActive = true
        dishImage.heightAnchor.constraint(equalToConstant: Constant.imageHeight).isActive = true
    }

    // MARK: - Actions

    @objc
    private func addToShoppingBasketButtonTapped() {}
}
