import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const TaskCard = ({
    task,
    toggleStatus,
    openEditModal,
    deleteTask,
    expandedDescriptions,
    toggleReadMore,
}) => {
    return (
        <li
            className={`bg-white dark:bg-gray-800 group p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ease-in-out ${
                task.description ? 'h-auto' : 'h-44'
            }`}
        >
            <div className="flex flex-col space-y-4 ">
                <div className="flex justify-between items-center">
                    <span
                        className={`text-lg font-semibold ${
                            task.status === 'completed'
                                ? 'line-through text-gray-400 dark:text-gray-500'
                                : 'text-gray-900 dark:text-white'
                        }`}
                    >
                        {task.title.length > 20
                            ? task.title.substring(0, 20) + '...'
                            : task.title}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">
                        {task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}
                    </span>
                </div>

                {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {expandedDescriptions[task.id]
                            ? task.description
                            : task.description.substring(0, 100) + '.'}
                        {task.description.length > 100 && (
                            <button
                                onClick={() => toggleReadMore(task.id)}
                                className="text-blue-500 hover:text-blue-600 ml-2"
                            >
                                {expandedDescriptions[task.id]
                                    ? 'Read Less'
                                    : 'Read More'}
                            </button>
                        )}
                    </p>
                )}

                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Created At: {new Date(task.createdAt).toLocaleString()}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={() => toggleStatus(task.id, task.status)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                            task.status === 'completed'
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        aria-label="Toggle Task Status"
                    >
                        <FaCheck className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => openEditModal(task)}
                        className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300"
                        aria-label="Edit Task"
                    >
                        <FaEdit className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                        aria-label="Delete Task"
                    >
                        <FaTrash className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default TaskCard;
