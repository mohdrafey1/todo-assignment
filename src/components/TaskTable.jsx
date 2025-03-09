import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const TaskTableRow = ({
    task,
    toggleStatus,
    openEditModal,
    deleteTask,
    expandedDescriptions,
    toggleReadMore,
}) => {
    return (
        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
            <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                <span
                    className={`text-lg font-semibold ${
                        task.status === 'completed'
                            ? 'line-through text-gray-400 dark:text-gray-500'
                            : 'text-gray-900 dark:text-white'
                    }`}
                >
                    {task.title}
                </span>
            </td>

            <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 whitespace-normal break-words">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {expandedDescriptions[task.id]
                        ? task.description
                        : task.description.substring(0, 25) + '...'}
                    {task.description.length > 25 && (
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
            </td>

            <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {task.dueDate ? task.dueDate : 'No due date'}
                </span>
            </td>

            <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(task.createdAt).toLocaleString()}
                </span>
            </td>

            <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                <div className="flex items-center space-x-2">
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
            </td>
        </tr>
    );
};

export default TaskTableRow;
