//
//  ProductTableViewCell.swift
//  demoSQLite
//
//  Created by Ihor Vasyliev on 19.12.2020.
//  Copyright © 2020 haris. All rights reserved.
//

import UIKit

class ProductTableViewCell: UITableViewCell {

    @IBOutlet weak var productImagelbl: UIView!
    @IBOutlet weak var productImage: UIImageView!
    
    @IBOutlet weak var productModellbl: UILabel!
    @IBOutlet weak var productDescriptionlbl: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    static let identifier = "ProductTableViewCell"

    static func nib() -> UINib {
        return UINib(nibName: "ProductTableViewCell",
                     bundle: nil)
    }

    func configure(with model: Product) {
        self.productModellbl.text = model.Model
        self.productDescriptionlbl.text = model.Description
        let url = model.Image
        if let data = try? Data(contentsOf: URL(string: url)!) {
            self.productImage.image = UIImage(data: data)
        }
    }
    
    
}
