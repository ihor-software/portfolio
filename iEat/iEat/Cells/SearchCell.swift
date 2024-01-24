//
//  SearchCell.swift
//  iEat
//
//  Created by Igor Vasyliev on 6/18/21.
//

import UIKit

final class SearchCell: UICollectionViewCell {
    private enum Const {
        static let descriptionFontSize: CGFloat = 12
        static let titleFontSize: CGFloat = 16
        static let cellCornerRadius: CGFloat = 12
        static let cellPadding: CGFloat = 12
        static let buttonSize: CGFloat = 50
        static let buttonImageName = "cart"
    }

    static let identifier = "SearchCell"

    private let titleView = UIView()

    private var searchCellDescription: UILabel = {
        let descriptionLbl = UILabel()
        descriptionLbl.textColor = .lightGray
        descriptionLbl.font = descriptionLbl.font.withSize(Const.descriptionFontSize)
        descriptionLbl.numberOfLines = 0
        descriptionLbl.translatesAutoresizingMaskIntoConstraints = false

        return descriptionLbl
    }()

    private var title: UILabel = {
        let titleLbl = UILabel()
        titleLbl.textColor = .black
        titleLbl.font = titleLbl.font.withSize(Const.titleFontSize)
        titleLbl.numberOfLines = 0
        titleLbl.lineBreakMode = .byWordWrapping
        titleLbl.translatesAutoresizingMaskIntoConstraints = false

        return titleLbl
    }()

    private var price: UILabel = {
        let priceLbl = UILabel()
        priceLbl.textColor = .black
        priceLbl.font = priceLbl.font.withSize(20)
        priceLbl.translatesAutoresizingMaskIntoConstraints = false

        return priceLbl
    }()

    private var background: UIImageView = {
        let backgroundImageView = UIImageView()
        backgroundImageView.translatesAutoresizingMaskIntoConstraints = false
        backgroundImageView.contentMode = .scaleAspectFill
        backgroundImageView.clipsToBounds = true
        backgroundImageView.layer.cornerRadius = Const.cellCornerRadius
        backgroundImageView.layer.maskedCorners = [.layerMinXMinYCorner, .layerMinXMaxYCorner]

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

    private var button: UIButton = {
        let shopButton = UIButton()
        shopButton.backgroundColor = UIColor(red: 0.0,
                                             green: 122.0 / 255.0,
                                             blue: 225.0 / 255.0,
                                             alpha: 1.0)
        shopButton.tintColor = .white
        let image = UIImage(systemName: Const.buttonImageName)
        shopButton.setImage(image, for: .normal)

        shopButton.layer.cornerRadius = 14
        shopButton.translatesAutoresizingMaskIntoConstraints = false

        return shopButton
    }()

    override init(frame: CGRect) {
        super.init(frame: .zero)
        setupStyle()
        setupSubviews()
        setupConstraints()

    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    private func setupSubviews() {
        titleView.addSubview(title)

        contentStackView.addArrangedSubview(titleView)
        contentStackView.addArrangedSubview(searchCellDescription)
        contentStackView.addArrangedSubview(price)

        contentView.addSubview(background)
        contentView.addSubview(contentStackView)
        contentView.addSubview(button)
    }

    private func setupConstraints() {
        NSLayoutConstraint.activate(
            [
                background.heightAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.heightAnchor),
                background.widthAnchor.constraint(equalTo: background.heightAnchor),
                background.leadingAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.leadingAnchor),
                background.bottomAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.bottomAnchor),

                contentStackView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: Const.cellPadding),
                contentStackView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -Const.cellPadding),
                contentStackView.leftAnchor.constraint(equalTo: background.safeAreaLayoutGuide.rightAnchor, constant: Const.cellPadding),
                contentStackView.rightAnchor.constraint(equalTo: button.leftAnchor, constant: -20),

                button.rightAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.rightAnchor, constant: -8),
                button.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
                button.widthAnchor.constraint(equalToConstant: Const.buttonSize),
                button.heightAnchor.constraint(equalToConstant: Const.buttonSize),

                title.widthAnchor.constraint(equalTo: contentStackView.widthAnchor)
            ]
        )
    }

    private func setupStyle() {
        contentView.layer.cornerRadius = Const.cellCornerRadius
        contentView.backgroundColor = .white

        layer.cornerRadius = Const.cellCornerRadius
        layer.borderWidth = 0.0
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowOffset = CGSize(width: 0, height: 5)
        layer.shadowRadius = 8.0
        layer.shadowOpacity = 0.1
        layer.masksToBounds = false
    }

    func setUpSearchCell(title: String, gram: String, kcal: String, price: String, backgroundImageName: String) {
        self.searchCellDescription.text = "\(gram)g | \(kcal) kcal"
        self.title.text = title
        self.price.text = price
        background.image = UIImage(named: backgroundImageName)
    }
}
