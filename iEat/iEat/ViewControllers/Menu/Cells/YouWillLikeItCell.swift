//
//  YouWillLikeItCell.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 07.07.2021.
//

import UIKit

final class YouWillLikeItCell: UICollectionViewCell {
    static let identifier = "YouWillLikeItCell"

    private let titleLabel = UILabel()
    private let descriptionLabel = UILabel()
    private let priceLabel = UILabel()
    private let addToCardButtonBackgroundView = UIView()
    private let mainVerticalStack = UIStackView()
    private let infoHorizontalStack = UIStackView()
    private let infoVerticalStack = UIStackView()

    var dishItem = DishItem(title: "", imagePath: "", description: "", weight: 0, kcal: 0, price: 0.0, foodCompositions: [], ingredients: [])

    let addToCartButton: UIButton = {
         let button = UIButton()
         button.backgroundColor = .systemBlue
         button.setImage(UIImage(named: "cart"), for: .normal)
         button.tintColor = .white
         button.imageEdgeInsets = UIEdgeInsets(top: 16.5, left: 14.5, bottom: 15.9, right: 15)
         button.layer.cornerRadius = 15
         return button
     }()

    let counterView: UIStackView = {
        let stackView = UIStackView()
        stackView.axis  = NSLayoutConstraint.Axis.vertical
        stackView.distribution  = UIStackView.Distribution.equalSpacing
        stackView.alignment = UIStackView.Alignment.center
        stackView.spacing = 5.0
        return stackView
    }()

    private let quantityLabel: UILabel = {
        let quantityLabel = UILabel()
        quantityLabel.textAlignment = .center
        quantityLabel.text = "1"
        return quantityLabel
    }()

    var dishQuantity: Int = 1 {
        didSet {
            if dishQuantity <= 0 {
                addToCartButton.isHidden = false
                counterView.isHidden = true
            }
            quantityLabel.text = String(dishQuantity)
            addToCart(self, dishQuantity)
        }
    }

    private var cartManager: CartManager {
        DIContainer.shared.resolve(type: CartManager.self)
    }

    private let decrementButton = QuantityButton(style: .decrement)
    private let incrementButton = QuantityButton(style: .increment)

    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()

        decrementButton.addTarget(self,
                                  action: #selector(didDecrement),
                                  for: .touchUpInside)

        incrementButton.addTarget(self,
                                  action: #selector(didIncrement),
                                  for: .touchUpInside)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func commonInit() {
        setupMainVerticalStack()
        setupInfoVerticalStack()
        setupInfoHorizontalStack()
        setupAddToCardButton()

        setupInfoLabels()
    }

    private func addToCart(_ cell: YouWillLikeItCell, _ quantity: Int) {
        let dishItem = DishItem(title: cell.dishItem.title,
                                imagePath: cell.dishItem.imagePath,
                                description: cell.dishItem.description,
                                weight: cell.dishItem.weight,
                                kcal: cell.dishItem.kcal,
                                price: cell.dishItem.price,
                                foodCompositions: [.spicyFood],
                                ingredients: [lettuce])
        cartManager.setBasket(array: [CartItem(dishItem: dishItem, quantity: quantity)])
    }
}

// MARK: - addToCardButton

private extension YouWillLikeItCell {
    private func setupAddToCardButton() {
        addToCartButton.addTarget(self, action: #selector(addToCartAction), for: .touchUpInside)
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

// MARK: - mainVerticalStack

private extension YouWillLikeItCell {
    private func setupMainVerticalStack() {
        addSubview(mainVerticalStack)

        mainVerticalStack.axis = .vertical
        mainVerticalStack.distribution = .equalCentering
        mainVerticalStack.backgroundColor = .white
        mainVerticalStack.layer.cornerRadius = 12

        addMainVerticalStackSubviews()
        setupMainVerticalStackShadow()
        setupMainVerticalStackConstraints()
    }

    private func addMainVerticalStackSubviews() {
        mainVerticalStack.addArrangedSubview(infoHorizontalStack)
    }

    private func setupMainVerticalStackShadow() {
        mainVerticalStack.layer.shadowColor = UIColor.black.cgColor
        mainVerticalStack.layer.shadowOffset = CGSize(width: 0, height: 15)
        mainVerticalStack.layer.shadowOpacity = 0.15
        mainVerticalStack.layer.shadowRadius = 9
    }

    private func setupMainVerticalStackConstraints() {
        mainVerticalStack.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            mainVerticalStack.topAnchor.constraint(equalTo: contentView.topAnchor, constant: contentView.frame.width * 0.5),
            mainVerticalStack.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            mainVerticalStack.trailingAnchor.constraint(equalTo: contentView.trailingAnchor)
        ])
    }
}

// MARK: - info labels

private extension YouWillLikeItCell {
    private func setupInfoLabels() {
        titleLabel.font = .iEatCellTitleFont

        descriptionLabel.font = .iEatCellDescriptionFont
        descriptionLabel.textColor = .darkGray

        priceLabel.font = .iEatCellPriceFont
    }
}

// MARK: - infoHorizontalStack

private extension YouWillLikeItCell {
    private func setupInfoHorizontalStack() {
        infoHorizontalStack.axis = .horizontal
        infoHorizontalStack.alignment = .center

        addInfoHorizontalStackSubviews()
        setupInfoHorizontalStackConstraints()
    }

