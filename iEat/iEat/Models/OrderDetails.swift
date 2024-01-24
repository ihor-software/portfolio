//
//  OrderDetails.swift
//  iEat
//
//  Created by Ihor on 03.11.2021.
//

import Foundation

struct OrderDetails {
    static var shared = OrderDetails()
    var adress = ""
    var phone = ""
    var time = ""
    var payment = ""
}
