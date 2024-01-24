//
//  VerificationViewModel.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 17.06.2021.
//

import Foundation

enum CodeState {
    case normal, verified, invalid
}

protocol VerificationViewModelType: AnyObject {
    var inputs: VerificationViewModelInputs { get }
    var outputs: VerificationViewModelOutputs { get }
}

protocol VerificationViewModelInputs: AnyObject {
    func startTimer()
    func verify(enteredPasscode: String)
    func stopTimer()
    func setupInitialPhoneNumber()
}

protocol VerificationViewModelOutputs: AnyObject {
    var bindPhoneNumberToView: (String) -> Void { get set }
    var bindCodeStateToView: (CodeState) -> Void { get set }
    var bindSecondsToView: (String) -> Void { get set }

    func getAnswerFromServer() -> Bool
}

final class VerificationViewModel: VerificationViewModelType,
                                   VerificationViewModelInputs,
                                   VerificationViewModelOutputs {
    var coordinator: AuthorizationFlowCoordinator?

    var inputs: VerificationViewModelInputs { return self }
    var outputs: VerificationViewModelOutputs { return self }

    var bindPhoneNumberToView: (String) -> Void = { _ in }
    var bindCodeStateToView: (CodeState) -> Void = { _ in }
    var bindSecondsToView: (String) -> Void = { _  in }

    private let timerUpdater = TimerUpdater.shared
    private var timer = Timer()
    private var phoneNumber = ""
    private var passcode = ""

    private var seconds = 29 {
        didSet {
            let lessThenTen = seconds < 10
            let correctSecondsFormat = lessThenTen ? "0\(seconds)" : "\(seconds)"

            bindSecondsToView(correctSecondsFormat)
        }
    }

    private var phoneNumberForView = "" {
        didSet {
            bindPhoneNumberToView(phoneNumberForView)
        }
    }

    private var codeState: CodeState = .normal {
        didSet {
            bindCodeStateToView(codeState)
        }
    }

    init(phoneNumber: String) {
        self.phoneNumber = phoneNumber

        setupDefaultPasscode()
        setupTimerUpdaterCallback()
    }

    private func setupTimerUpdaterCallback() {
        timerUpdater.callback = { [weak self] secondsCountInBackground in
            guard let secondsCountInForeground = self?.seconds else { return }

            let correctSecondsForTimer = secondsCountInForeground - secondsCountInBackground

            self?.seconds = correctSecondsForTimer < 1 ? 0 : correctSecondsForTimer
        }
    }

    private func setupDefaultPasscode() {
        passcode = "5432"
    }

    func setupInitialPhoneNumber() {
        phoneNumberForView = phoneNumber
    }

    func verify(enteredPasscode: String) {
        if enteredPasscode == passcode {
            codeState = .verified

            DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                self.coordinator?.finish()
            }
        } else {
            codeState = .invalid
        }
    }

    func startTimer() {
        seconds = 30

        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            guard let self = self else { return }

            self.seconds > 1 ? self.seconds -= 1 : self.stopTimer()
        }
    }

    func stopTimer() {
        timer.invalidate()

        seconds = 0
    }

    func getAnswerFromServer() -> Bool {
        return false
    }
}
