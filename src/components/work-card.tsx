'use client'

interface WorkItem {
  name: string
  role: string
  description: string
}

const WorkCard: React.FC<WorkItem> = ({ name, role, description }) => (
  <div className='mb-6'>
    <h3 className='text-neutral-100 text-lg'>{name}</h3>
    <p className='text-neutral-400 text-sm'>{role}</p>
    <p className='text-neutral-200 text-sm mt-2'>{description}</p>
  </div>
)

export default WorkCard
