import SignOutButton from "../components/SignOutButton";

export default function Home() {
    return (
        <main className="min-h-screen bg-neutral-600 text-neutral-300 relative">
            <div className="absolute top-4 right-4">
                <SignOutButton/>
            </div>
            <button className="bg-neutral-700 text-neutral-400 font-bold py-2 px-4 rounded hover:bg-neutral-800 absolute top-4 right-36">Profile</button>
            <div className="bg-neutral-600 p-3 h-20 text-2xl border-b-4 border-neutral-700 shadow-lg">
                <a className="flex items-center justify-between p-3" href="/">Outfitted</a>
            </div>
            <div className="grid gap-4 grid-cols-4 grid-rows-1 items-center justify-center pt-60">
                <div className="flex flex-col items-center">
                    <button><a href="./upload"><div className="grid grid-cols-2 place-items-center h-80 w-80 p-4 rounded-2xl shadow-xl bg-neutral-700 hover:blur-sm relative">
                        <img className="flex items-center justify-around ml-36" src="addicon.svg"></img>
                    </div></a></button>
                </div>
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-2 place-items-center h-80 w-80 p-4 rounded-2xl shadow-xl bg-neutral-700 hover:blur-sm relative">
                        <img className="flex items-center justify-around ml-36" src="closeticon.svg"></img>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-2 place-items-center h-80 w-80 p-4 rounded-2xl shadow-xl bg-neutral-700 hover:blur-sm relative">
                        <img className="flex items-center justify-around ml-36" src="outfiticon.svg"></img>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-2 place-items-center h-80 w-80 p-4 rounded-2xl shadow-xl bg-neutral-700 hover:blur-sm relative">
                        <img className="flex items-center justify-around ml-36" src="createicon.svg"></img>
                    </div>
                </div>
            </div>
        </main>
    )
}