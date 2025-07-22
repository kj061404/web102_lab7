import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Card from '../components/Card'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        // READ all posts from table
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('posts')
                .select()
                .order('created_at', { ascending: true })

            // set state of posts
            setPosts(data)
        }
        
        fetchPosts()
    }, [])
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => a.id - b.id)
                .map((post,index) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        title={post.title}
                        author={post.author}
                        description={post.description}
                        betCount={post.betcount}
                    />
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts