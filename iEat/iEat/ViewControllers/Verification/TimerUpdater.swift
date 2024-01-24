//
//  TimerUpdater.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 19.07.2021.
//

import Foundation

final class TimerUpdater {
    static let shared = TimerUpdater()
    var callback: (Int) -> Void = { _ in }
    private var startTime: CFAbsoluteTime = 0

    private init() {}

    func rememberCurrentTime() {
        startTime = CFAbsoluteTimeGetCurrent()
    }

    func updateTimer() {
        let currentTime = CFAbsoluteTimeGetCurrent()
        let actualRemainingTime = currentTime - startTime

        callback(Int(actualRemainingTime))
    }
}
