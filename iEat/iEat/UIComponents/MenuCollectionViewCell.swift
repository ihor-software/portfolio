//
//  MenuCollectionViewCell.swift
//  iEat
//
//  Created by Macbook on 06.06.2021.
//

import UIKit

class MenuCollectionViewCell: UICollectionViewCell {
    override init(frame: CGRect) {
        super.init(frame: frame)
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowOffset = CGSize(width: 12, height: 24)
        layer.shadowOpacity = 0.06
        layer.cornerRadius = 12
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
