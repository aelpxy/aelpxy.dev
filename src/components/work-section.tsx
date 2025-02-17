interface WorkSectionSectionProps<T> {
  title: string
  items: T[]
  CardComponent: React.FC<T>
}

const WorkSection = ({
  title,
  items,
  CardComponent,
}: WorkSectionSectionProps<any>) => (
  <div className='w-full md:w-1/2 md:pr-4 mb-8 md:mb-0'>
    <h2 className='text-neutral-100 text-2xl font-[500] mb-6'>{title}</h2>
    {items.map((item, index) => (
      <CardComponent key={index} {...item} />
    ))}
  </div>
)

export default WorkSection
