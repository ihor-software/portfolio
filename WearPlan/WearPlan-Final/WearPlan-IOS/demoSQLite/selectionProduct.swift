import UIKit
class selectionProduct: UIViewController, UITextFieldDelegate, UITableViewDelegate, UITableViewDataSource {
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
        //products = db.executeSelectProduct()
        let selection = db.executeSelectProductTop()
        let unique = selection.unique()
        print(unique)
        for element in unique {
            let product = db.executeSelectProductById(id: element)
            products.append(product)
        }
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


extension Sequence where Iterator.Element: Hashable {
    func unique() -> [Iterator.Element] {
        var seen: [Iterator.Element: Bool] = [:]
        return self.filter { seen.updateValue(true, forKey: $0) == nil }
    }
}


  

