import { Link } from 'next-view-transitions'
import Tooltip from './tooltip'

interface WorkItem {
  name: string
  role: string
  description: string
  link: string
}

const WorkCard: React.FC<WorkItem> = ({ name, role, description, link }) => (
  <div className='mb-6'>
    <h3 className='text-neutral-100 text-lg'>
      <Link href={link} target='_blank' rel='noopener noreferrer'>
        <Tooltip text={link}>
          <span className='hover:text-neutral-400 transition-all'>{name}</span>
        </Tooltip>
      </Link>
    </h3>
    <p className='text-neutral-400 text-sm'>{role}</p>
    <p className='text-neutral-200 text-sm mt-2'>{description}</p>
  </div>
)

export default WorkCard
