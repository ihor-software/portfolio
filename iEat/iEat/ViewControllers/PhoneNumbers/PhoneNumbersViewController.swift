//
//  PhoneNumbersViewController.swift
//  iEat
//
//  Created by Ihor Vasyliev on 26.08.2021.
//

import UIKit

final class PhoneNumbersMethodViewController: UIViewController {
    private enum Const {
        static let contentToSideDistance: CGFloat = 16
        static let phoneNumberKey = "phoneNumbersStore"
        static let addNewCardText = "Add new phone"
        static let cashText = "+38 (097) 746-45-33"
    }

    private lazy var tableview = UITableView()

    private var button: IEatButton = {
        let button = IEatButton()
        button.setTitle("Done", for: .normal)
        button.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        return button
    }()

    private var cardTitle: UILabel = {
        let title = UILabel()
        title.text = "Phone"
        title.font = UIFont.boldSystemFont(ofSize: 34.0)
        return title
    }()

    private var cardDescription: UILabel = {
        let title = UILabel()
        title.text = "Your Phone Numbers"
        title.font = UIFont.boldSystemFont(ofSize: 18.0)
        return title
    }()

    let viewModel: PhoneNumbersViewModelType

    init(with viewModel: PhoneNumbersViewModelType) {
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
        tableview.separatorStyle = .none

        setupSubviews()
        setupConstraints()
        setupBindings()
    }

    override func viewWillAppear(_ animated: Bool) {

    }

    @objc private func buttonAction() {
        let index = viewModel.outputs.selectedIndex
        guard let cell = tableView(tableview, cellForRowAt: IndexPath(row: index, section: 0)) as? RadioButtonCell else { return }
        OrderDetails.shared.phone = cell.getText()
        navigationController?.popViewController(animated: true)
    }

    private func setupBindings() {
        viewModel.outputs.reloadTableView = { [weak self] in
            self?.tableview.reloadData()
        }
    }

    private func setupSubviews() {
        view.addSubview(cardTitle)
        view.addSubview(cardDescription)
        view.addSubview(button)
        view.addSubview(tableview)
    }

    private func setupConstraints() {
        cardTitle.translatesAutoresizingMaskIntoConstraints = false
        cardDescription.translatesAutoresizingMaskIntoConstraints = false
        tableview.translatesAutoresizingMaskIntoConstraints = false
        button.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                cardTitle.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 15),
                cardTitle.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),

                cardDescription.topAnchor.constraint(equalTo: cardTitle.bottomAnchor, constant: 30),
                cardDescription.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),

                tableview.topAnchor.constraint(equalTo: cardDescription.bottomAnchor),
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

extension PhoneNumbersMethodViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 76
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        viewModel.outputs.selectedIndex = indexPath.row
        tableview.reloadData()
        if indexPath.row == viewModel.outputs.paymentItemsArray.count - 1 {
            let newCardVC = NewPhoneViewController(with: NewPhoneViewModel())
            present(newCardVC, animated: false, completion: nil)
            newCardVC.isDismissed = { [weak self] in
                self?.setupBindings()
                self?.tableview.reloadData()
            }
        }
    }
}

extension PhoneNumbersMethodViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.outputs.paymentItemsArray.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = RadioButtonCell()
        cell.selectionStyle = .none
        let cardNumberText = viewModel.outputs.paymentItemsArray[indexPath.row]
        let text = viewModel.inputs.makeCardNumberMasked(cardNumber: cardNumberText)
        cell.addText(text: text)

        if indexPath.row == viewModel.outputs.paymentItemsArray.count - 1 {
            cell.setTextColor(color: .systemBlue)
            let image = UIImage(systemName: "plus")
            let imageView = UIImageView(frame: CGRect(x: 0, y: 5, width: 20, height: 18))
            imageView.image = image
            cell.addLeftView(accessory: imageView)
            return cell
        }
        if indexPath.row == viewModel.outputs.selectedIndex {
            cell.makeRadioButtonChecked()
        } else {
            cell.makeRadioButtonUnChecked()
        }
        return cell
    }
}
