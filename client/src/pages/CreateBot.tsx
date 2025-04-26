import Navbar from '@/components/Navbar'
import PageTitle from '@/components/PageTitle'
import SourcesMain from '@/components/Sources/SourcesMain'

const CreateBot = () => {
  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center justify-center container mx-auto py-6 w-full max-w-7xl'>
      <PageTitle title="Create Bot" buttonHide={true} children='' variant='' />
      <SourcesMain/>
      </div>
    </div>
  )
}

export default CreateBot
