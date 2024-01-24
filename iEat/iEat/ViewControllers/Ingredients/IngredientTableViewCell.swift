//
//  IngredientTableViewCell.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 12.10.2021.
//

import UIKit

final class IngredientTableViewCell: UITableViewCell {
    static let identifier = "ingredientsID"

    private let addedLabel: UILabel = {
        let label = UILabel()
        label.text = "Added"
        label.textColor = .lightGray

        return label
    }()

    func configure(with ingredientName: String,
                   isAdded: Bool,
                   isSelected: Bool) {
        selectionStyle = .none
        textLabel?.text = ingredientName
        textLabel?.textColor = isAdded ? .systemBlue : .black
        isUserInteractionEnabled = isAdded ? false : true
        addedLabel.isHidden = isAdded ? false : true
        accessoryView = isSelected ?
            UIImageView(image: UIImage(systemName: "checkmark")) :
            .none

        setupConstraints()
    }

    private func setupConstraints() {
        addSubview(addedLabel)

        addedLabel.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            addedLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            addedLabel.heightAnchor.constraint(equalToConstant: 22),
            addedLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
            addedLabel.widthAnchor.constraint(equalToConstant: 55)
        ])
    }
}
