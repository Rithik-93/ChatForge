import PageTitle from "@/components/PageTitle"
import SourcesMain from "@/components/Sources/SourcesMain"

const Sources = () => {
  return (
    <main className="flex flex-col items-center justify-center container mx-auto py-6 w-full max-w-7xl">
      <PageTitle buttonHide={true} title="Sources" children="" variant="" />
      <SourcesMain/>
    </main>
  )
}

export default Sources
