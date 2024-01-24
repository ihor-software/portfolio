//
//  MenuViewController.swift
//  iEat
//
//  Created by Vladyslav Minhalov on 17.06.2021.
//

import UIKit

final class MenuViewController: UIViewController, UICollectionViewDelegate {
    static let sectionHeaderElementKind = "section-header-element-kind"

    private enum Section: String, CaseIterable {
        case events = "Events"
        case georgianCuisine = "Georgian Cuisine"
        case youWillLikeIt = "You Will Like It"
    }

    private var cartManager: CartManager {
        DIContainer.shared.resolve(type: CartManager.self)
    }

    private var сollectionView: UICollectionView! = nil
    private var dataSource: UICollectionViewDiffableDataSource<Section, DishItem>! = nil

    private var data: [CartItem] {
        return cartManager.getBasket()
    }

    private let viewModel: MenuViewModelType

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white

        navigationItem.title = "Menu"

        configureCollectionView()
        configureDataSource()
        setupBindings()
    }

    override func viewWillAppear(_ animated: Bool) {
        сollectionView.reloadData()
    }

    private func setupBindings() {
        viewModel.outputs.reloadCollectionView = { [weak self] in
            self?.configureDataSource()
            self?.сollectionView.reloadData()
        }
    }

    init(with viewModel: MenuViewModelType) {
        self.viewModel = viewModel

        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        viewModel.inputs.openDishDetailsScreen(indexPath: indexPath)
    }

    private func setupCellQuantity(cell: DishCellProtocol) -> DishCellProtocol {
        let cartItem = CartItem(dishItem: cell.dishItem)
        var setupCell = cell
        if !self.data.contains(cartItem), setupCell.dishQuantity > 0 {
            setupCell.dishQuantity = 0
        }
        for basketItem in self.data where basketItem.dishItem == setupCell.dishItem {
            setupCell.dishQuantity = basketItem.quantity
        }
        return setupCell
    }
}

 extension MenuViewController {
    func configureCollectionView() {
        let collectionView = UICollectionView(frame: view.bounds, collectionViewLayout: setupLayout())
        view.addSubview(collectionView)

        collectionView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        collectionView.backgroundColor = .systemBackground
        collectionView.delegate = self

        collectionView.register(EventsCell.self, forCellWithReuseIdentifier: EventsCell.identifier)
        collectionView.register(GeorgianCuisineCell.self,
                                forCellWithReuseIdentifier: GeorgianCuisineCell.identifier)
        collectionView.register(YouWillLikeItCell.self, forCellWithReuseIdentifier: YouWillLikeItCell.identifier)
        collectionView.register(HeaderView.self, forSupplementaryViewOfKind: MenuViewController.sectionHeaderElementKind,
                                withReuseIdentifier: HeaderView.reuseIdentifier)

        сollectionView = collectionView
    }

    func configureDataSource() {
        dataSource = UICollectionViewDiffableDataSource<Section, DishItem>(
            collectionView: сollectionView) { (collectionView: UICollectionView, indexPath: IndexPath, dishItem: DishItem) -> UICollectionViewCell? in
            let sectionType = Section.allCases[indexPath.section]
            switch sectionType {
            case .events:
                guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: EventsCell.identifier, for: indexPath) as? EventsCell else {
                    return UICollectionViewCell()
                }
                cell.setUpEventsCell(title: dishItem.title,
                                     eventDescription: dishItem.description,
                                     backgroundImageName: dishItem.imagePath)
                return cell

            case .georgianCuisine:
                guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: GeorgianCuisineCell.identifier,
                                                                    for: indexPath) as? GeorgianCuisineCell else {
                    return UICollectionViewCell()
                }
                cell.setup(item: dishItem)
                guard cell == self.setupCellQuantity(cell: cell) as? GeorgianCuisineCell else { return GeorgianCuisineCell() }
                if cell.dishQuantity != 0 {
                    cell.addToCartButton.isHidden = true
                    cell.counterView.isHidden = false
                }
                return cell

            case .youWillLikeIt:
                guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: YouWillLikeItCell.identifier,
                                                                    for: indexPath) as? YouWillLikeItCell else {
                    return UICollectionViewCell()
                }
                cell.setup(item: dishItem)
                guard cell == self.setupCellQuantity(cell: cell) as? YouWillLikeItCell else { return YouWillLikeItCell() }
                if cell.dishQuantity != 0 {
                    cell.addToCartButton.isHidden = true
                    cell.counterView.isHidden = false
                }
                return cell
            }
        }

        dataSource.supplementaryViewProvider = {(collectionView: UICollectionView, kind: String, indexPath: IndexPath) -> UICollectionReusableView? in
            guard let supplementaryView = collectionView.dequeueReusableSupplementaryView(
                    ofKind: kind,
                    withReuseIdentifier: HeaderView.reuseIdentifier,
                    for: indexPath) as? HeaderView else {
                return UICollectionReusableView()
            }

            supplementaryView.title.text = Section.allCases[indexPath.section].rawValue
            return supplementaryView
        }

        let eventsArray = viewModel.inputs.eventsArray
        let georgianCusineArray = viewModel.inputs.georgianCusineArray
        let youWillLikeItArray = viewModel.inputs.youWillLikeItArray
        var snapshot = NSDiffableDataSourceSnapshot<Section, DishItem>()

        snapshot.appendSections([Section.events])
        snapshot.appendItems(eventsArray)

        snapshot.appendSections([Section.georgianCuisine])
        snapshot.appendItems(georgianCusineArray)

        snapshot.appendSections([Section.youWillLikeIt])
        snapshot.appendItems(youWillLikeItArray)

        dataSource.apply(snapshot, animatingDifferences: false)
    }
}

