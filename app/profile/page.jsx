import SignOutButton from "../components/SignOutButton";
import ProfilePage from "../components/ProfilePage";

export default function Home() {
    return (
        <main className="min-h-screen bg-neutral-600 text-neutral-300 relative">
            <div className="absolute top-4 right-4">
                <SignOutButton/>
            </div>
            <div className="bg-neutral-600 p-3 h-20 text-2xl border-b-4 border-neutral-700 shadow-lg">
                <a className="flex items-center justify-between p-3" href="/">Outfitted</a>
            </div>
            <div>
                <ProfilePage/>
            </div>
        </main>
    )
}