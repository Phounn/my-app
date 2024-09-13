import React, {useState} from 'react'
import styles from './BlogPost.css'
const BlogPost = (props) => {
    const [like, setLike] = useState(0)
    return (
        <div className='container'>
            <div className='nav-profile'>
                <img src='https://imgs.search.brave.com/MtQTpNilx6APA_PLNw2hU9Pge4iOxK0mtWu4XmwVrd8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaWN5LXZlaW5z/LmNvbS9pbWFnZXMv/Z2Vuc2hpbi1pbXBh/Y3QvY2hhcmFjdGVy/cy9mdXJpbmEud2Vi/cA' id='profile'></img>
                <p>Mr. Phounngeun Santhsith</p>
            </div>
            <div className='main-container'>
                <p>
                    {props.person} has returned, or she will be rerun on Thursday. She is the most cutest person in the world.
                </p>
                <img src='https://imgs.search.brave.com/MaA7gJTURyVaSS8-HldZsk6IdcO-3SPaJsb1QyVgxzw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjMvMTAv/Z2Vuc2hpbi1pbXBh/Y3QtNC0wLXJlbGVh/c2UtZGF0ZS1mb250/YWluZS1jYXN0bGUt/MS5qcGc'></img>
            </div>
            <div className='footer'>
                <button onClick={() => {
                    setLike(like + 1)
                }}>
                    <img src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"></img>
                </button>
                <p>{like}</p>
            </div>
        </div>
    )
}
export default BlogPost
