//
//  RemoveItemAlertController.swift
//  iEat
//
//  Created by Igor Vasyliev on 6/30/21.
//

import UIKit

final class RemoveItemAlertController: UIViewController {
    private enum Const {
        static let cornerRadius: CGFloat = 15
        static let buttonNoColor = UIColor(red: 211, green: 227, blue: 253, alpha: 1)
        static let overlayColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.5)
        static let blueColor = UIColor(red: 0, green: 122, blue: 255, alpha: 1)
        static let buttonHeight: CGFloat = 52
        static let sidesIndent: CGFloat = 10
        static let verticalIndent: CGFloat = 20
    }

    private var popUpButtonYes: UIButton = {
        let button = UIButton()
        button.setTitle("Yes", for: .normal)
        button.backgroundColor = Const.blueColor
        button.layer.cornerRadius = Const.cornerRadius
        button.addTarget(self, action: #selector(buttonYesClicked), for: .touchUpInside)
        return button
    }()

    private var popUpButtonNo: UIButton = {
        let button = UIButton()
        button.setTitle("No", for: .normal)
        button.backgroundColor = Const.buttonNoColor
        button.setTitleColor(Const.blueColor, for: .normal)
        button.layer.cornerRadius = Const.cornerRadius
        button.addTarget(self, action: #selector(buttonNoClicked), for: .touchUpInside)
        return button
    }()

    private var popUpView: UIView = {
        let view = UIView()
        view.backgroundColor = .white
        view.layer.cornerRadius = 15
        return view
    }()

    private var popUpTitle: UILabel = {
        let title = UILabel()
        title.text = "Delete this item?"
        title.textAlignment = .center
        return title
    }()

    private var overlayView: UIView = {
        let view = UIView()
        view.backgroundColor = Const.overlayColor
        return view
    }()

    private var stackViewButtons: UIStackView = {
        let stackView = UIStackView()
        stackView.axis  = .horizontal
        stackView.distribution  = .equalSpacing
        stackView.alignment = .center
        return stackView
    }()

    private var stackViewGeneral: UIStackView = {
        let stackView = UIStackView()
        stackView.axis  = .vertical
        stackView.distribution  = .equalSpacing
        stackView.alignment = .center
        return stackView
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(overlayView)

        stackViewButtons.addArrangedSubview(popUpButtonYes)
        stackViewButtons.addArrangedSubview(popUpButtonNo)
        stackViewGeneral.addArrangedSubview(popUpTitle)
        stackViewGeneral.addArrangedSubview(stackViewButtons)

        popUpView.addSubview(stackViewGeneral)

        view.addSubview(popUpView)
        setupConstraints()
    }

    @objc func buttonYesClicked() {
        self.dismiss(animated: false, completion: nil)
    }

    @objc func buttonNoClicked() {
        self.dismiss(animated: false, completion: nil)
    }

    private func setupConstraints() {
        overlayView.translatesAutoresizingMaskIntoConstraints = false
        popUpView.translatesAutoresizingMaskIntoConstraints = false
        stackViewGeneral.translatesAutoresizingMaskIntoConstraints = false
        stackViewButtons.translatesAutoresizingMaskIntoConstraints = false
        popUpTitle.translatesAutoresizingMaskIntoConstraints = false
        popUpButtonYes.translatesAutoresizingMaskIntoConstraints = false
        popUpButtonNo.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate(
            [
                overlayView.topAnchor.constraint(equalTo: view.topAnchor),
                overlayView.leftAnchor.constraint(equalTo: view.leftAnchor),
                overlayView.rightAnchor.constraint(equalTo: view.rightAnchor),
                overlayView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

                popUpButtonYes.widthAnchor.constraint(equalToConstant: view.frame.size.width/2.7),
                popUpButtonYes.heightAnchor.constraint(equalToConstant: Const.buttonHeight),

                popUpButtonNo.widthAnchor.constraint(equalToConstant: view.frame.size.width/2.7),
                popUpButtonNo.heightAnchor.constraint(equalToConstant: Const.buttonHeight),

                popUpTitle.widthAnchor.constraint(equalToConstant: 150),
                popUpTitle.heightAnchor.constraint(equalToConstant: 20),

                popUpView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
                popUpView.heightAnchor.constraint(equalToConstant: 140),
                popUpView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
                popUpView.centerYAnchor.constraint(equalTo: view.centerYAnchor),

                stackViewButtons.leftAnchor.constraint(equalTo: stackViewGeneral.leftAnchor, constant: Const.sidesIndent),
                stackViewButtons.rightAnchor.constraint(equalTo: stackViewGeneral.rightAnchor, constant: -Const.sidesIndent),
                stackViewButtons.bottomAnchor.constraint(equalTo: stackViewGeneral.bottomAnchor),

                stackViewGeneral.topAnchor.constraint(equalTo: popUpView.topAnchor, constant: Const.verticalIndent),
                stackViewGeneral.leftAnchor.constraint(equalTo: popUpView.leftAnchor, constant: Const.sidesIndent),
                stackViewGeneral.rightAnchor.constraint(equalTo: popUpView.rightAnchor, constant: -Const.sidesIndent),
                stackViewGeneral.bottomAnchor.constraint(equalTo: popUpView.bottomAnchor, constant: -Const.verticalIndent)
            ]
        )
    }
}
