import Image from 'next/image';
import logo from '../public/go-player.png';

const Logo = () => {
    return (
        <div className="flex justify-center items-center mb-4 mix-blend-opacity">
            <Image src={logo} alt="Logo" width={250} height={300} />
        </div>
    );
};

export default Logo;
