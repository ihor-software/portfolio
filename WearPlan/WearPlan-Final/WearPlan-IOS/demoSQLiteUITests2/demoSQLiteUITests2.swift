//
//  demoSQLiteUITests2.swift
//  demoSQLiteUITests2
//
//  Created by Ihor Vasyliev on 28.12.2020.
//  Copyright © 2020 haris. All rights reserved.
//

import XCTest

class demoSQLiteUITests2: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() throws {
        // UI tests must launch the application that they test.
        let app = XCUIApplication()
        app.launch()

        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }

    func testLaunchPerformance() throws {
        if #available(macOS 10.15, iOS 13.0, tvOS 13.0, *) {
            // This measures how long it takes to launch your application.
            measure(metrics: [XCTApplicationLaunchMetric()]) {
                XCUIApplication().launch()
            }
        }
    }
    
    func testLogin() {
        let app = XCUIApplication()
        app.launch()
        //app.textFields["UsernameTextField"].tap()
        let usernameField = app.textFields["UsernameTextField"]
        XCTAssertTrue(usernameField.exists)
        usernameField.tap()
        usernameField.typeText("vasilyev.igor17@gmail.com")
        
        let passwordField = app.textFields["PasswordTextField"]
        XCTAssertTrue(passwordField.exists)
        passwordField.tap()
        
        passwordField.typeText("1234")
        app.buttons["SignInButton"].tap()
        app.buttons["manageButton"].tap()
        app.buttons["updateButton"].tap()
        sleep(5)
        app.swipeUp()
        sleep(5)
 
    }
}
