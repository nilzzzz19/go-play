const Welcome = ({username}) => {

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-semibold">Welcome, {username}!</h1>
            <p className="text-lg mt-4">You have successfully logged in.</p>
            {/* You can add more content here, such as links to different parts of your application. */}
        </div>
        );
}
export default Welcome;