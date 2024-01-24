//
//  RadioButtonCell.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/8/21.
//

import UIKit

class RadioButtonCell: OrderCell {
    private enum Const {
        static let uncheckedColor = UIColor(red: 246, green: 246, blue: 246, alpha: 1)
        static let checkedColor = UIColor(red: 0, green: 122, blue: 255, alpha: 0.08)
    }

    lazy var radioButton = UIButton()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        addLeftView(accessory: radioButton)
        setupConstraints()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    func makeRadioButtonChecked() {
        radioButton.setImage(UIImage(named: "radioButtonChecked"), for: .normal)
        contentView.backgroundColor = Const.checkedColor
    }

    func makeRadioButtonUnChecked() {
        radioButton.setImage(UIImage(named: "radioButtonUnchecked"), for: .normal)
        contentView.backgroundColor = Const.uncheckedColor
    }

    private func setupConstraints() {
        radioButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                radioButton.widthAnchor.constraint(equalToConstant: 30),
                radioButton.heightAnchor.constraint(equalToConstant: 30)
            ]
        )
    }
}
