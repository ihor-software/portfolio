//
//  SearchCollectionViewDataSource.swift
//  iEat
//
//  Created by Yelyzaveta Lipatova on 29.06.2021.
//

import UIKit

final class SearchCollectionViewDataSource: NSObject, UICollectionViewDataSource {
    private let viewModel: SearchViewModelType

    init(viewModel: SearchViewModelType,
         collectionView: UICollectionView) {
        self.viewModel = viewModel
        DispatchQueue.main.async {
            collectionView.register(CategoryCollectionViewCell.self,
                                    forCellWithReuseIdentifier: CategoryCollectionViewCell.identifier)

            collectionView.register(SearchCell.self,
                                    forCellWithReuseIdentifier: SearchCell.identifier)
        }
    }

    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return SectionType.allCases.count
    }

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        guard let sectionType = SectionType.init(rawValue: section) else { return .zero }

        switch sectionType {
        case .categoryList:
            return viewModel.inputs.sections.first?.objects.count ?? .zero

        case .dishesList:
            return viewModel.inputs.rows.count
        }
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let sectionType = SectionType.init(rawValue: indexPath.section) else { return .init() }

        switch sectionType {
        case .categoryList:
            let cell = createCategoryCellFor(collectionView: collectionView, by: indexPath)

            return cell

        case .dishesList:
            let cell = createSearchCellFor(collectionView: collectionView, by: indexPath)

            return cell
        }
    }

    private func createCategoryCellFor(collectionView: UICollectionView, by indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CategoryCollectionViewCell.identifier,
                                                            for: indexPath) as? CategoryCollectionViewCell else { return UICollectionViewCell() }

        let object = viewModel.inputs.sections[indexPath.section].objects[indexPath.row]
        let objectState = viewModel.inputs.selectedCategoryIndexes.contains(indexPath.row) ?
            CategoryState.selected :
            CategoryState.normal

        cell.categoryModel = CategoryCellViewModel(category: object, state: objectState)

        return cell
    }

    private func createSearchCellFor(collectionView: UICollectionView, by indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: SearchCell.identifier,
                                                            for: indexPath) as? SearchCell else { return UICollectionViewCell() }

        let object = viewModel.inputs.rows[indexPath.row]
        let title = object.title
        let gram = String(object.weight)
        let kcal = String(object.kcal)
        let price = String(object.price)
        let image = object.imagePath

        cell.setUpSearchCell(title: title,
                             gram: gram,
                             kcal: kcal,
                             price: price,
                             backgroundImageName: image)

        return cell
    }
}
