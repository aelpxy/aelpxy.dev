'use client'

import { Plus, Square, SquareCheck, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

interface Task {
  id: string
  text: string
  completed: boolean
}

const Tasks = () => {
  const [tasks, settasks] = useState<Task[]>([])
  const [newTodo, setNewTodo] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [removingTodo, setRemovingTodo] = useState<string | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }

    const storedtasks = localStorage.getItem('tasks')
    if (storedtasks) {
      settasks(JSON.parse(storedtasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTodo = () => {
    if (newTodo.trim() !== '' && tasks.length < 15) {
      const newTaskItem: Task = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
      }
      settasks([...tasks, newTaskItem])
      setNewTodo('')
    }
  }

  const handleToggleComplete = async (id: string) => {
    settasks((prevtasks) =>
      prevtasks.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleRemoveTodo = async (id: string) => {
    setRemovingTodo(id)
    await new Promise((resolve) => setTimeout(resolve, 100))
    settasks((prevtasks) => prevtasks.filter((todo) => todo.id !== id))
    setRemovingTodo(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
      e.preventDefault()
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10, transition: { duration: 0.1 } },
  }

  const trashVariants = {
    initial: { opacity: 1 },
    hover: { opacity: 0.8, color: '#FF5252' },
  }

  return (
    <div className='w-full'>
      <div className='relative mb-4'>
        <div className='relative select-none'>
          <input
            ref={inputRef}
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className='peer m-0 block h-[58px] w-full rounded-md border border-stone-700 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-stone-100 transition duration-150 ease-linear placeholder:text-transparent focus:border-stone-300 focus:border-2 focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-stone-100 focus:outline-none peer-focus:text-stone-300 [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]'
            placeholder='Write a task down...'
            onKeyDown={handleKeyDown}
            disabled={tasks.length >= 15}
          />
          <label className='pointer-events-none absolute left-0 top-0 origin-[0_0] border-2 border-solid border-transparent px-3 py-4 text-stone-500 transition-[opacity,_transform] duration-150 ease-linear focus:text-stone-300 peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-stone-300 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none'>
            Write a task down...
          </label>
          <button
            onClick={handleAddTodo}
            className={`absolute top-1/2 right-2 -translate-y-1/2 group hover:bg-stone-800 hover:text-stone-300 transition-all duration-300 ease-in-out
          border border-stone-700 text-stone-200 p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={tasks.length >= 15}
          >
            <Plus className='w-4 h-4' />
          </button>
        </div>
      </div>
      <ul className='space-y-2'>
        <AnimatePresence>
          {tasks.map((todo) => (
            <motion.li
              key={todo.id}
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={itemVariants}
              className={`flex items-center p-2 bg-stone-900 rounded ${
                todo.completed ? 'line-through opacity-50' : ''
              }`}
            >
              <motion.button
                onClick={() => handleToggleComplete(todo.id)}
                className={`p-1 mr-2 focus:outline-none relative  ${
                  todo.completed
                    ? 'text-green-600'
                    : 'text-stone-500 hover:text-stone-400'
                }`}
              >
                <AnimatePresence>
                  {todo.completed && <SquareCheck className='w-5 h-5' />}
                  {!todo.completed && <Square className='w-5 h-5' />}
                </AnimatePresence>
              </motion.button>
              <span className='flex-grow text-stone-200'>{todo.text}</span>
              <motion.button
                variants={trashVariants}
                initial='initial'
                whileHover='hover'
                onClick={() => handleRemoveTodo(todo.id)}
                className={`p-1 focus:outline-none ${
                  removingTodo === todo.id
                    ? 'text-red-600'
                    : 'text-stone-500 hover:text-stone-400'
                }`}
                disabled={removingTodo === todo.id}
              >
                <Trash2 className='w-5 h-5' />
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default Tasks
