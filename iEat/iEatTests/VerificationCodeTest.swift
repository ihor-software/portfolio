//
//  VerificationCodeTest.swift
//  iEatTests
//
//  Created by Vladyslav Minhalov on 21.10.2021.
//

import XCTest
@testable import iEat

final class VerificationCodeTest: XCTestCase {
    var sut: VerificationViewModelType?

    override func setUp() {
        super.setUp()

        sut = VerificationViewModel(phoneNumber: "+380 (99) 999-99-99")
    }

    override func tearDown() {
        sut = nil

        super.tearDown()
    }

    func testCorrectVerificationCode() {
        // Arrange and Assert
        // expected verified state
        sut?.outputs.bindCodeStateToView = { state in
            XCTAssertTrue(state == .verified)
        }

        // Act
        sut?.inputs.verify(enteredPasscode: "5432")
    }

    func testWrongVerificationCodeByWrongDigits() {
        // Arrange and Assert
        // expected invalid state
        sut?.outputs.bindCodeStateToView = { state in
            XCTAssertTrue(state == .invalid)
        }
        
        // Act
        sut?.inputs.verify(enteredPasscode: "1111")
    }

    func testWrongVerificationCodeByPassingNonDigits() {
        // Arrange and Assert
        // expected invalid state
        sut?.outputs.bindCodeStateToView = { state in
            XCTAssertTrue(state == .invalid)
        }

        // Act
        sut?.inputs.verify(enteredPasscode: "543.")
    }

    func testWrongVerificationCodeByAnswerFromServer() {
        // Act
        if let answer = sut?.outputs.getAnswerFromServer() {
            // Assert
            // expected false answer
            XCTAssertFalse(answer)
        }
    }
}
