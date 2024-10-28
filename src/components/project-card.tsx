'use client'

interface ProjectItem {
  name: string
  role: string
  description: string
}

const ProjectCard: React.FC<ProjectItem> = ({ name, role, description }) => (
  <div className='mb-6'>
    <h3 className='text-stone-100 text-lg'>{name}</h3>
    <p className='text-stone-400 text-sm'>{role}</p>
    <p className='text-stone-200 text-sm mt-2'>{description}</p>
  </div>
)

export default ProjectCard