private extension MenuViewController {
    func setupLayout() -> UICollectionViewLayout {
        let layout =
            UICollectionViewCompositionalLayout { [weak self] (sectionIndex: Int, _ : NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection? in
            guard let self = self else { return nil }

            let eventsArray = self.viewModel.inputs.eventsArray
            let georgianCusineArray = self.viewModel.inputs.georgianCusineArray
            let youWillLikeItArray = self.viewModel.inputs.youWillLikeItArray
            let sectionLayoutKind = Section.allCases[sectionIndex]

            switch sectionLayoutKind {
            case .events:
                guard !eventsArray.isEmpty else { return nil }

                return self.setupEventsLayout()

            case .georgianCuisine:
                guard !georgianCusineArray.isEmpty else { return nil }

                return self.setupGeorgianCusineLayout()

            case .youWillLikeIt:
                guard !youWillLikeItArray.isEmpty else { return nil }

                return self.setupYouWillLikeItLayout()
            }
        }

        return layout
    }

    func setupEventsLayout() -> NSCollectionLayoutSection {
        let itemSize = NSCollectionLayoutSize(widthDimension: .estimated(170),
                                              heightDimension: .fractionalHeight(1.0))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 10, bottom: 0, trailing: 10)

        let groupSize = NSCollectionLayoutSize(
            widthDimension: .estimated(210),
            heightDimension: .estimated(250))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)

        let headerSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                heightDimension: .absolute(65))
        let sectionHeader = NSCollectionLayoutBoundarySupplementaryItem(
            layoutSize: headerSize,
            elementKind: MenuViewController.sectionHeaderElementKind, alignment: .top)

        let section = NSCollectionLayoutSection(group: group)
        section.boundarySupplementaryItems = [sectionHeader]
        section.orthogonalScrollingBehavior = .continuous
        section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 0, bottom: 25, trailing: 0)

        return section
    }

    func setupGeorgianCusineLayout() -> NSCollectionLayoutSection {
        let itemSize = NSCollectionLayoutSize(widthDimension: .absolute(170),
                                              heightDimension: .absolute(280))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 10, bottom: 0, trailing: 10)

        let groupSize = NSCollectionLayoutSize(
            widthDimension: .estimated(210),
            heightDimension: .estimated(280))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)

        let headerSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                heightDimension: .absolute(65))
        let sectionHeader = NSCollectionLayoutBoundarySupplementaryItem(
            layoutSize: headerSize,
            elementKind: MenuViewController.sectionHeaderElementKind, alignment: .topLeading)

        let section = NSCollectionLayoutSection(group: group)
        section.boundarySupplementaryItems = [sectionHeader]
        section.orthogonalScrollingBehavior = .continuous
        section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 0, bottom: 25, trailing: 0)

        return section
    }

    func setupYouWillLikeItLayout() -> NSCollectionLayoutSection {
        let itemSize = NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(1.0),
            heightDimension: .fractionalHeight(1.0))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 10, bottom: 0, trailing: 10)

        let groupSize = NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(1.0),
            heightDimension: .estimated(350))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)

        let headerSize = NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(1.0),
            heightDimension: .absolute(65))

        let sectionHeader = NSCollectionLayoutBoundarySupplementaryItem(
            layoutSize: headerSize,
            elementKind: MenuViewController.sectionHeaderElementKind,
            alignment: .top)

        let section = NSCollectionLayoutSection(group: group)
        section.boundarySupplementaryItems = [sectionHeader]
        section.orthogonalScrollingBehavior = .none

        return section
    }
}
