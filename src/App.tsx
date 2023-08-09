import "./App.css";
import UserList from "./components/UsersList";
import img from './img.jpg';

function App() {
  
  window.localStorage.setItem("image", img);

  return (
    <div className="App">
      <UserList />
    </div>
  );
}

export default App;
