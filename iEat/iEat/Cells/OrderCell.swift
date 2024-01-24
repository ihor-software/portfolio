//
//  OrderCell.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/8/21.
//

import UIKit

class OrderCell: UITableViewCell {
    private enum Const {
        static let cellColor = UIColor(red: 246, green: 246, blue: 246, alpha: 1)
    }

    private lazy var leftView = UIView()
    private(set) lazy var cellText = UILabel()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupStyle()
        setupSubviews()
        setupConstraints()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    func addLeftView(accessory: UIView) {
        leftView.addSubview(accessory)
    }

    func addText(text: String) {
        cellText.text = text
    }
    
    func getText() -> String {
        return cellText.text ?? ""
    }

    func setTextColor(color: UIColor) {
        cellText.textColor = color
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        contentView.frame = contentView.frame.inset(by: UIEdgeInsets(top: 8, left: 16, bottom: 8, right: 16))
    }

    private func setupStyle() {
        contentView.layer.cornerRadius = 15
        contentView.backgroundColor = Const.cellColor
    }

    private func setupConstraints() {
        leftView.translatesAutoresizingMaskIntoConstraints = false
        cellText.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                leftView.widthAnchor.constraint(equalToConstant: 30),
                leftView.heightAnchor.constraint(equalToConstant: 30),
                leftView.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
                leftView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 15),

                cellText.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
                cellText.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 50),
                cellText.widthAnchor.constraint(equalTo: contentView.widthAnchor, multiplier: 0.8)
            ]
        )
    }

    private func setupSubviews() {
        contentView.addSubview(leftView)
        contentView.addSubview(cellText)
    }
}
