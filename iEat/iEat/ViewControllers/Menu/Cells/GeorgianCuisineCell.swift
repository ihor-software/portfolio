//
//  GeorgianCuisineCell.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 05.06.2021.
//

import UIKit

final class GeorgianCuisineCell: UICollectionViewCell {
    static let identifier = "GeorgianCuisineCell"

    private let descriptionLabel = UILabel()

    private let lettuce = Ingredient(name: "Lettuce",
                                     preferenceName: "No lettuce",
                                     dishTag: "Lettuce")

    lazy var dishItem = DishItem(title: "",
                                 imagePath: "",
                                 description: "",
                                 weight: 0,
                                 kcal: 0,
                                 price: 0.0,
                                 foodCompositions: [.spicyFood],
                                 ingredients: [lettuce])

    private let titleLabel: UILabel = {
        let titleLabel = UILabel()
        titleLabel.numberOfLines = 0
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        titleLabel.widthAnchor.constraint(equalToConstant: 100).isActive = true

        return titleLabel
    }()

    let addToCartButton: UIButton = {
        let button = UIButton()
        button.backgroundColor = .systemBlue
        button.setImage(UIImage(named: "cart"), for: .normal)
        button.tintColor = .white
        button.imageEdgeInsets = UIEdgeInsets(top: 16.5, left: 14.5, bottom: 15.9, right: 15)
        button.layer.cornerRadius = 15
        return button
    }()

    private lazy var priceLabel: UILabel = {
        let priceLabel = UILabel()
        priceLabel.translatesAutoresizingMaskIntoConstraints = false

        return priceLabel
    }()

    private lazy var mainVerticalStack: UIStackView = {
        let cellStack = UIStackView()
        cellStack.axis = .vertical

        cellStack.backgroundColor = .white
        cellStack.layer.cornerRadius = 12
        cellStack.layer.shadowColor = UIColor.black.cgColor
        cellStack.layer.shadowOffset = CGSize(width: 0, height: 15)
        cellStack.layer.shadowOpacity = 0.15
        cellStack.layer.shadowRadius = 9

        cellStack.addArrangedSubview(infoHorizontalStack)

        return cellStack
    }()

    private lazy var infoHorizontalStack: UIStackView = {
        let cellStack = UIStackView()
        cellStack.axis = .horizontal
        cellStack.distribution = .equalSpacing
        cellStack.alignment = .top
        cellStack.addArrangedSubview(infoVerticalStack)
        return cellStack
    }()

    private lazy var infoVerticalStack: UIStackView = {
        let cellStack = UIStackView()
        cellStack.axis = .vertical
        cellStack.distribution = .equalSpacing
        cellStack.spacing = 5
        cellStack.alignment = .top

        cellStack.addArrangedSubview(titleLabel)
        cellStack.addArrangedSubview(descriptionLabel)
        cellStack.addArrangedSubview(priceLabel)

        return cellStack
    }()

    private lazy var addToCartButtonView: UIView = {
        let subviewWithButton = UIView()
        subviewWithButton.addSubview(addToCartButton)

        return subviewWithButton
    }()

    let counterView: UIStackView = {
        let stackView = UIStackView()
        stackView.axis  = NSLayoutConstraint.Axis.vertical
        stackView.distribution  = UIStackView.Distribution.equalSpacing
        stackView.alignment = UIStackView.Alignment.center
        stackView.spacing   = 5.0
        return stackView
    }()

    var dishQuantity: Int = 1 {
        didSet {
            if dishQuantity <= 0 {
                addToCartButton.isHidden = false
                counterView.isHidden = true
            }
            if dishQuantity >= 99 {
                dishQuantity = 99
                incrementButton.makeDeactivated()
            } else {
                incrementButton.makeActivated()
            }
            quantityLabel.text = String(dishQuantity)
            addToCart(self, dishQuantity)
        }
    }

    private let quantityLabel: UILabel = {
        let quantityLabel = UILabel()
        quantityLabel.textAlignment = .center
        quantityLabel.text = "1"
        return quantityLabel
    }()

    private var cartManager: CartManager {
        DIContainer.shared.resolve(type: CartManager.self)
    }

    private let decrementButton = QuantityButton(style: .decrement)
    private let incrementButton = QuantityButton(style: .increment)

    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
        setupSubViews()

