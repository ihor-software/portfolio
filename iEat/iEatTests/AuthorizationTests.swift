//
//  AuthorizationTests.swift
//  iEatTests
//
//  Created by Vladyslav Minhalov on 21.10.2021.
//

import XCTest
@testable import iEat

final class AuthorizationTests: XCTestCase {
    var sut: AuthorizationViewModelType?

    override func setUp() {
        super.setUp()

        sut = AuthorizationViewModel()
    }

    override func tearDown() {
        sut = nil

        super.tearDown()
    }

    func testCorrectTelephoneNumber() {
        // Arrange
        let formattedNumberLength = getFormattedNumberLength()
        let telephoneNumber = "667778899"
        var phoneNumberCount = 0
        let expectation = expectation(description: "correct_number")

        sut?.outputs.bindButtonStateToView = { state in
            if state == .active {
                expectation.fulfill()
            }
        }

        sut?.outputs.bindPhoneNumberToView = { phoneNumber in
            phoneNumberCount = phoneNumber.count
        }

        // Act
        telephoneNumber.forEach {
            sut?.inputs.addToPhoneNumberNewDigit($0.description)
        }

        // Assert
        waitForExpectations(timeout: 10) { error in
            if let error = error {
                XCTFail("Error: \(error.localizedDescription)")
            }
        }

        XCTAssertEqual(phoneNumberCount, formattedNumberLength)
    }

    func testWrongTelephoneNumberByItsShortSize() {
        // Arrange and Assert
        let formattedNumberLength = getFormattedNumberLength()
        let telephoneNumber = "66777889"

        // expected disabled state every time
        sut?.outputs.bindButtonStateToView = { state in
            XCTAssertTrue(state == .disabled)
        }

        // expected less digits than needed in the end of the input
        sut?.outputs.bindPhoneNumberToView = { phoneNumber in
            XCTAssertNotEqual(phoneNumber.count, formattedNumberLength)
        }

        // Act
        telephoneNumber.forEach {
            sut?.inputs.addToPhoneNumberNewDigit($0.description)
        }
    }

    func testWrongTelephoneNumberByItsLongSize() {
        // Arrange
        let formattedNumberLength = getFormattedNumberLength()
        let telephoneNumber = "66777889999999999999999"
        var phoneNumberCount = 0
        let expectation = expectation(description: "short_number")

        sut?.outputs.bindButtonStateToView = { state in
            if state == .active {
                expectation.fulfill()
            }
        }

        // expected formatted number size = 14 in the end of the input
        sut?.outputs.bindPhoneNumberToView = { phoneNumber in
            phoneNumberCount = phoneNumber.count
        }

        // Act
        telephoneNumber.forEach {
            sut?.inputs.addToPhoneNumberNewDigit($0.description)
        }

        // Assert
        waitForExpectations(timeout: 10) { error in
            if let error = error {
                XCTFail("Error: \(error.localizedDescription)")
            }
        }

        XCTAssertNotEqual(phoneNumberCount, formattedNumberLength + 1)
    }

    func testWrongTelephoneNumberByPassingNonDigits() {
        // Arrange and Assert
        let telephoneNumber = "**safsdf--."

        // expected disabled state every time
        sut?.outputs.bindButtonStateToView = { state in
            XCTAssertTrue(state == .disabled)
        }

        // expected formatted number size = 0 every time
        sut?.outputs.bindPhoneNumberToView = { phoneNumber in
            XCTAssertTrue(phoneNumber.isEmpty)
        }

        // Act
        telephoneNumber.forEach {
            sut?.inputs.addToPhoneNumberNewDigit($0.description)
        }
    }

    func testWrongTelephoneNumberByAnswerFromServer() {
        // Act
        if let answer = sut?.outputs.getAnswerFromServer() {
            // Assert
            // expected false answer
            XCTAssertFalse(answer)
        }
    }

    private func getFormattedNumberLength() -> Int {
        guard let maxNumberLength = sut?.outputs.maxNumberLength else { return 0 }

        let charactersToFormatNumberCount = 5

        return maxNumberLength + charactersToFormatNumberCount
    }
}
