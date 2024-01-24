//
//  CategoryCollectionViewCell.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 29.06.2021.
//

import UIKit

final class CategoryCollectionViewCell: UICollectionViewCell {
    // MARK: - Static Properties

    static let identifier = "CategoryCell"

    // MARK: - Internal Properties

    var categoryModel: CategoryCellViewModel? {
        didSet {
            categoryName.text = categoryModel?.category.name

            switch categoryModel?.state {
            case .normal:
                self.layer.backgroundColor = CategoryState.normal.backgroundColor?.cgColor
                categoryName.textColor = CategoryState.normal.textColor
            case .selected:
                self.layer.backgroundColor = CategoryState.selected.backgroundColor?.cgColor
                categoryName.textColor = CategoryState.selected.textColor
            case .none:
                break
            }
        }
    }

    // MARK: - Self-executing closures

    private lazy var categoryName: UILabel = {
        let categoryName = UILabel()
        categoryName.font = .iEatCategoriesFont
        categoryName.textAlignment = .center

        return categoryName
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)

        contentView.clipsToBounds = true
        contentView.addSubview(categoryName)
        layer.borderColor = UIColor(red: 0, green: 122, blue: 255, alpha: 1).cgColor
        layer.borderWidth = 2
        setupConstraints()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        layer.cornerRadius = 0.5 * bounds.height
    }

    // MARK: - Private Methods

    private func setupConstraints() {
        categoryName.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            categoryName.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
            categoryName.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            categoryName.heightAnchor.constraint(equalTo: contentView.heightAnchor),
            categoryName.widthAnchor.constraint(equalTo: contentView.widthAnchor)
        ])
    }
}
