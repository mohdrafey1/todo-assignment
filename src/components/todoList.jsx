import { useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, deleteTodo, updateTodo } from '../redux/slices/todoSlice';
import { db } from '../../firebase';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import TaskCard from './TaskCard';
import toast from 'react-hot-toast'; // Import react-hot-toast

export default function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos || []);
    const user = useSelector((state) => state.auth.currentUser);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    useEffect(() => {
        if (!user) {
            console.warn('User not authenticated, skipping fetch.');
            return;
        }

        setLoading(true);
        setError('');

        const q = query(collection(db, 'todos'), where('uid', '==', user.uid));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const tasks = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                dispatch(setTodos(tasks || []));
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching tasks:', error);
                setError('Failed to fetch tasks. Please try again.');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user, dispatch]);

    const handleAddTask = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please log in to add tasks.'); // Show toast error
            return;
        }

        const newTask = {
            title: taskTitle,
            description: taskDescription,
            status: 'incomplete',
            createdAt: Date.now(),
            dueDate: taskDueDate || null,
            uid: user.uid,
        };

        try {
            const docRef = await addDoc(collection(db, 'todos'), newTask);
            setIsAddModalOpen(false);
            setTaskTitle('');
            setTaskDescription('');
            setTaskDueDate('');
            toast.success('Task added successfully!'); // Show success toast
        } catch (error) {
            console.error('Firestore write error:', error);
            toast.error('Failed to add task. Please try again.'); // Show error toast
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, 'todos', id));
            dispatch(deleteTodo(id));
            toast.success('Task deleted successfully!'); // Show success toast
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task. Please try again.'); // Show error toast
        }
    };

    const toggleStatus = async (id, status) => {
        const newStatus = status === 'incomplete' ? 'completed' : 'incomplete';
        try {
            await updateDoc(doc(db, 'todos', id), { status: newStatus });
            dispatch(updateTodo({ id, status: newStatus }));
            toast.success('Task status updated!'); // Show success toast
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update task status. Please try again.'); // Show error toast
        }
    };

    const handleEditTask = async (e) => {
        e.preventDefault();

        try {
            await updateDoc(doc(db, 'todos', currentTask.id), {
                title: taskTitle,
                description: taskDescription,
                dueDate: taskDueDate || null,
            });

            dispatch(
                updateTodo({
                    id: currentTask.id,
                    title: taskTitle,
                    description: taskDescription,
                    dueDate: taskDueDate || null,
                })
            );

            setIsEditModalOpen(false);
            setTaskTitle('');
            setTaskDescription('');
            setTaskDueDate('');
            toast.success('Task updated successfully!'); // Show success toast
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Failed to update task. Please try again.'); // Show error toast
        }
    };

    const openEditModal = (task) => {
        setCurrentTask(task);
        setTaskTitle(task.title);
        setTaskDescription(task.description || '');
        setTaskDueDate(task.dueDate || '');
        setIsEditModalOpen(true);
    };

    const toggleReadMore = (taskId) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    };

    return (
        <div className="mt-16 p-4 dark:bg-gray-900 dark:text-white min-h-screen lg:max-w-4/5">
            <div className="flex justify-center items-center">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2 hover:bg-green-600"
                >
                    <FaPlus /> Add Task
                </button>
            </div>

            <AddTaskModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddTask}
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                taskDescription={taskDescription}
                setTaskDescription={setTaskDescription}
                taskDueDate={taskDueDate}
                setTaskDueDate={setTaskDueDate}
            />

            <EditTaskModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditTask}
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                taskDescription={taskDescription}
                setTaskDescription={setTaskDescription}
                taskDueDate={taskDueDate}
                setTaskDueDate={setTaskDueDate}
            />

            {loading && (
                <div className="mt-4 flex justify-center">
                    <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
                </div>
            )}
            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div>
                {todos.length === 0 && !loading ? (
                    <p className="text-gray-500 dark:text-gray-400 mt-6 text-center text-lg">
                        No tasks available. Start by adding a task! 🚀
                    </p>
                ) : (
                    <>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Ongoing Tasks
                            </h2>
                            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {todos
                                    .filter(
                                        (task) => task.status !== 'completed'
                                    )
                                    .map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            toggleStatus={toggleStatus}
                                            openEditModal={openEditModal}
                                            deleteTask={deleteTask}
                                            expandedDescriptions={
                                                expandedDescriptions
                                            }
                                            toggleReadMore={toggleReadMore}
                                        />
                                    ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                                Completed Tasks
                            </h2>
                            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {todos
                                    .filter(
                                        (task) => task.status === 'completed'
                                    )
                                    .map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            toggleStatus={toggleStatus}
                                            openEditModal={openEditModal}
                                            deleteTask={deleteTask}
                                            expandedDescriptions={
                                                expandedDescriptions
                                            }
                                            toggleReadMore={toggleReadMore}
                                        />
                                    ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
