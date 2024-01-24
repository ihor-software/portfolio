//
//  OrderDetailsCell.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/15/21.
//

import UIKit

class OrderDetailsCell: OrderCell {
    private var arrowView: UIImageView = {
        let view = UIImageView(image: UIImage(systemName: "chevron.right"))
        view.tintColor = .black
        return view
    }()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        contentView.addSubview(arrowView)
        setupConstraints()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    private func setupConstraints() {
        arrowView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                arrowView.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
                arrowView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -15),
                arrowView.widthAnchor.constraint(equalToConstant: 11),
                arrowView.heightAnchor.constraint(equalToConstant: 17)
            ]
        )
    }
}
