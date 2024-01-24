//
//  SelectItemViewModel.swift
//  iEat
//
//  Created by Ihor on 18.10.2021.
//

import Foundation

protocol SelectItemViewModelType: AnyObject {
    var inputs: SelectItemViewModelInputs { get }
    var outputs: SelectItemViewModelOutputs { get }
}

protocol SelectItemViewModelInputs: AnyObject {
    var selectedCells: [CartItem] { get set }
}

protocol SelectItemViewModelOutputs: AnyObject {
}

final class SelectItemViewModel: SelectItemViewModelType,
                                 SelectItemViewModelInputs,
                                 SelectItemViewModelOutputs {
    var selectedCells: [CartItem] = []
    var inputs: SelectItemViewModelInputs { return self }
    var outputs: SelectItemViewModelOutputs { return self }
}
