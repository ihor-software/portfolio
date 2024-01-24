//
//  String+Extension.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/21/21.
//

import Foundation

extension String {
    func grouping(every groupSize: String.IndexDistance, with separator: Character) -> String {
        let cleanedUpCopy = replacingOccurrences(of: String(separator), with: "")
        return String(cleanedUpCopy.enumerated().map {
            $0.offset % groupSize == 0 ? [separator, $0.element] : [$0.element]
        }.joined().dropFirst())
    }
}
