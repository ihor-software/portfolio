//
//  CartScreenViewController.swift
//  iEat
//
//  Created by Igor Vasyliev on 7/16/21.
//

import UIKit

final class CartViewController: UIViewController {
    private enum Const {
        static let numberOfAdditionalCells = 1
        static let contentToSideDistance: CGFloat = 16
        static let cellPadding: CGFloat = 3
        static let applyText = "Apply"
    }

    private lazy var tableview = UITableView()

    private var checkoutButton: IEatButton = {
        let button = IEatButton()
        button.setTitle("Checkout", for: .normal)
        button.addTarget(self, action: #selector(checkoutButtonTapped), for: .touchUpInside)
        return button
    }()

    private lazy var promocodeTextFieldButton: UIButton = {
        let button = UIButton()
        button.contentEdgeInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 10)
        button.setTitle(Const.applyText, for: .normal)
        button.setTitleColor(.lightGray, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 15)
        button.frame = CGRect(x: 0, y: CGFloat(5), width: CGFloat(20), height: CGFloat(25))
        button.addTarget(self, action: #selector(applyTapped), for: .touchUpInside)
        return button
    }()

    private var promocodeTextField: UITextField =  {
        var textField = UITextField()
        textField.placeholder = "Enter promo code"
        textField.addTarget(self, action: #selector(actionOnEditingTextField), for: .editingChanged)
        let leftViewForInset = UIView(frame: .init(x: 0, y: 0, width: 10, height: 5))
        textField.leftView = leftViewForInset
        textField.leftViewMode = .always
        textField.textColor = .black
        textField.tintColor = .black
        textField.font = .systemFont(ofSize: 18)
        textField.backgroundColor = .init(red: 246, green: 246, blue: 246, alpha: 1)
        textField.layer.cornerRadius = 8
        textField.rightViewMode = .always
        return textField
    }()

    private var discountLabel: UILabel = {
        let label = UILabel()
        label.text = "Discount"
        label.textColor = .lightGray
        return label
    }()

    private var totalLabel: UILabel = {
        let label = UILabel()
        label.text = "Total"
        return label
    }()

    private var discountPriceLabel: UILabel = {
        let label = UILabel()
        label.text = "0 $"
        label.textColor = .lightGray
        label.textAlignment = .right
        return label
    }()

    private var totalPriceLabel: UILabel = {
        let label = UILabel()
        label.textAlignment = .right
        return label
    }()

    private var promocodeStackView: UIStackView = {
        var stackView = UIStackView()
        stackView.translatesAutoresizingMaskIntoConstraints = false
        stackView.axis = .vertical
        stackView.distribution = .fillEqually
        stackView.alignment = .fill
        stackView.spacing = 5
        return stackView
    }()

    private var topPromocodeStackView: UIStackView = {
        var stackView = UIStackView()
        stackView.translatesAutoresizingMaskIntoConstraints = false
        stackView.axis = .horizontal
        stackView.distribution = .fillEqually
        stackView.alignment = .center
        return stackView
    }()

    private var bottomPromocodeStackView: UIStackView = {
        var stackView = UIStackView()
        stackView.translatesAutoresizingMaskIntoConstraints = false
        stackView.axis = .horizontal
        stackView.distribution = .fillEqually
        stackView.alignment = .center
        return stackView
    }()

    private var promocodeCell: UITableViewCell = {
        let cell = UITableViewCell()
        cell.selectionStyle = .none
        return cell
    }()

    let viewModel: CartViewModelType

    init(viewModel: CartViewModelType) {
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
        setupTapGestureRecognizer()
        setupBindings()

        promocodeTextField.rightView = promocodeTextFieldButton
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        viewModel.inputs.loadData()
        if viewModel.inputs.cartItems.isEmpty {
            navigationController?.pushViewController(EmptyCartViewController(), animated: false)
        }
        navigationItem.titleView?.isHidden = true
    }

    private func setupNavigationController() {
        navigationItem.title = "Cart"

        let selectItemsButton = UIBarButtonItem.init(
            title: "Select items",
            style: .plain,
            target: self,
            action: #selector(selectItemsAction))

        navigationItem.rightBarButtonItem = selectItemsButton
    }

    private func setupTableView() {
        tableview.separatorStyle = .none
        tableview.delegate = self
        tableview.dataSource = self
        tableview.register(CartScreenCell.self, forCellReuseIdentifier: "CartScreenCell")
    }

    private func setupTapGestureRecognizer() {
        let tap = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))

        view.addGestureRecognizer(tap)
    }

    private func setupBindings() {
        viewModel.outputs.bindCartItemsDataToView = { [weak self] in
            self?.tableview.reloadData()
        }

        viewModel.outputs.bindTotalPriceToView = { [weak self] in
            self?.totalPriceLabel.text = "\($0) $"
        }

        viewModel.outputs.bindDiscountToView = { [weak self] in
            self?.discountPriceLabel.text = "\($0) $"
        }

        viewModel.outputs.bindPromocodeStateToView = { [weak self] in
            $0 ? self?.makeTextFieldGreen() : self?.makeTextFieldRed()
        }
    }

    @objc private func selectItemsAction() {
        navigationController?.pushViewController(SelectItemViewController(viewModel: SelectItemViewModel()), animated: true)
    }

    @objc private func dismissKeyboard() {
        promocodeTextField.endEditing(true)
    }

    @objc private func applyTapped() {
        guard let promocode = promocodeTextField.text else { return }

        viewModel.inputs.check(promocode: promocode)
    }

    @objc private func actionOnEditingTextField() {
        makeTextFieldNormal()

        let textIsEmpty = promocodeTextField.text?.isEmpty ?? true

        promocodeTextFieldButton.setTitleColor(!textIsEmpty ? .systemBlue : .lightGray, for: .normal)
    }

    @objc private func checkoutButtonTapped() {
        viewModel.inputs.startCheckoutFlow()
    }

    private func setupSubviews() {
        topPromocodeStackView.addArrangedSubview(discountLabel)
        topPromocodeStackView.addArrangedSubview(discountPriceLabel)

        bottomPromocodeStackView.addArrangedSubview(totalLabel)
        bottomPromocodeStackView.addArrangedSubview(totalPriceLabel)

        promocodeStackView.addArrangedSubview(promocodeTextField)
        promocodeStackView.addArrangedSubview(topPromocodeStackView)
        promocodeStackView.addArrangedSubview(bottomPromocodeStackView)

        promocodeCell.contentView.addSubview(promocodeStackView)

        view.addSubview(checkoutButton)
        view.addSubview(tableview)
    }

    private func makeTextFieldGreen() {
        promocodeTextField.backgroundColor = UIColor(red: 235, green: 250, blue: 239, alpha: 1)
        promocodeTextField.resignFirstResponder()
        promocodeTextField.isUserInteractionEnabled = false
        promocodeTextFieldButton.setTitle("", for: .normal)
        promocodeTextFieldButton.contentEdgeInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 10)
        promocodeTextFieldButton.setImage(UIImage(systemName: "checkmark.circle"), for: .normal)
        promocodeTextFieldButton.tintColor = UIColor(red: 52, green: 199, blue: 89, alpha: 1)
        discountLabel.textColor = .black
        discountPriceLabel.textColor = .black
    }

