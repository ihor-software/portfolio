//
//  CustomerProfile.swift
//  demoSQLite
//
//  Created by Ihor Vasyliev on 10.01.2021.
//  Copyright © 2021 haris. All rights reserved.
//

import UIKit


class CustomerProfile: UIViewController {
    @IBOutlet weak var email: UILabel!
    @IBOutlet weak var qr: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        email.text = String(User.UserMail)
        let qrImg = generateQRCode(from: String(User.UserMail))
        qr.image = qrImg
    }
    
    func generateQRCode(from string: String) -> UIImage? {
        let data = string.data(using: String.Encoding.ascii)

        if let filter = CIFilter(name: "CIQRCodeGenerator") {
            filter.setValue(data, forKey: "inputMessage")
            let transform = CGAffineTransform(scaleX: 3, y: 3)

            if let output = filter.outputImage?.transformed(by: transform) {
                return UIImage(ciImage: output)
            }
        }

        return nil
    }
    
}
