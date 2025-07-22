import { useState } from 'react'
import { supabase } from '../client'
import './CreatePost.css'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", author: "", description: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
        
        console.log('Form submitted with data:', post);
        console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
        console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
        console.log('Supabase client:', supabase);

        // Check if environment variables are set
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
            alert('Missing Supabase environment variables. Please check your .env file.');
            return;
        }

        try {
            console.log('Attempting to insert into Posts table...');
            const { data, error } = await supabase
                .from('posts')
                .insert({title: post.title, author: post.author, description: post.description, betcount: 0})
                .select();

            if (error) {
                console.error('Supabase error details:', error);
                alert('Error creating post: ' + (error.message || error.details || 'Unknown error'));
                return;
            }

            console.log('Post created successfully:', data);
            alert('Post created successfully!');
            window.location = "/";
        } catch (err) {
            console.error('Unexpected error:', err);
            alert('Unexpected error: ' + (err.message || 'Unknown error'));
        }
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost