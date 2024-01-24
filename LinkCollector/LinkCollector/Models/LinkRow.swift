//
//  LinkRow.swift
//  LinkCollector
//
//  Created by ihor on 30.08.2022.
//
import SwiftUI
import LinkPresentation

struct LinkRow : UIViewRepresentable {
    
    var previewURL:URL
    
    @Binding var redraw: Bool
    
    func makeUIView(context: Context) -> LPLinkView {
        let view = LPLinkView(url: previewURL)
        
        let provider = LPMetadataProvider()
        provider.startFetchingMetadata(for: previewURL) { (metadata, error) in
            if let md = metadata {
                DispatchQueue.main.async {
                    view.metadata = md
                    view.sizeToFit()
                    self.redraw.toggle()
                }
            }
            else if error != nil
            {
                let md = LPLinkMetadata()
                md.title = "Custom title"
                view.metadata = md
                view.sizeToFit()
                self.redraw.toggle()
            }
        }
        
        return view
    }
    
    func updateUIView(_ view: LPLinkView, context: Context) {
        // New instance for each update
    }
}

