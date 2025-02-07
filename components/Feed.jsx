"use client";

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard 
          key={index}
          post = {post}
          handleTagClick = {handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, []); // your component needs to do something after render. In summary, the empty array ensures the effect runs only once, while passing dependencies will cause the effect to re-run whenever those dependencies change.
  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input 
          type = "text"
          placeholder = "Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data = {posts}
        handleTagClick = {() => {}}
      />
    </section>
  )
}

export default Feed