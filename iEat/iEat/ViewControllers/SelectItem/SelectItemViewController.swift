//
//  SelectItemViewController.swift
//  iEat
//
//  Created by Ihor Vasyliev on 16.09.2021.
//

import UIKit

final class SelectItemViewController: UIViewController {
    private enum Const {
        static let contentToSideDistance: CGFloat = 16
        static let cellPadding: CGFloat = 3
    }

    private lazy var tableview = UITableView()

    private var cartManager: CartManager {
         DIContainer.shared.resolve(type: CartManager.self)
     }

    private var deleteButton: IEatButton = {
        let button = IEatButton()
        button.setTitle("Delete items", for: .normal)
        button.addTarget(self, action: #selector(deleteButtonTapped), for: .touchUpInside)
        return button
    }()

    let viewModel: SelectItemViewModelType

    init(viewModel: SelectItemViewModelType) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white

        setupNavigationController()
        setupTableView()
        setupSubviews()
        setupConstraints()

    }

    private func setupNavigationController() {
        navigationItem.title = "Cart"
    }

    private func setupTableView() {
        tableview.separatorStyle = .none
        tableview.delegate = self
        tableview.dataSource = self
        tableview.register(SelectItemCell.self, forCellReuseIdentifier: "SelectItemCell")
    }

    @objc private func deleteButtonTapped() {
        for index in 0...tableview.numberOfRows(inSection: 0) {
            guard let cell = tableview.cellForRow(at: IndexPath(row: index, section: 0)) as? SelectItemCell else { return }
            if viewModel.inputs.selectedCells.contains(CartItem(dishItem: cell.item)) {
                cartManager.setBasket(array: [CartItem(dishItem: cell.item, quantity: 0)])
                tableview.reloadData()
            }
        }
        present(RemoveItemAlertController(), animated: false, completion: nil)
    }

    private func setupSubviews() {
        view.addSubview(deleteButton)
        view.addSubview(tableview)
    }

    private func setupConstraints() {
        tableview.translatesAutoresizingMaskIntoConstraints = false
        deleteButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                tableview.topAnchor.constraint(equalTo: view.topAnchor, constant: 50),
                tableview.leftAnchor.constraint(equalTo: view.leftAnchor),
                tableview.rightAnchor.constraint(equalTo: view.rightAnchor),
                tableview.bottomAnchor.constraint(equalTo: deleteButton.topAnchor),

                deleteButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -Const.contentToSideDistance),
                deleteButton.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                deleteButton.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -Const.contentToSideDistance)
            ]
        )
    }
}

extension SelectItemViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 54
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let cell = tableView.cellForRow(at: indexPath) as? SelectItemCell else { return }
        viewModel.inputs.selectedCells.append(CartItem(dishItem: cell.item))
        tableView.reloadData()
    }
}

extension SelectItemViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return cartManager.getBasket().count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cartItem = cartManager.getBasket()[indexPath.row].dishItem
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "SelectItemCell",
                                                       for: indexPath) as? SelectItemCell else { return UITableViewCell() }
        cell.setUpSearchCell(item: cartItem)
        if viewModel.inputs.selectedCells.contains(CartItem(dishItem: cartItem)) {
            cell.makeRadioButtonChecked()
        } else {
            cell.makeRadioButtonUnChecked()
        }
        cell.contentView.backgroundColor = .white
        cell.selectionStyle = .none
        return cell
    }
}
