import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle, Clock, ListTodo, MoveRight, Sparkles } from 'lucide-react';

export default function KanbanWidgetModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [columns, setColumns] = useState({
    todo: [
      { id: '1', title: 'Integrate Mapbox Geocoding API', priority: 'High', tag: 'Backend' },
      { id: '2', title: 'Implement JWT Session Auth', priority: 'Medium', tag: 'Security' },
    ],
    inProgress: [
      { id: '3', title: 'Design Cosmic Dark UI Theme', priority: 'Urgent', tag: 'Frontend' },
      { id: '4', title: 'Solve 5 Dynamic Programming Problems', priority: 'High', tag: 'Algorithms' },
    ],
    done: [
      { id: '5', title: 'Deploy StayScape on Render', priority: 'Done', tag: 'DevOps' },
      { id: '6', title: 'Qualify Flipkart GRID 8.0 Round 2', priority: 'Done', tag: 'Achievement' },
    ]
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Frontend');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      priority: 'Medium',
      tag: newTaskCategory
    };

    setColumns(prev => ({
      ...prev,
      todo: [...prev.todo, newTask]
    }));
    setNewTaskTitle('');
  };

  const moveTask = (fromCol, toCol, taskId) => {
    const taskToMove = columns[fromCol].find(t => t.id === taskId);
    if (!taskToMove) return;

    setColumns(prev => ({
      ...prev,
      [fromCol]: prev[fromCol].filter(t => t.id !== taskId),
      [toCol]: [...prev[toCol], taskToMove]
    }));
  };

  const deleteTask = (colKey, taskId) => {
    setColumns(prev => ({
      ...prev,
      [colKey]: prev[colKey].filter(t => t.id !== taskId)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0d0f19] border border-[#ff6b0044] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#ff6b0020] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1f2438]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#ff6b0020] text-[#ff8800] border border-[#ff6b0033]">
              <ListTodo className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Live Playable Kanban Board</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#ff6b001f] text-[#ff8800] border border-[#ff6b0033]">
                  Interactive Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Created by Gaurav Suryavanshi — Test adding, moving, and managing tasks in real time!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://dev-gaurav-3.github.io/Kanban-Board/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#07080e] border border-[#ff6b0044] text-xs font-semibold text-[#ffa033] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Live Site</span>
              <MoveRight className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#07080e] text-slate-400 hover:text-white hover:border-[#ff6b00] border border-[#1f2438] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add Task Input Form */}
        <form onSubmit={addTask} className="mt-4 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Type a new task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#07080e] border border-[#1f2438] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6b00]"
          />
          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-[#07080e] border border-[#1f2438] text-sm text-slate-300 focus:outline-none focus:border-[#ff6b00]"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Algorithms">Algorithms</option>
            <option value="DevOps">DevOps</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] hover:from-[#ff8800] hover:to-[#ff4500] shadow-md shadow-[#ff6b0033] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </form>

        {/* Kanban Board Columns Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 overflow-y-auto pr-1 flex-1">
          
          {/* Column: To Do */}
          <div className="bg-[#07080e]/70 border border-[#1f2438] rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1f2438]">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>To Do</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1f2438] text-amber-400">
                {columns.todo.length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {columns.todo.map((task) => (
                <div key={task.id} className="p-3.5 rounded-xl bg-[#0d0f19] border border-[#1f2438] hover:border-[#ff6b0044] transition-all group">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                    <button onClick={() => deleteTask('todo', task.id)} className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1f2438]/50 text-xs">
                    <span className="px-2 py-0.5 rounded bg-[#ff6b001a] text-[#ff8800] font-mono text-[10px]">
                      {task.tag}
                    </span>
                    <button
                      onClick={() => moveTask('todo', 'inProgress', task.id)}
                      className="inline-flex items-center gap-1 text-[#ff8800] hover:text-white font-medium text-xs transition-colors"
                    >
                      <span>Start</span>
                      <MoveRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column: In Progress */}
          <div className="bg-[#07080e]/70 border border-[#1f2438] rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1f2438]">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <Sparkles className="w-4 h-4 text-[#ff8800]" />
                <span>In Progress</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1f2438] text-[#ff8800]">
                {columns.inProgress.length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {columns.inProgress.map((task) => (
                <div key={task.id} className="p-3.5 rounded-xl bg-[#0d0f19] border border-[#ff6b0033] transition-all group">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                    <button onClick={() => deleteTask('inProgress', task.id)} className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1f2438]/50 text-xs">
                    <span className="px-2 py-0.5 rounded bg-[#ff6b001a] text-[#ff8800] font-mono text-[10px]">
                      {task.tag}
                    </span>
                    <button
                      onClick={() => moveTask('inProgress', 'done', task.id)}
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium text-xs transition-colors"
                    >
                      <span>Complete</span>
                      <CheckCircle className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column: Done */}
          <div className="bg-[#07080e]/70 border border-[#1f2438] rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1f2438]">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Done</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1f2438] text-emerald-400">
                {columns.done.length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {columns.done.map((task) => (
                <div key={task.id} className="p-3.5 rounded-xl bg-[#0d0f19] border border-[#1f2438] opacity-80 group">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold text-slate-300 line-through">{task.title}</h4>
                    <button onClick={() => deleteTask('done', task.id)} className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1f2438]/50 text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                      {task.tag}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