    private func makeTextFieldRed() {
        promocodeTextField.backgroundColor = UIColor(red: 255, green: 209, blue: 209, alpha: 1)
        promocodeTextFieldButton.setTitle("", for: .normal)
        promocodeTextFieldButton.contentEdgeInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 10)
        promocodeTextFieldButton.setImage(UIImage(systemName: "multiply.circle"), for: .normal)
        promocodeTextFieldButton.tintColor = UIColor(red: 255, green: 59, blue: 48, alpha: 1)
        discountLabel.textColor = .lightGray
        discountPriceLabel.textColor = .lightGray
    }

    private func makeTextFieldNormal() {
        promocodeTextField.backgroundColor = .init(red: 246, green: 246, blue: 246, alpha: 1)
        promocodeTextFieldButton.setTitle(Const.applyText, for: .normal)
        promocodeTextFieldButton.setTitleColor(.lightGray, for: .normal)
        promocodeTextFieldButton.titleLabel?.font = .systemFont(ofSize: 15)
        promocodeTextFieldButton.setImage(nil, for: .normal)
        discountLabel.textColor = .lightGray
        discountPriceLabel.textColor = .lightGray
    }

    private func setupConstraints() {
        tableview.translatesAutoresizingMaskIntoConstraints = false
        checkoutButton.translatesAutoresizingMaskIntoConstraints = false
        promocodeStackView.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                tableview.topAnchor.constraint(equalTo: view.topAnchor, constant: 50),
                tableview.leftAnchor.constraint(equalTo: view.leftAnchor),
                tableview.rightAnchor.constraint(equalTo: view.rightAnchor),
                tableview.bottomAnchor.constraint(equalTo: checkoutButton.topAnchor),

                topPromocodeStackView.widthAnchor.constraint(equalTo: promocodeStackView.widthAnchor, multiplier: 0.96),
                bottomPromocodeStackView.widthAnchor.constraint(equalTo: promocodeStackView.widthAnchor, multiplier: 0.96),

                discountLabel.leadingAnchor.constraint(equalTo: topPromocodeStackView.leadingAnchor, constant: 10),
                totalLabel.leadingAnchor.constraint(equalTo: bottomPromocodeStackView.leadingAnchor, constant: 10),
                discountPriceLabel.trailingAnchor.constraint(equalTo: topPromocodeStackView.trailingAnchor, constant: -10),
                totalPriceLabel.trailingAnchor.constraint(equalTo: bottomPromocodeStackView.trailingAnchor, constant: -10),

                promocodeStackView.widthAnchor.constraint(equalTo: promocodeCell.widthAnchor, multiplier: 0.9),
                promocodeStackView.heightAnchor.constraint(equalToConstant: 130),
                promocodeStackView.centerXAnchor.constraint(equalTo: promocodeCell.centerXAnchor),
                promocodeStackView.topAnchor.constraint(equalTo: promocodeCell.topAnchor, constant: 30),

                checkoutButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -Const.contentToSideDistance),
                checkoutButton.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: Const.contentToSideDistance),
                checkoutButton.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -Const.contentToSideDistance)
            ]
        )
    }
}

extension CartViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if indexPath.row == viewModel.inputs.cartItems.count {
            return 130
        } else {
            return 54
        }
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        tableView.reloadData()
    }
}

extension CartViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.inputs.cartItems.count + Const.numberOfAdditionalCells
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cartItems = viewModel.inputs.cartItems

        guard indexPath.row != cartItems.count && !cartItems.isEmpty else { return promocodeCell }
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "CartScreenCell",
                                                       for: indexPath) as? CartScreenCell else {
            return UITableViewCell()
        }

        let cartItem = cartItems[indexPath.row]
        let dishQuantity = cartItem.quantity
        let maxDishItemsQuantity = viewModel.inputs.maxDishItemsQuantity

        cell.setUpSearchCell(item: cartItem.dishItem,
                             maxDishItemsQuantity: maxDishItemsQuantity,
                             dishQuantity: dishQuantity)

        cell.bindDecrementToView = { [weak self] in
            self?.viewModel.inputs.decrementDishItemsQuantityBy(dishItem: cartItem.dishItem)
        }

        cell.bindIncrementToView = { [weak self] in
            self?.viewModel.inputs.incrementDishItemsQuantityBy(dishItem: cartItem.dishItem)
        }

        return cell
    }
}
