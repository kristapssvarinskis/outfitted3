import AuthForm from "./components/AuthForm"

export default function Home() {
  return (
    <main className="flex items-center justify-center bg-neutral-600 min-h-screen">
      <div className="bg-neutral-700 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-neutral-300 text-2xl font-bold mb-4 text-center">Welcome to Outfitted</h2>
        <p className="mb-6 text-lg text-center">
          Sign in to start organizing your outfits!
        </p>
        <AuthForm />
      </div>
    </main>
  )
}
