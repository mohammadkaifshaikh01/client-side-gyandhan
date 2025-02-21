// import TodoList from './components/TodoList';
import TodoRender from './components/TodoRender';

// export const serverUrl = "http://localhost:5000"
export const serverUrl = "https://server-side-gyandhan.onrender.com"

function App() {
 return (
 <div className="App">
 {/* <TodoList /> */}
 <TodoRender />
 </div>
 ); 
}
export default App;