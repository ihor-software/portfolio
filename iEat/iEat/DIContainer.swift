//
//  DIContainer.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 26.07.2021.
//

import Foundation

protocol DIContainerProtocol: AnyObject {
    func register<Component>(type: Component.Type, component: Any)
    func resolve<Component>(type: Component.Type) -> Component
}

final class DIContainer: DIContainerProtocol {
    static let shared = DIContainer()

    var components: [String: Any] = [:]

    private init() {}

    func register<Component>(type: Component.Type, component: Any) {
        components["\(type)"] = component
    }

    func resolve<Component>(type: Component.Type) -> Component {
        // swiftlint:disable force_cast
        return components["\(type)"] as! Component
    }
}
