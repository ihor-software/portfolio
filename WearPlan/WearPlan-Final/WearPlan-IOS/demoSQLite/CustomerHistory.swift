//
//  CustomerHistory.swift
//  demoSQLite
//
//  Created by Ihor Vasyliev on 10.01.2021.
//  Copyright © 2021 haris. All rights reserved.
//

import UIKit

class CustomerHistory: UIViewController, UITableViewDelegate, UITableViewDataSource {
    let db = Databasehandler()
    var products = [Product]()

    @IBOutlet weak var table: UITableView!
    override func viewDidLoad() {
        super.viewDidLoad()
        table.register(ProductTableViewCell.nib(), forCellReuseIdentifier: ProductTableViewCell.identifier)
        table.delegate = self
        table.dataSource = self
    }
    @IBAction func loadClick(_ sender: Any) {
        let ids = db.customerHistory(idCustomer: User.UserMail)
        print(ids)
        var p = Product()
        for id in ids {
            print(id)
            p = db.executeSelectProductById(id: id)
            products.append(p)
        }
        //products = db.executeSelectProduct()
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
