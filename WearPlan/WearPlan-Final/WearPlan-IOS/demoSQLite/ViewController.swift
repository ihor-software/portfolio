

import UIKit

public var publicEmail: String = ""


class ViewController: UIViewController {
    
    let db = Databasehandler()
    @IBOutlet weak var lblName: UILabel!
    @IBOutlet weak var lblemail: UITextField!
    @IBOutlet weak var lblpassword: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //lblName.text = "friend"
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func btnUpdateClick(_ sender: Any) {
        self.lblName.text = "Hello, " + publicEmail
    }
    
    @IBAction func loginClicked(_ sender: Any) {
        print(lblemail.text!)
        print(lblpassword.text!)
        
        let ans = db.loginAuthentication(email: lblemail.text!, password: lblpassword.text!)
        if ans {
            let data = db.executeSelect(email: lblemail.text!, password: lblpassword.text!)
            print(data.email)
            print(data.password)
            publicEmail = data.email
            //lblName.text = data.email
            User.UserMail = data.email
            self.performSegue(withIdentifier: "helloPage", sender: self)
            
            
        }
        else{
            print("invalid")
        }
    }
    
    
    
}

