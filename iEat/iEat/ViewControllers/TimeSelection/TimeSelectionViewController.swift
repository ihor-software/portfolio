//
//  TimeSelectionViewController.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 15.07.2021.
//

import UIKit

final class TimeSelectionViewController: UIViewController {
    private let tableView = UITableView()
    private let tableViewCellID = "tableViewCellID"
    private let doneButton = IEatButton()

    private var selectedTime = ""
    private let deliveryTimeOptions = ["As soon as possible (~45 min)",
                                       "21:20 - 21:40",
                                       "21:30 - 21:50",
                                       "21:40 - 22:00",
                                       "21:50 - 22:10",
                                       "22:00 - 22:20"]

    override func viewDidLoad() {
        super.viewDidLoad()

        setupUI()
    }

    private func setupUI() {
        view.backgroundColor = .white

        setupNavigationCcntroller()
        setupTableView()
        setupButton()
    }

    private func setupNavigationCcntroller() {
        title = "Delivery Time"
        navigationController?.navigationBar.prefersLargeTitles = true
    }

    private func setupTableView() {
        tableView.register(RadioButtonCell.self, forCellReuseIdentifier: tableViewCellID)
        tableView.delegate = self
        tableView.dataSource = self
        tableView.separatorStyle = .none

        tableView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(tableView)

        NSLayoutConstraint.activate([
            tableView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            tableView.topAnchor.constraint(equalTo: view.topAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }

    private func setupButton() {
        doneButton.setTitle("Done", for: .normal)
        doneButton.titleLabel?.font = .boldSystemFont(ofSize: 16)
        doneButton.addTarget(self, action: #selector(doneTapped), for: .touchUpInside)

        doneButton.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(doneButton)

        NSLayoutConstraint.activate([
            doneButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            doneButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            doneButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16)
        ])
    }

    @objc private func doneTapped() {
        OrderDetails.shared.time = selectedTime
        print(OrderDetails.shared)
        navigationController?.popViewController(animated: true)
    }
}

extension TimeSelectionViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let cell = tableView.cellForRow(at: indexPath) as? RadioButtonCell,
              let time = cell.cellText.text else { return }

        selectedTime = time

        tableView.reloadData()
    }
}

extension TimeSelectionViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        deliveryTimeOptions.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: tableViewCellID,
                                                       for: indexPath) as? RadioButtonCell else { return UITableViewCell() }

        cell.selectionStyle = .none
        cell.addText(text: deliveryTimeOptions[indexPath.row])

        guard let time = cell.cellText.text else { return cell }

        selectedTime == time ? cell.makeRadioButtonChecked() : cell.makeRadioButtonUnChecked()

        return cell
    }

    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 75
    }
}
