import PhotoGrid from "../components/PhotoGrid";
import PhotoUploader from "../components/PhotoUploader";
import SignOutButton from "../components/SignOutButton";

export default function Photos(){
    return (
        <main className="min-h-screen bg-neutral-600 text-neutral-300 relative">
            <div className="absolute top-4 right-4">
                <SignOutButton/>
            </div>
            <div className="bg-neutral-600 p-3 h-20 text-2xl border-b-4 border-neutral-700 shadow-lg">
                <a className="flex items-center justify-between p-3" href="/">Outfitted</a>
            </div>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col items-center mb-6">
                        <h1 className="text-4xl font-bold mb-4">Photos</h1>
                        <PhotoUploader/>
                    </div>
                    <PhotoGrid/>
                </div>
        </main>
    )
}