        decrementButton.addTarget(self,
                                  action: #selector(didDecrement),
                                  for: .touchUpInside)

        incrementButton.addTarget(self,
                                  action: #selector(didIncrement),
                                  for: .touchUpInside)

    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    func setup(item: DishItem) {
        let image = UIImage(named: item.imagePath)

        titleLabel.text = item.title
        descriptionLabel.text = "\(item.weight)g | \(item.kcal) kcal"
        priceLabel.text = "$" + String(item.price)

        setupDishImageView(with: image ?? UIImage())

        dishItem.title = item.title
        dishItem.weight = item.weight
        dishItem.kcal = item.kcal
        dishItem.description = "\(item.weight)g | \(item.kcal) kcal"
        dishItem.imagePath = item.imagePath
        dishItem.price = item.price
    }

    private func setupSubViews() {
        counterView.addArrangedSubview(incrementButton)
        counterView.addArrangedSubview(quantityLabel)
        counterView.addArrangedSubview(decrementButton)
    }

    private func commonInit() {
        addToCartButton.addTarget(self, action: #selector(addToCartAction), for: .touchUpInside)
        titleLabel.font = .iEatCellTitleFont
        descriptionLabel.font = .iEatCellDescriptionFont
        descriptionLabel.textColor = .darkGray
        priceLabel.font = .iEatCellPriceFont
    }

    private func setupDishImageView(with image: UIImage) {
        let imageSize = CGSize(width: contentView.frame.width, height: contentView.frame.width * 0.87)
        let scaledImage = image.scaled(to: imageSize, scalingMode: .aspectFill)

        let dishImageView = UIImageView(image: scaledImage)
        dishImageView.roundCorners(corners: [.topLeft, .topRight], radius: 12)

        setupConstraints(mainImageView: dishImageView)
    }

    private func addToCart(_ cell: GeorgianCuisineCell, _ quantity: Int) {
        let dishItem = DishItem(title: cell.dishItem.title,
                                imagePath: cell.dishItem.imagePath,
                                description: cell.dishItem.description,
                                weight: cell.dishItem.weight,
                                kcal: cell.dishItem.kcal,
                                price: cell.dishItem.price,
                                foodCompositions: cell.dishItem.foodCompositions,
                                ingredients: cell.dishItem.ingredients)

        cartManager.setBasket(array: [CartItem(dishItem: dishItem, quantity: quantity)])
    }

    private func setupConstraints(mainImageView: UIImageView) {
        addSubview(mainImageView)
        mainImageView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            mainImageView.topAnchor.constraint(equalTo: contentView.topAnchor),
            mainImageView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            mainImageView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor)
        ])

        contentView.addSubview(mainVerticalStack)
        infoHorizontalStack.addArrangedSubview(addToCartButton)
        infoHorizontalStack.addArrangedSubview(counterView)
        mainVerticalStack.translatesAutoresizingMaskIntoConstraints = false
        infoHorizontalStack.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            mainVerticalStack.topAnchor.constraint(equalTo: mainImageView.bottomAnchor),
            mainVerticalStack.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            mainVerticalStack.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            mainVerticalStack.bottomAnchor.constraint(equalTo: contentView.bottomAnchor),

            infoHorizontalStack.topAnchor.constraint(equalTo: mainVerticalStack.topAnchor, constant: 12),
            infoHorizontalStack.widthAnchor.constraint(equalTo: mainVerticalStack.widthAnchor, multiplier: 0.9),
            infoHorizontalStack.leadingAnchor.constraint(equalTo: mainVerticalStack.leadingAnchor, constant: 10),
            infoHorizontalStack.bottomAnchor.constraint(equalTo: mainVerticalStack.bottomAnchor, constant: -12),

            addToCartButton.widthAnchor.constraint(equalToConstant: 50),
            addToCartButton.heightAnchor.constraint(equalToConstant: 50),
            addToCartButton.trailingAnchor.constraint(equalTo: infoHorizontalStack.trailingAnchor, constant: -20)
        ])
    }

    @objc private func addToCartAction() {
        addToCartButton.isHidden = true
        counterView.isHidden = false
        dishQuantity = 1
    }

    @objc func didIncrement() {
        dishQuantity += 1
    }

    @objc private func didDecrement() {
        dishQuantity -= 1
    }
}

extension GeorgianCuisineCell: DishCellProtocol {
}
