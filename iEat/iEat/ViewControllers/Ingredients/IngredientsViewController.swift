//
//  IngredientsViewController.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 08.10.2021.
//

import UIKit

final class IngredientsViewController: UIViewController {
    private let viewModel: IngredientsViewModelType

    private lazy var searchBar: UISearchBar = {
        let searchBar = UISearchBar()
        searchBar.searchTextField.tintColor = .black
        searchBar.placeholder = "Search for Ingredients..."
        searchBar.delegate = self

        return searchBar
    }()

    private lazy var tableView: UITableView = {
        let tableView = UITableView()
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(IngredientTableViewCell.self,
                           forCellReuseIdentifier: IngredientTableViewCell.identifier)

        return tableView
    }()

    private lazy var addButton: IEatButton = {
        let button = IEatButton()
        button.setTitle("Add", for: .normal)
        button.addTarget(self,
                         action: #selector(addTapped),
                         for: .touchUpInside)

        return button
    }()

    init(viewModel: IngredientsViewModelType) {
        self.viewModel = viewModel

        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        setupUI()
        setupBindings()
    }

    @objc private func addTapped() {
        viewModel.inputs.addSelectedIngredient()
    }

    private func setupUI() {
        view.backgroundColor = .white

        setupNavigationController()
        setupContraints()
    }

    private func setupNavigationController() {
        let cancelButton = UIBarButtonItem(
            title: "Cancel",
            style: .plain,
            target: self,
            action: #selector(cancelTapped))

        navigationItem.rightBarButtonItem = cancelButton
        navigationController?.navigationBar.topItem?.titleView = searchBar
    }

    @objc private func cancelTapped() {
        viewModel.inputs.goBackToMyPreferencesScreen()
    }

    private func setupContraints() {
        view.addSubview(tableView)
        view.addSubview(addButton)

        tableView.translatesAutoresizingMaskIntoConstraints = false
        addButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            tableView.topAnchor.constraint(equalTo: view.topAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            tableView.bottomAnchor.constraint(equalTo: addButton.topAnchor),

            addButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            addButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            addButton.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -16)
        ])
    }

    private func setupBindings() {
        viewModel.outputs.reloadTableView = { [weak self] in
            self?.tableView.reloadData()
        }
    }
}

// MARK: - UITableViewDelegate

extension IngredientsViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        viewModel.inputs.selectCellAtRow(row: indexPath.row)
    }
}

// MARK: - UITableViewDataSource

extension IngredientsViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.outputs.rows.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(
            withIdentifier: IngredientTableViewCell.identifier,
            for: indexPath) as? IngredientTableViewCell else { return .init() }

        let ingredient = viewModel.outputs.rows[indexPath.row]
        let isAdded = viewModel.outputs.addedIngredients.contains(ingredient)
        let isSelected = ingredient == viewModel.outputs.selectedIngredient

        cell.configure(with: ingredient.name,
                       isAdded: isAdded,
                       isSelected: isSelected)

        return cell
    }
}

// MARK: - UISearchBarDelegate

extension IngredientsViewController: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        viewModel.inputs.filterContentForSearchText(searchText)
    }
}
