//
//  PostViewModel.swift
//  Derp
//
//  Created by Zaid Raza on 05/08/2021.
//

import Foundation

protocol PostDelegate: AnyObject {
    func showPost(post: Post)
}

class PostViewModel {
    
    var subreddits = ["aww", "animalsbeingderps", "rarepuppers", "happywoofgifs", "whatswrongwithyourdog", "petsareamazing"]
    
    weak var delegate: PostDelegate?
    
    func loadData() {
        guard let subreddit = subreddits.randomElement(),
              let url = URL(string: "http://www.reddit.com/r/\(subreddit)/random.json?limit=1") else {
            print("Invalid URL")
            return
        }
        
        let request = URLRequest(url: url)
        
        URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
            if let data = data,
               let posts = try? JSONDecoder().decode([Post].self, from: data),
               let post = posts.first,
               self?.isValidPost(post: post) == true {
                DispatchQueue.main.async {
                    self?.delegate?.showPost(post: post)
                }
            }
            else {
                self?.loadData()
            }
        }.resume()
    }
    
    func isValidPost(post: Post) -> Bool{
        if post.data.children.first?.data.url?.hasSuffix(".jpg") == true
            || post.data.children.first?.data.url?.hasSuffix(".jpeg") == true
            || post.data.children.first?.data.url?.hasSuffix(".png") == true {
            return true
        }
        else if post.data.children.first?.data.secureMedia?.redditVideo.hlsUrl != nil {
            return true
        }
        return false
    }
}