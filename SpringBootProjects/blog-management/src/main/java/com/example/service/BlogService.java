package com.example.service;

import com.example.entity.Blog;
import com.example.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;
    
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }
    
    public Page<Blog> getPaginatedBlogs(Pageable pageable) {
        return blogRepository.findAll(pageable);
    }
    
    public Blog getBlogById(int id) {
        return blogRepository.findById(id).orElse(null);
    }
    
    public List<Blog> getBlogsByAuthor(String author) {
        return blogRepository.findByAuthor(author);
    }
    
    public Blog addBlog(Blog blog) {
        return blogRepository.save(blog);
    }
    
    public Blog updateBlog(int id, Blog blog) {
        blog.setId(id);
        return blogRepository.save(blog);
    }
    
    public void deleteBlog(int id) {
        blogRepository.deleteById(id);
    }
}