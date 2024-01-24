//
//  PhonePickerTableViewController.swift
//  iEat
//
//  Created by Igor Vasyliev on 5/22/21.
//

import UIKit

class CountryPickerViewController: UIViewController {
    private lazy var submitButton = IEatButton()
    private lazy var tableView = UITableView()
    private let searchController = UISearchController(searchResultsController: nil)

    private var submitButtonFrameOriginY = CGFloat()
    private let cellReuseID = "cellReuseID"

    private let viewModel: CountryPickerViewModelType

    init(with viewModel: CountryPickerViewModelType) {
        self.viewModel = viewModel

        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        setupTableView()
        createFloatingButton()
        setupSearchController()
        setupNotificationCenter()
        setupBindings()
    }

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()

        navigationController?.view.addSubview(submitButton)

        setupTableViewLayout()
        setupButtonLayout()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        submitButtonFrameOriginY = submitButton.frame.origin.y
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        submitButton.isHidden = true
    }

    private func setupBindings() {
        viewModel.outputs.reloadTableView = { [weak self] in
            self?.tableView.reloadData()
        }
    }

    private func setupTableView() {
        tableView.delegate = self
        tableView.dataSource = self
        tableView.backgroundColor = .white
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: cellReuseID)

        view.addSubview(tableView)
    }

    private func setupButtonLayout() {
        submitButton.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            submitButton.bottomAnchor.constraint(equalTo: tableView.bottomAnchor, constant: -20),
            submitButton.leadingAnchor.constraint(equalTo: tableView.safeAreaLayoutGuide.leadingAnchor, constant: 10),
            submitButton.trailingAnchor.constraint(equalTo: tableView.safeAreaLayoutGuide.trailingAnchor, constant: -10),
            submitButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }

    private func setupTableViewLayout() {
        tableView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            tableView.topAnchor.constraint(equalTo: view.topAnchor)
        ])
    }

    private func createFloatingButton() {
        submitButton.setTitle("Submit", for: .normal)
        submitButton.addTarget(self, action: #selector(submitButtonTapped), for: .touchUpInside)
        view.addSubview(submitButton)
    }

    @objc private func submitButtonTapped() {
        viewModel.inputs.passToModelSelected()
        closeCountryList()
    }

    private func setupSearchController() {
        searchController.searchResultsUpdater = self
        searchController.obscuresBackgroundDuringPresentation = false
        searchController.searchBar.placeholder = "Your country"
        searchController.searchBar.delegate = self
        searchController.searchBar.searchTextField.tintColor = .black
        navigationItem.searchController = searchController
        definesPresentationContext = true
        navigationItem.hidesSearchBarWhenScrolling = false
    }

    private func setupNotificationCenter() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateView),
                                               name: UIResponder.keyboardWillShowNotification,
                                               object: nil)

        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateView),
                                               name: UIResponder.keyboardWillHideNotification,
                                               object: nil)
    }

    @objc private func updateView(notification: Notification) {
        let userInfo = notification.userInfo

        guard let keyboardRect = (userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue else { return }

        if notification.name == UIResponder.keyboardWillHideNotification {
            let requiredDownShiftForSubmitButton = submitButtonFrameOriginY - submitButton.frame.minY

            UIView.animate(withDuration: 0.5,
                           delay: 0,
                           options: [.curveEaseOut]) { [weak self] in
                guard let self = self else { return }

                self.submitButton.transform = self.submitButton.transform.translatedBy(
                    x: 0,
                    y: requiredDownShiftForSubmitButton)
            }

        } else {
            let spaceBetweenButtonAndKeyboard: CGFloat = 10
            let spaceBetweenModalViewAndScreenEdge: CGFloat = 60
            let requiredUpShiftForSubmitButton = keyboardRect.minY - submitButton.frame.maxY -
            spaceBetweenButtonAndKeyboard - spaceBetweenModalViewAndScreenEdge

            UIView.animate(withDuration: 0.5,
                           delay: 0,
                           options: [.curveEaseOut]) { [weak self] in
                guard let self = self else { return }

                self.submitButton.transform = self.submitButton.transform.translatedBy(
                    x: 0,
                    y: requiredUpShiftForSubmitButton)
            }
        }
    }

    private func closeCountryList() {
        searchController.dismiss(animated: true)
        dismiss(animated: true)
    }
}

// MARK: - UITableViewDataSource

extension CountryPickerViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.outputs.rows.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard !viewModel.outputs.rows.isEmpty else { return .init() }
        let cell = tableView.dequeueReusableCell(withIdentifier: cellReuseID, for: indexPath)
        let country = viewModel.outputs.rows[indexPath.row]

        let flag = country.flag
        let name = country.name
        let code = country.code

        cell.accessoryView = .none
        if country.code == viewModel.outputs.selectedCountry.code {
            let imageView = UIImageView(image: UIImage(systemName: "checkmark"))
            cell.accessoryView = imageView
        }

        cell.textLabel?.text = flag + "    " + name + " (\(code))"
        return cell
    }
}

// MARK: - UITableViewDelegate

extension CountryPickerViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        viewModel.inputs.selectCellAtRow(row: indexPath.row)
    }
}

// MARK: - UISearchResultsUpdating

extension CountryPickerViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        guard let text = searchController.searchBar.text else { return }
        viewModel.inputs.filterContentForSearchText(text)
    }
}

// MARK: - UISearchBarDelegate

extension CountryPickerViewController: UISearchBarDelegate {
    func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
        closeCountryList()
    }
}
