

import UIKit

class registerVC: UIViewController {

    @IBOutlet weak var lblName: UITextField!
    @IBOutlet weak var lblEmail: UITextField!
    @IBOutlet weak var lblpassword: UITextField!
    
    let db = Databasehandler()
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func registerClick(_ sender: Any) {
        if lblEmail.text! != "" && lblpassword.text! != ""{
            var q = "insert into Client(email,password) values ('"+lblEmail.text!+"' , '"+lblpassword.text!+"')"
            let result = db.executeQuery(query: q)
            
            if result{
                self.performSegue(withIdentifier: "loginPage", sender: self)
            }
            else{
                print("Data not Added")
            }
        }
        
    }
    
  
}
