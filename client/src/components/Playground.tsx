import { SidebarDemo } from './DotBackgroundDemo'
import PageTitle from './PageTitle'

const Playground = () => {
  return (
    <div className='flex items-center justify-center'>

      <div className="px-4 py-8 w-full max-w-5xl">
        <PageTitle title="Playground" buttonHide={false} variant="outline" children="compare" />
        <div className="w-full max-w-[992px] h-[400px] sm:h-[400px] md:h-[420px] lg:h-[440px] xl:h-[460px] 2xl:h-[480px] border-1 border-gray-300 rounded-lg relative overflow-hidden">
          <SidebarDemo />
        </div>
      </div>
    </div>
  )
}

export default Playground
