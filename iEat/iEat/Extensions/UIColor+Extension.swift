//
//  UIColorExtension.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 27.05.2021.
//

import UIKit

extension UIColor {
    static let iEatBlue = UIColor(red: 0, green: 122, blue: 255, alpha: 1)
    static let iEatGrey = UIColor(red: 196, green: 196, blue: 196, alpha: 1)
    static let iEatLightGrey = UIColor(red: 246, green: 246, blue: 246, alpha: 1)
    static let iEatTextLightGrey = UIColor(red: 151, green: 151, blue: 151, alpha: 1)
    static let iEatSeparator = UIColor(red: 218, green: 218, blue: 218, alpha: 1)
    static let iEatSortingSettingsGray = UIColor(red: 67, green: 67, blue: 67, alpha: 1)
    static let iEatSortingSettingsBlue = UIColor(red: 0, green: 122, blue: 255, alpha: 0.04)
    static let iEatTranslucentBlack = UIColor(red: 0, green: 0, blue: 0, alpha: 0.25)

    convenience init(red: Int = 0, green: Int = 0, blue: Int = 0, alpha: CGFloat = 1) {
        precondition(0...255 ~= red && 0...255 ~= green && 0...255 ~= blue && 0...1 ~= alpha)
        self.init(red: CGFloat(red) / 255,
                  green: CGFloat(green) / 255,
                  blue: CGFloat(blue) / 255,
                  alpha: CGFloat(alpha))
    }
}
