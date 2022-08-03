import Image from "next/image";
import Link from "next/link";

export default function Logo(){
    return (
        <Link href="/">
          <a className="logo">
            <Image 
              src="https://logos-marques.com/wp-content/uploads/2021/03/Amazon-logo.png"
              layout="fill"
            />
          </a>
        </Link>
    );
}