

import UIKit

class addProduct: UIViewController {

    
    @IBOutlet weak var lblCategory: UITextField!
    @IBOutlet weak var lblModel: UITextField!
    @IBOutlet weak var lblSize: UITextField!
    @IBOutlet weak var lblSex: UITextField!
    @IBOutlet weak var lblImage: UITextField!
    @IBOutlet weak var lblPrice: UITextField!
    @IBOutlet weak var lblDescription: UITextField!
    @IBOutlet weak var lblSpecs: UITextField!
    @IBOutlet weak var lblBrand: UITextField!
    @IBOutlet weak var lblDiscount: UITextField!
    @IBOutlet weak var lblCode: UITextField!
    
    let db = Databasehandler()
    var mail = User.UserMail
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    @IBAction func addClick(_ sender: Any) {
        
        if lblCategory.text! != "" && lblModel.text! != "" && lblSize.text! != "" && lblSex.text! != "" && lblModel.text! != "" && lblImage.text! != "" && lblPrice.text! != "" && lblDescription.text! != "" && lblSpecs.text! != "" && lblBrand.text! != "" && lblDiscount.text! != ""{
            
            
            let q1 = "insert into Product(category,model,size, sex, image, price, description, specs, brand, client, discount, code) values ('"+lblCategory.text!+"' , '"+lblModel.text!+"' , '"+lblSize.text!+"', '"+lblSex.text!+"', '"+lblImage.text!+"', "+lblPrice.text!+", '"+lblDescription.text!+"', '"+lblSpecs.text!+"', '"+lblBrand.text!+""
            
            let q2 = "', '" + mail + "', "+lblDiscount.text!+", "+lblCode.text!+")"
            
            let q3 = q1 + q2
            
            let result = db.executeQuery(query: q3)
            
            if result{
                self.performSegue(withIdentifier: "helloPage2", sender: self)
            }
            else{
                print("Data not Added")
            }
    }
    
    
        
    }
    
  
}
