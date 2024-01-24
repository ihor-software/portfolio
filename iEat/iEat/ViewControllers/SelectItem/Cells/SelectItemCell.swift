//
//  SelectItemCell.swift
//  iEat
//
//  Created by Ihor Vasyliev on 16.09.2021.
//

import UIKit

final class SelectItemCell: RadioButtonCell {
    var bindDecrementToView: () -> Void = {}
    var bindIncrementToView: () -> Void = {}

    private enum Const {
        static let descriptionFontSize: CGFloat = 12
        static let priceFontSize: CGFloat = 16
        static let cellCornerRadius: CGFloat = 5
        static let cellPadding: CGFloat = 3
    }

    var item = DishItem(title: "", imagePath: "", description: "", weight: 0, kcal: 0, price: 0, foodCompositions: [], ingredients: [])

    private var searchCellDescription: UILabel = {
        let descriptionLbl = UILabel()
        descriptionLbl.textColor = .lightGray
        descriptionLbl.font = descriptionLbl.font.withSize(Const.descriptionFontSize)
        descriptionLbl.numberOfLines = 0
        descriptionLbl.translatesAutoresizingMaskIntoConstraints = false
        return descriptionLbl
    }()

    private var price: UILabel = {
        let priceLbl = UILabel()
        priceLbl.textColor = .black
        priceLbl.font = priceLbl.font.withSize(Const.priceFontSize)
        priceLbl.translatesAutoresizingMaskIntoConstraints = false
        return priceLbl
    }()

    private var background: UIImageView = {
        let backgroundImageView = UIImageView()
        backgroundImageView.translatesAutoresizingMaskIntoConstraints = false
        backgroundImageView.contentMode = .scaleAspectFill
        backgroundImageView.clipsToBounds = true
        backgroundImageView.layer.cornerRadius = Const.cellCornerRadius
        return backgroundImageView
    }()

    private var contentStackView: UIStackView = {
        let stackView = UIStackView()
        stackView.translatesAutoresizingMaskIntoConstraints = false
        stackView.axis = .vertical
        stackView.distribution = .fillEqually
        stackView.alignment = .fill
        stackView.spacing = Const.cellPadding
        return stackView
    }()

    private let quantityLabel: UILabel = {
        let quantityLabel = UILabel()
        quantityLabel.textAlignment = .center
        return quantityLabel
    }()

    private var cartManager: CartManager {
        DIContainer.shared.resolve(type: CartManager.self)
    }

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupStyle()
        setupSubviews()
        setupConstraints()
    }

    @objc private func decrementDishItemsQuantity() {
        bindDecrementToView()
    }

    @objc private func incrementDishItemsQuantity() {
        bindIncrementToView()
    }

    override func layoutSubviews() {
        super.layoutSubviews()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    private func addToCart(_ item: DishItem, _ quantity: Int) {
        let dishItem = DishItem(title: item.title,
                                imagePath: item.imagePath,
                                description: item.description,
                                weight: item.weight,
                                kcal: item.kcal,
                                price: item.price,
                                foodCompositions: [.spicyFood],
                                ingredients: [lettuce])
        cartManager.setBasket(array: [CartItem(dishItem: dishItem, quantity: quantity)])
    }

    private func setupSubviews() {
        contentStackView.addArrangedSubview(searchCellDescription)
        contentStackView.addArrangedSubview(price)

        contentView.addSubview(background)
        contentView.addSubview(contentStackView)
    }

    private func setupConstraints() {
        NSLayoutConstraint.activate(
            [
                background.heightAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.heightAnchor),
                background.widthAnchor.constraint(equalTo: background.heightAnchor),
                background.leadingAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.leadingAnchor, constant: 50),
                background.bottomAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.bottomAnchor),

                contentStackView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: Const.cellPadding),
                contentStackView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -Const.cellPadding),
                contentStackView.leftAnchor.constraint(equalTo: background.safeAreaLayoutGuide.rightAnchor, constant: 20)
            ]
        )
    }

    private func setupStyle() {
        contentView.layer.cornerRadius = Const.cellCornerRadius
        contentView.backgroundColor = .white
        layer.cornerRadius = Const.cellCornerRadius
        layer.borderWidth = 0.0
    }

    func setUpSearchCell(item: DishItem) {
        searchCellDescription.text = item.title
        price.text = "$\(item.price.removeZerosFromEnd())"
        background.image = UIImage(named: item.imagePath)
        self.item = item
    }

    override func makeRadioButtonChecked() {
        radioButton.setImage(UIImage(named: "blueCheckMark"), for: .normal)
    }

    override func makeRadioButtonUnChecked() {
        radioButton.setImage(UIImage(named: "uncheckedBox"), for: .normal)
    }
}
