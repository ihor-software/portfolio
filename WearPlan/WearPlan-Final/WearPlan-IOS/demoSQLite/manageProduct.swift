import UIKit
@testable import demoSQLite

class manageProduct: UIViewController, UITextFieldDelegate, UITableViewDelegate, UITableViewDataSource {
    let db = Databasehandler()
    var products = [Product]()
    @IBOutlet weak var table: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        table.register(ProductTableViewCell.nib(), forCellReuseIdentifier: ProductTableViewCell.identifier)
        table.delegate = self
        table.dataSource = self
        
        //products.append(db.executeSelectProduct())
    }
    
    @IBAction func loadClick(_ sender: Any) {
        products = db.executeSelectProductManage(email: User.UserMail)
        DispatchQueue.main.async {
            self.table.reloadData()
        }
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return products.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: ProductTableViewCell.identifier, for: indexPath) as! ProductTableViewCell
        cell.configure(with: products[indexPath.row])
        return cell
    }


    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 120
    }

}



struct Product {
    var Model = ""
    var Description = ""
    var Image = ""
    var Top = 0

    private enum CodingKeys: String, CodingKey {
        case Model, Description, Image, Top
    }
}

  

