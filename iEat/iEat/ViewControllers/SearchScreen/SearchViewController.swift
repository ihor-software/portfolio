//
//  SearchViewController.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 29.06.2021.
//

import UIKit

final class SearchViewController: UIViewController {
    private enum Constraints {
        static let categoriesRowHeight: CGFloat = 40
        static let categoriesIndents: CGFloat = 12
        static let menuRowHeight: CGFloat = 132
        static let minWidthInCategoriesRowWithoutSymbols: CGFloat = 48
        static let widthIndexAtCategoriesRow: CGFloat = 6.5
        static let categoriesGroupItemSpacing: CGFloat = 8
        static let someSpaceForTrailingIndent: CGFloat = 2
    }

    // MARK: - Self-executing closures

    private lazy var searchController: UISearchController = {
        let searchController = UISearchController(searchResultsController: nil)
        searchController.obscuresBackgroundDuringPresentation = false
        searchController.hidesNavigationBarDuringPresentation = false
        searchController.searchBar.placeholder = "Search"
        searchController.searchBar.searchTextField.tintColor = .black
        searchController.searchResultsUpdater = self

        return searchController
    }()

    private lazy var collectionView: UICollectionView = {
        let collectionView = UICollectionView(frame: view.bounds, collectionViewLayout: createLayout())
        collectionView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        collectionView.backgroundColor = .white
        collectionView.showsHorizontalScrollIndicator = false
        collectionView.delegate = self

        return collectionView
    }()

    // MARK: - Private Properties

    private let viewModel: SearchViewModelType
    private var dataSource: SearchCollectionViewDataSource?

    init(with viewModel: SearchViewModelType) {
        self.viewModel = viewModel

        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // MARK: - Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()

        setupUI()
    }

    // MARK: - Private Methods

    private func createLayout() -> UICollectionViewLayout {
        let layout =
            UICollectionViewCompositionalLayout { [weak self] (sectionIndex: Int, _ : NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection? in
                guard let self = self else { return nil }

                let sectionKind = SectionType.allCases[sectionIndex]

                switch sectionKind {
                case .categoryList:
                    return self.setupCategoriesSection()

                case .dishesList:
                    return self.setupSearchSection()
                }
            }

        return layout
    }

    private func setupCategoriesSection() -> NSCollectionLayoutSection {
        var itemSizes: [NSCollectionLayoutItem] = []
        var groupWidth: CGFloat = 0

        for index in 0..<self.viewModel.inputs.categories.count {
            let itemWidth = Constraints.widthIndexAtCategoriesRow *
                CGFloat(self.viewModel.inputs.categories[index].name.count) +
                Constraints.minWidthInCategoriesRowWithoutSymbols
            groupWidth += itemWidth + Constraints.someSpaceForTrailingIndent

            let itemSize = NSCollectionLayoutSize(
                widthDimension: .absolute(itemWidth),
                heightDimension: .fractionalHeight(1.0))

            let item = NSCollectionLayoutItem(layoutSize: itemSize)
            itemSizes.append(item)
        }

        groupWidth += Constraints.categoriesGroupItemSpacing * CGFloat(self.viewModel.inputs.categories.count)

        let groupSize = NSCollectionLayoutSize(widthDimension: .absolute(groupWidth),
                                               heightDimension: .absolute(Constraints.categoriesRowHeight))

        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitems: itemSizes)
        group.interItemSpacing = .fixed(Constraints.categoriesGroupItemSpacing)

        let section = NSCollectionLayoutSection(group: group)
        section.orthogonalScrollingBehavior = .continuous
        section.contentInsets = .init(top: Constraints.categoriesIndents,
                                      leading: Constraints.categoriesIndents,
                                      bottom: Constraints.categoriesIndents,
                                      trailing: 0)

        return section
    }

    private func setupSearchSection() -> NSCollectionLayoutSection {
        let itemSize = NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(1),
            heightDimension: .absolute(132))

        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.contentInsets.top = 16

        let groupSize = NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(1),
            heightDimension: .fractionalHeight(1))

        let group = NSCollectionLayoutGroup.vertical(
            layoutSize: groupSize,
            subitem: item,
            count: 6)

        group.contentInsets = .init(top: 0,
                                    leading: 16,
                                    bottom: 16,
                                    trailing: 16)

        let section = NSCollectionLayoutSection(group: group)

        return section
    }

    private func setupUI() {
        setupView()
        setupNavigationItem()
        setupBindings()
        setupViewModel()
    }

    private func setupView() {
        view.backgroundColor = .white
        view.addSubview(collectionView)
    }

    private func setupNavigationItem() {
        let sortingSettingsButton = UIBarButtonItem(image: UIImage(named: "sorting.settings"),
                                                    style: .plain,
                                                    target: self,
                                                    action: #selector(sortingSettingsButtonTapped))

        navigationItem.rightBarButtonItem = sortingSettingsButton
        navigationItem.hidesSearchBarWhenScrolling = false
        navigationItem.searchController = searchController
        navigationItem.title = "Search"
    }

    @objc private func sortingSettingsButtonTapped() {
        viewModel.inputs.openSortingSettings()
    }

    private func setupBindings() {
        viewModel.outputs.reloadCollectionView = { [weak self] in
            guard let self = self else { return }

            self.dataSource = SearchCollectionViewDataSource(
                viewModel: self.viewModel.inputs.selfReference,
                collectionView: self.collectionView)

            self.updateCategoriesViews()
        }
    }

    private func updateCategoriesViews() {
        DispatchQueue.main.async {
            self.collectionView.dataSource = self.dataSource
            self.collectionView.reloadData()
        }
    }

    private func setupViewModel() {
        viewModel.inputs.selectedCategoryIndexes.insert(0)
        viewModel.inputs.loadCategories()
    }
}

// MARK: - UICollectionViewDelegate

extension SearchViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        viewModel.inputs.didSelectItemAt(indexPath: indexPath)
        collectionView.reloadData()
    }
}

// MARK: - UISearchResultsUpdating

extension SearchViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        guard let text = searchController.searchBar.text else { return }

        viewModel.inputs.filterContentForSearchText(text)
    }
}
