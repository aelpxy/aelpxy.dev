import { Link } from 'next-view-transitions'
import Tooltip from './tooltip'

interface ProjectItem {
  name: string
  role: string
  description: string
  slug: string
}

const ProjectCard: React.FC<ProjectItem> = ({
  name,
  role,
  description,
  slug,
}) => (
  <div className='mb-6'>
    <h3 className='text-neutral-100 text-lg'>
      <Link
        href={`https://github.com/${slug}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Tooltip text={`https://github.com/${slug}`}>
          <span className='hover:text-neutral-400 transition-all'>{name}</span>
        </Tooltip>
      </Link>
    </h3>
    <p className='text-neutral-400 text-sm'>{role}</p>
    <p className='text-neutral-200 text-sm mt-2'>{description}</p>
  </div>
)

export default ProjectCard
