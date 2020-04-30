import React, {useState} from 'react'
import './App.css'
import {useSelector, useDispatch} from 'react-redux'
import {loginUser, logoutUser} from './ducks/user'
import {addPost, deleteLast} from './ducks/posts'

const Login = () => {
	const dispatch = useDispatch()
	const [name, setName] = useState('')
	const [followers, setFollowers] = useState('')
	const user = {avatar: "https://i.picsum.photos/id/902/200/200.jpg", name, followers}
	
	return (
		<form>
			<p>Name
				<input type='text' value={name} onChange={e => setName(e.target.value)}/>
			</p>
			<p>Number of followers
				<input type='text' value={followers} onChange={e => setFollowers(e.target.value)}/>
			</p>
			<button type='button' onClick={() => dispatch(loginUser(user))}>Submit</button>
		</form>
	)
}

const UserAvatar = ({size}) => {
	const user = useSelector(state => state.user)
	return (
		<img
			className={`user-avatar ${size || ""}`}
			alt="user avatar"
			src={user.avatar}
		/>
	)
}

const UserStats = () => {
	const user = useSelector(state => state.user)
	return (
		<div className="user-stats">
			<div>
				<UserAvatar user={user}/>
				{user.name}
			</div>
			<div className="stats">
				<div>{user.followers} Followers</div>
			</div>
		</div>
	)
}

const Nav = () => {
	const dispatch = useDispatch()
	const handleAddPost = () =>
		dispatch(addPost({title: `post ${Math.floor(Math.random() * 1e6)}`, content: 'some content'}))
	
	return (
		<div className="nav">
			<UserAvatar size="small"/>
			<button onClick={() => dispatch(logoutUser())}>Log out</button>
			<button onClick={handleAddPost}>Add Post</button>
			<button onClick={() => dispatch(deleteLast())}>Delete last post</button>
		</div>
	)
}

const Content = () => {
	const posts = useSelector(state => state.posts)
	
	return (
		<div className="content">
			{posts.map((post, inx) => <p key={inx}>{post.title}</p>)}
		</div>
	)
}

const Sidebar = ({children}) =>
	<div className="sidebar">{children}</div>

const Body = ({sidebar, content}) =>
	<div className="body">
		<Sidebar>{sidebar}</Sidebar>
		{content}
	</div>

const Page = () =>
	<div className="app">
		<Nav/>
		<Body
			sidebar={<UserStats/>}
			content={<Content/>}
		/>
	</div>

const App = () => {
	const user = useSelector(s => s.user)
	return <>
		{user ? <Page/> : <Login/>}
	</>
}

export default App
