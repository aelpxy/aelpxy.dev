const IconItem = ({
  Icon,
  children,
}: {
  Icon: React.ComponentType<any>
  children: React.ReactNode
}) => {
  return (
    <div className='flex items-center mb-2'>
      <Icon className='text-neutral-400/90 w-[1.2rem] mr-2' />
      <span className='text-neutral-300'>{children}</span>
    </div>
  )
}

export default IconItem
