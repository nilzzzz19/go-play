
const Background = ({children}) => {
    return(
        <div className="relative min-h-screen">
        <video autoPlay loop muted playsInline className="absolute z-10 w-full h-full object-cover">
            <source src="https://mdbcdn.b-cdn.net/img/video/forest.mp4" type="video/mp4" loop class = "hover-to-play w-100" />
            Your browser does not support the video tag.
        </video>
        <div className="relative z-20">
            {children}
        </div>
    </div>
    );
};

export default Background;