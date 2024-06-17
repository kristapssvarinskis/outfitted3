import SignOutButton from "../components/SignOutButton";
import PhotoUpload from "../components/PhotoUpload";


export default function Clothes() {
    return (
        <main className="min-h-screen bg-neutral-600 text-neutral-300 relative">
            <div className="absolute top-4 right-4">
                <SignOutButton/>
            </div>
            <button className="bg-neutral-700 text-neutral-400 font-bold py-2 px-4 rounded hover:bg-neutral-800 absolute top-4 right-36"><a href="/profile">Profile</a></button>
            <div className="bg-neutral-600 p-3 h-20 text-2xl border-b-4 border-neutral-700 shadow-lg">
                <a className="flex items-center justify-between p-3" href="/">Outfitted</a>
            </div>
            <div>
                <PhotoUpload/>
            </div>
        </main>
    )
}           