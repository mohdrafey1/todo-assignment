import Header from './components/Header';
import TodoList from './components/todoList';

function App() {
    return (
        <div className="bg-indigo-50 dark:bg-gray-900">
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <TodoList />
            </div>
        </div>
    );
}

export default App;