    private func addInfoHorizontalStackSubviews() {
        counterView.addArrangedSubview(incrementButton)
        counterView.addArrangedSubview(quantityLabel)
        counterView.addArrangedSubview(decrementButton)

        infoHorizontalStack.addArrangedSubview(infoVerticalStack)
        contentView.addSubview(addToCartButton)
        contentView.addSubview(counterView)
    }

    private func setupInfoHorizontalStackConstraints() {
        infoHorizontalStack.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            infoHorizontalStack.leadingAnchor.constraint(equalTo: mainVerticalStack.leadingAnchor, constant: 15),
            infoHorizontalStack.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -100),
            infoHorizontalStack.heightAnchor.constraint(equalToConstant: contentView.frame.width * 0.3)
        ])
    }
}

// MARK: - infoVerticalStack

private extension YouWillLikeItCell {
    private func setupInfoVerticalStack() {
        infoVerticalStack.axis = .vertical
        infoVerticalStack.distribution = .equalSpacing
        infoVerticalStack.spacing = 15

        addInfoVerticalStackSubviews()
    }

    private func addInfoVerticalStackSubviews() {
        infoVerticalStack.addArrangedSubview(titleLabel)
        infoVerticalStack.addArrangedSubview(descriptionLabel)
        infoVerticalStack.addArrangedSubview(priceLabel)
    }
}

// MARK: - public interface

extension YouWillLikeItCell {
    public func setup(item: DishItem) {
        let image = UIImage(named: item.imagePath)
        titleLabel.text = item.title
        descriptionLabel.text = "\(item.weight)g | \(item.kcal) kcal"
        priceLabel.text = "$" + String(item.price)

        let imageSize = CGSize(width: contentView.frame.width, height: contentView.frame.width * 0.5)
        let scaledImage = image?.scaled(to: imageSize, scalingMode: .aspectFill)
        let dishImageView = UIImageView(image: scaledImage)
        dishImageView.roundCorners(corners: [.topLeft, .topRight], radius: 12)

        setupImageViewConstraints(mainImageView: dishImageView)

        dishItem.title = item.title
        dishItem.weight = item.weight
        dishItem.kcal = item.kcal
        dishItem.description = "\(item.weight)g | \(item.kcal) kcal"
        dishItem.imagePath = item.imagePath
        dishItem.price = item.price
    }

    private func setupImageViewConstraints(mainImageView: UIImageView) {
        addSubview(mainImageView)
        addToCartButton.translatesAutoresizingMaskIntoConstraints = false
        counterView.translatesAutoresizingMaskIntoConstraints = false
        mainImageView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            mainImageView.heightAnchor.constraint(equalToConstant: contentView.frame.width * 0.5),
            mainImageView.widthAnchor.constraint(equalToConstant: contentView.frame.width),
            mainImageView.topAnchor.constraint(equalTo: contentView.topAnchor),
            mainImageView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),

            addToCartButton.topAnchor.constraint(equalTo: mainImageView.bottomAnchor, constant: 10),
            addToCartButton.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -10),
            addToCartButton.widthAnchor.constraint(equalToConstant: 50),
            addToCartButton.heightAnchor.constraint(equalToConstant: 50),

            counterView.topAnchor.constraint(equalTo: mainImageView.bottomAnchor, constant: 10),
            counterView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20)
        ])
    }
}

extension YouWillLikeItCell: DishCellProtocol {
}
