//
//  loginCustomer.swift
//  demoSQLite
//
//  Created by Ihor Vasyliev on 10.01.2021.
//  Copyright © 2021 haris. All rights reserved.
//

import UIKit

class loginCustomer: UIViewController {
    let db = Databasehandler()
    @IBOutlet weak var lblemail: UITextField!
    @IBOutlet weak var lblpassword: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    @IBAction func loginClicked(_ sender: Any) {
        print(lblemail.text!)
        print(lblpassword.text!)
        
        let ans = db.loginAuthenticationCustomer(email: lblemail.text!, password: lblpassword.text!)
        if ans {
            let data = db.executeSelectCustomer(email: lblemail.text!, password: lblpassword.text!)
            print(data.email)
            print(data.password)
            publicEmail = data.email
            //lblName.text = data.email
            User.UserMail = data.email
            print(User.UserMail)
            self.performSegue(withIdentifier: "helloPageCustomer", sender: self)
            
        }
        else{
            print("invalid")
        }
    }
    
    
}
