//
//  EventsCell.swift
//  iEat
//
//  Created by Igor Vasyliev on 6/5/21.
//

import UIKit

final class EventsCell: UICollectionViewCell {
    static let identifier = "EventsCell"
    private let gradient = CAGradientLayer()

    private enum Const {
        static let eventsConstraint: CGFloat = 10
        static let eventsWidthConstraintMultiplier: CGFloat = 0.9
        static let descriptionFontSize: CGFloat = 14
        static let titleFontSize: CGFloat = 18
        static let cellCornerRadius: CGFloat = 12
    }

    private var eventDescription: UILabel = {
        let descriptionLbl = UILabel()
        descriptionLbl.textColor = .white
        descriptionLbl.font = descriptionLbl.font.withSize(Const.descriptionFontSize)
        descriptionLbl.numberOfLines = 0
        descriptionLbl.translatesAutoresizingMaskIntoConstraints = false
        return descriptionLbl
    }()

    private var title: UILabel = {
        let titleLbl = UILabel()
        titleLbl.textColor = .white
        titleLbl.font = titleLbl.font.withSize(Const.titleFontSize)
        titleLbl.translatesAutoresizingMaskIntoConstraints = false

        return titleLbl
    }()

    private let background: UIImageView = {
        let backgroundImageView = UIImageView()
        backgroundImageView.translatesAutoresizingMaskIntoConstraints = false
        backgroundImageView.contentMode = .scaleAspectFill
        backgroundImageView.clipsToBounds = true
        backgroundImageView.layer.cornerRadius = Const.cellCornerRadius

        return backgroundImageView
    }()

    override init(frame: CGRect) {
        super.init(frame: .zero)
        contentView.addSubview(background)
        contentView.addSubview(eventDescription)
        contentView.addSubview(title)
        setupConstraints()
        setupGradient()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    override func layoutSubviews() {
        gradient.frame = background.bounds
    }

    func setUpEventsCell(title: String, eventDescription: String, backgroundImageName: String) {
        self.eventDescription.text = eventDescription
        self.title.text = title
        background.image = UIImage(named: backgroundImageName)
    }

    private func setupGradient() {
        let startColor = UIColor.clear.cgColor
        let endColor = UIColor.black.cgColor
        gradient.colors = [startColor, endColor]
        gradient.startPoint = .init(x: 0.5, y: 0)
        gradient.endPoint = .init(x: 0.5, y: 1.3)
        background.layer.addSublayer(gradient)
    }

    private func setupConstraints() {
        NSLayoutConstraint.activate([
            background.topAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.topAnchor),
            background.leadingAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.leadingAnchor),
            background.trailingAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.trailingAnchor),
            background.bottomAnchor.constraint(equalTo: contentView.safeAreaLayoutGuide.bottomAnchor),

            eventDescription.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -Const.eventsConstraint),
            eventDescription.leftAnchor.constraint(equalTo: contentView.leftAnchor, constant: Const.eventsConstraint),
            eventDescription.widthAnchor.constraint(equalTo: contentView.widthAnchor, multiplier: Const.eventsWidthConstraintMultiplier),

            title.bottomAnchor.constraint(equalTo: eventDescription.topAnchor, constant: -5),
            title.leftAnchor.constraint(equalTo: contentView.leftAnchor, constant: Const.eventsConstraint),
            title.widthAnchor.constraint(equalTo: contentView.widthAnchor, multiplier: Const.eventsWidthConstraintMultiplier)
        ])
    }
}
