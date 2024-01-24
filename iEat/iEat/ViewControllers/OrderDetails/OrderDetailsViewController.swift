//
//  OrderDetailsViewController.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/15/21.
//

import UIKit

final class OrderDetailsViewController: UIViewController {
    private enum Const {
        static let contentToSideDistance: CGFloat = 16
    }

    private var paymentItemsArray = ["Add address", "+44 (33) 748-55-44", "As soon as possible", "Cash"]
    private var emojiArray = ["📱", "🚗", "💸"]

    private lazy var tableview = UITableView()

    private var button: IEatButtonWithPrice = {
        let button = IEatButtonWithPrice(price: 90.0)
        button.setTitle("Order", for: .normal)
        button.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        return button
    }()

    private var cardTitle: UILabel = {
        let title = UILabel()
        title.text = "Order details"
        title.font = UIFont.boldSystemFont(ofSize: 34.0)
        return title
    }()
    
    private let viewModel: OrderDetailsViewModelType
    
    init(with viewModel: OrderDetailsViewModelType) {
        self.viewModel = viewModel

        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        tableview.delegate = self
        tableview.dataSource = self
        setupSubviews()
        setupConstraints()
    }

    @objc private func buttonAction() {
        navigationController?.pushViewController(OrderPlacedViewController(), animated: true)
    }

    private func setupSubviews() {
        view.addSubview(cardTitle)
        view.addSubview(button)
        view.addSubview(tableview)
    }

    private func setupConstraints() {
        cardTitle.translatesAutoresizingMaskIntoConstraints = false
        tableview.translatesAutoresizingMaskIntoConstraints = false
        button.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                cardTitle.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 15),
                cardTitle.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),

                tableview.topAnchor.constraint(equalTo: cardTitle.bottomAnchor),
                tableview.leftAnchor.constraint(equalTo: view.leftAnchor),
                tableview.rightAnchor.constraint(equalTo: view.rightAnchor),
                tableview.bottomAnchor.constraint(equalTo: button.topAnchor),

                button.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -Const.contentToSideDistance),
                button.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                button.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -Const.contentToSideDistance)
            ]
        )
    }
}

extension OrderDetailsViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 76
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        viewModel.inputs.navigateSelectionScreen(row: indexPath.row)
    }
}

extension OrderDetailsViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return paymentItemsArray.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = OrderDetailsCell()
        cell.selectionStyle = .none
        let text = paymentItemsArray[indexPath.row]
        cell.addText(text: text)

        if indexPath.row == 0 {
            cell.setTextColor(color: .systemBlue)
            let image = UIImage(systemName: "plus")
            let imageView = UIImageView(frame: CGRect(x: 0, y: 5, width: 20, height: 18))
            imageView.image = image
            cell.addLeftView(accessory: imageView)
        } else {
            let label = UILabel(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
            label.text = emojiArray[indexPath.row - 1]
            cell.addLeftView(accessory: label)
        }
        return cell
    }
}
