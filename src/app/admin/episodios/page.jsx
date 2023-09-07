import Image from "next/image"

export default async function TaskPage() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Episodios rick and morty!</h2>
            <p className="text-muted-foreground">
              Lista de todos los episodios de rick y morty
            </p>
          </div>
        </div>
        
        {/* {Datatable} */}
      </div>
    </>
  )
}