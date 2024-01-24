//
//  AddressSelectionViewController.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 27.07.2021.
//

import UIKit

final class AddressSelectionViewController: UIViewController {
    private let spacing: CGFloat = 16
    private var selectedCell: RadioButtonCell?
    private lazy var tableview = UITableView()
    let viewModel: AddressSelectionViewModelType

    private var doneButton: IEatButton = {
        let button = IEatButton()
        button.setTitle("Done", for: .normal)
        button.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        return button
    }()

    private var addressTitle: UILabel = {
        let title = UILabel()
        title.text = "Address"
        title.font = UIFont.boldSystemFont(ofSize: 34.0)
        return title
    }()

    init(with viewModel: AddressSelectionViewModelType) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
        var yourAddressesArray = ["Home"]
        yourAddressesArray.append("Add new")
        viewModel.outputs.items.append(Sections(name: "Your Adresses", objects: yourAddressesArray))
        viewModel.outputs.items.append(Sections(name: "Pick Up Point", objects: ["Moscow, Pokrovka str. , 21"]))
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

        setupAddressTitleConstraints()
        setupDoneButtonConstraints()
        setupTableviewConstraints()
    }

    private func setupAddressTitleConstraints() {
        view.addSubview(addressTitle)
        addressTitle.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            addressTitle.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 15),
            addressTitle.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor,
                                                  constant: spacing)
        ])
    }

    private func setupDoneButtonConstraints() {
        view.addSubview(doneButton)
        doneButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            doneButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor,
                                               constant: -spacing),
            doneButton.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor,
                                                constant: spacing),
            doneButton.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor,
                                                 constant: -spacing)
        ])
    }

    private func setupTableviewConstraints() {
        view.addSubview(tableview)
        tableview.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            tableview.topAnchor.constraint(equalTo: addressTitle.bottomAnchor),
            tableview.leftAnchor.constraint(equalTo: view.leftAnchor),
            tableview.rightAnchor.constraint(equalTo: view.rightAnchor),
            tableview.bottomAnchor.constraint(equalTo: doneButton.topAnchor)
        ])
    }

    @objc private func buttonAction() {
        guard let adress = selectedCell?.getText() else { return }
        OrderDetails.shared.adress = adress
        navigationController?.popViewController(animated: true)
    }
}

extension AddressSelectionViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 76
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let cell = tableView.cellForRow(at: indexPath) as? RadioButtonCell,
              viewModel.outputs.items[indexPath.section].objects[indexPath.row] != "Add new" else {
            // MARK: handle taping on "add new"
            return
        }

        selectedCell?.makeRadioButtonUnChecked()
        selectedCell = cell

        cell.makeRadioButtonChecked()
    }
}

extension AddressSelectionViewController: UITableViewDataSource {
    func numberOfSections(in tableView: UITableView) -> Int {
        return viewModel.outputs.items.count
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.outputs.items[section].objects.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = RadioButtonCell()
        cell.selectionStyle = .none

        let text = viewModel.outputs.items[indexPath.section].objects[indexPath.row]
        cell.addText(text: text)

        if viewModel.outputs.items[indexPath.section].objects[indexPath.row] == "Add new" {
            cell.setTextColor(color: .systemBlue)
            let image = UIImage(systemName: "plus")
            let imageView = UIImageView(frame: CGRect(x: 0, y: 5, width: 20, height: 18))
            imageView.image = image
            cell.addLeftView(accessory: imageView)
        } else {
            let label = UILabel(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
            cell.addLeftView(accessory: label)
            cell.makeRadioButtonUnChecked()
        }
        return cell
    }

    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let headerView = UIView()
        headerView.backgroundColor = .white

        let labelFrame = CGRect(x: spacing,
                                y: 24,
                                width: tableView.bounds.size.width,
                                height: tableView.bounds.size.height)

        let sectionLabel = UILabel(frame: labelFrame)
        sectionLabel.font = UIFont.boldSystemFont(ofSize: 18)
        sectionLabel.textColor = UIColor.black
        sectionLabel.text = viewModel.outputs.items[section].name
        sectionLabel.sizeToFit()

        headerView.addSubview(sectionLabel)

        return headerView
    }

    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 50
    }
}
