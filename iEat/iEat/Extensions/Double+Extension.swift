//
//  Double+Extension.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 17.08.2021.
//

import Foundation

extension Double {
    func removeZerosFromEnd() -> String {
        return String(format: "%g", self)
    }
}
