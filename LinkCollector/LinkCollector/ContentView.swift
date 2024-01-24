//
//  ContentView.swift
//  LinkCollector
//
//  Created by ihor on 30.08.2022.
//

import SwiftUI
import LinkPresentation

struct ContentView: View {
    @State var redrawPreview = false
    let links: [StringLink]  = [
        StringLink(string: "https://betterprogramming.pub/ios-13-rich-link-previews-with-swiftui-e61668fa2c69"),
        StringLink(string: "https://djinni.co/"),
        StringLink(string: "https://www.facebook.com/"),
        StringLink(string: "https://www.youtube.com/"),
        StringLink(string: "https://www.apple.com/")
    ]
    var body: some View {
        List(links){ l in
            LinkRow(previewURL: URL(string: l.string)!, redraw: self.$redrawPreview)
        }
        .environment(\.defaultMinListRowHeight, 200)
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
