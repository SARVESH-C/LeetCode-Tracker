package com.example.controller;

import com.example.entity.Blog;
import com.example.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    
    @Autowired
    private BlogService blogService;
    
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }
    
    @GetMapping("/paginated")
    public Page<Blog> getPaginatedBlogs(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return blogService.getPaginatedBlogs(pageable);
    }
    
    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable int id) {
        return blogService.getBlogById(id);
    }
    
    @GetMapping("/author/{author}")
    public List<Blog> getBlogsByAuthor(@PathVariable String author) {
        return blogService.getBlogsByAuthor(author);
    }
    
    @PostMapping
    public Blog addBlog(@RequestBody Blog blog) {
        return blogService.addBlog(blog);
    }
    
    @PutMapping("/{id}")
    public Blog updateBlog(@PathVariable int id, @RequestBody Blog blog) {
        return blogService.updateBlog(id, blog);
    }
    
    @DeleteMapping("/{id}")
    public void deleteBlog(@PathVariable int id) {
        blogService.deleteBlog(id);
    }
}