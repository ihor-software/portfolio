//
//  OpenCardViewController.swift
//  iEat
//
//  Created by Anastasiia Yefremova on 19.07.2021.
//

import UIKit

final class DishDetailsViewController: UIViewController {
    let spacing: CGFloat = 16

    // MARK: Private Сustom Properties
    private let dishTitle: String
    private let dishWeight: Int
    private let dishCalories: Int
    private let dishDescription: String
    private let dishCategories: [FoodCategory]
    private let dishImage: UIImage

    private var heigthOfVisibleArea: CGFloat = {
        let height = UIScreen.main.bounds.size.height / 1.2
        return height
    }()

    // MARK: Setup lazy ui elements
    private lazy var dishImageView: UIImageView = {
        let image = dishImage
        let imageWidth = UIScreen.main.bounds.size.width
        let imageSize = CGSize(width: imageWidth, height: imageWidth / 1.6)
        let scaledImage = image.scaled(to: imageSize, scalingMode: .aspectFill)

        let imageView = UIImageView(image: scaledImage)
        imageView.roundCorners(corners: [.topLeft, .topRight], radius: 12)
        imageView.backgroundColor = .white
        imageView.isUserInteractionEnabled = true

        return imageView
    }()

    private lazy var titleView = DishDetailsTitleView(title: dishTitle,
                                                      weight: dishWeight,
                                                      calories: dishCalories)

    private lazy var descriptionView = DishDetailsDescriptionView(description: dishDescription, categories: dishCategories)

    private lazy var addToCartButton: IEatButtonWithPrice = {
        let button = IEatButtonWithPrice(price: 2)
        button.setTitle("Add to cart", for: .normal)

        return button
    }()

    // MARK: init
    init(dishItem: DishItem) {
        self.dishTitle = dishItem.title
        self.dishWeight = dishItem.weight
        self.dishCalories = dishItem.kcal
        self.dishDescription = dishItem.description
        self.dishCategories = [
            FoodCategory(title: dishItem.foodCompositions.first?.dishTag ?? "",
                         style: .red),
            FoodCategory(title: dishItem.ingredients.first?.dishTag ?? "",
                         style: .blue)
        ]
        self.dishImage = UIImage(named: dishItem.imagePath) ?? UIImage()

        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // MARK: Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .clear

        setupBottomSafeAreaBackground()

        setupConstraints()
        setupCrossButton()
    }
}

// MARK: - methods for setting ui elements

private extension DishDetailsViewController {
    func setupCrossButton() {
        let crossButton = CrossButton()
        crossButton.addTarget(self, action: #selector(dismissViewController), for: .touchUpInside)

        dishImageView.addSubview(crossButton)

        NSLayoutConstraint.activate([
            crossButton.topAnchor.constraint(equalTo: dishImageView.topAnchor,
                                             constant: spacing),
            crossButton.trailingAnchor.constraint(equalTo: dishImageView.trailingAnchor,
                                                  constant: -spacing)
        ])
    }

    @objc func dismissViewController() {
        dismiss(animated: true, completion: nil)
    }

    func setupBottomSafeAreaBackground() {
        let bottomBackground = UIView()
        bottomBackground.backgroundColor = .white

        view.addSubview(bottomBackground)
        bottomBackground.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            bottomBackground.topAnchor.constraint(equalTo: view.bottomAnchor,
                                                  constant: -heigthOfVisibleArea),
            bottomBackground.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            bottomBackground.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            bottomBackground.trailingAnchor.constraint(equalTo: view.trailingAnchor)
        ])
    }
}

// MARK: - methods for setting constraints

private extension DishDetailsViewController {
    func setupConstraints() {
        setupDishImageConstraints()
        setupAddToCartButtonConstraints()
        setupTitleViewConstraints()
        setupDescriptionViewConstraints()
    }

    func setupDishImageConstraints() {
        view.addSubview(dishImageView)
        dishImageView.translatesAutoresizingMaskIntoConstraints = false
        let safeArea = view.safeAreaLayoutGuide

        NSLayoutConstraint.activate([
            dishImageView.topAnchor.constraint(equalTo: safeArea.bottomAnchor,
                                               constant: -heigthOfVisibleArea - 20),
            dishImageView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            dishImageView.trailingAnchor.constraint(equalTo: view.trailingAnchor)
        ])
    }

    func setupTitleViewConstraints() {
        view.addSubview(titleView)
        titleView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            titleView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            titleView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            titleView.topAnchor.constraint(equalTo: dishImageView.bottomAnchor),
            titleView.heightAnchor.constraint(greaterThanOrEqualToConstant: 80)
        ])
        titleView.layoutIfNeeded()
    }

    func setupDescriptionViewConstraints() {
        view.addSubview(descriptionView)
        descriptionView.translatesAutoresizingMaskIntoConstraints = false
        descriptionView.invalidateIntrinsicContentSize()
        NSLayoutConstraint.activate([
            descriptionView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: spacing),
            descriptionView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -spacing),
            descriptionView.topAnchor.constraint(equalTo: titleView.bottomAnchor, constant: spacing)
        ])
    }

    func setupAddToCartButtonConstraints() {
        view.addSubview(addToCartButton)
        addToCartButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            addToCartButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: spacing),
            addToCartButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -spacing),
            addToCartButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -spacing)
        ])
    }
}
