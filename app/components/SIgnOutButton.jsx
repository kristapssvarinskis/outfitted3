export default function SingOutButton(){
    return (
        <form action="/auth/signout" method="post">
            <button 
            type="submit"
            className="bg-neutral-700 text-neutral-400 font-bold py-2 px-4 rounded hover:bg-neutral-800"
            >
                Sign Out
            </button>
        </form>
    )
}