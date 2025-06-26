import { ApplePay, FaceBook, Github, GooglePay, Insta, MasterCard, Paypal, Twitter, Visa } from "./ui/icons";

export default function Footer() {
    return (
        <footer className="relative">
            <div className="max-w-96 md:max-w-[78rem] my-0 mx-auto">
                <div
                    className="bg-black rounded-3xl flex flex-col md:flex-row justify-between items-center px-6 py-8 md:px-16 md:py-11 mb-14">
                    <h1 className="text-white text-4xl w-full mb-8 md:w-1/2 font-display">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
                    <form className="w-full md:w-1/3">
                        <label className={`relative block`} htmlFor="email_footer"></label>
                        <input id="email_footer" className="bg-white text-black rounded-full w-full py-3 pl-14 mb-3"
                            type="text"
                            placeholder="Enter your email address" />
                        <button className="bg-white text-black rounded-full w-full py-3">Subscribe to Newsletter
                        </button>
                    </form>
                </div>
                <div className="w-full flex flex-col md:flex-row justify-between items-start">
                    <div className="w-full md:w-1/4 mb-6">
                        <h1 className="text-4xl mb-6 font-display">AURORE</h1>
                        <p className="text-lg mb-9 text-[#606060]">We have clothes that suits your style and which you’re proud to
                            wear. From women to men.</p>
                        <div className="flex gap-4">
                            <Twitter />
                            <FaceBook />
                            <Insta />
                            <Github />
                        </div>
                    </div>
                    <div className="text-sm mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-10">
                        <div>
                            <h3 className="mb-7 font-bold">COMPANY</h3>
                            <a className="block mb-5" href="#">About</a>
                            <a className="block mb-5" href="#">Features</a>
                            <a className="block mb-5" href="#">Works</a>
                            <a className="block mb-5" href="#">Career</a>
                        </div>
                        <div>
                            <h3 className="mb-7 font-bold">HELP</h3>
                            <a className="block mb-5" href="#">Customers Support</a>
                            <a className="block mb-5" href="#">Delivery Details</a>
                            <a className="block mb-5" href="#">Terms & Conditions</a>
                            <a className="block mb-5" href="#">Privacy Policy</a>
                        </div>
                        <div>
                            <h3 className="mb-7 font-bold">FAQ</h3>
                            <a className="block mb-5" href="#">Account</a>
                            <a className="block mb-5" href="#">Manage Deliveries</a>
                            <a className="block mb-5" href="#">Orders</a>
                            <a className="block mb-5" href="#">Payments</a>
                        </div>
                        <div>
                            <h3 className="mb-7 font-bold">RESOURCES</h3>
                            <a className="block mb-5" href="#">Free eBooks</a>
                            <a className="block mb-5" href="#">Development Tutorial</a>
                            <a className="block mb-5" href="#">How to - Blog</a>
                            <a className="block mb-5" href="#">Youtube playlist</a>
                        </div>
                    </div>
                </div>
                <hr className="mt-12 mb-6" />
                <div className="flex flex-col md:flex-row justify-between items-center pb-20">
                    <div className="mb-4 md:mb-0 text-sm text-[#606060}">
                        Aurore © 2025, All Rights Reserved
                    </div>
                    <div className="flex">
                        <Visa
                            width={66}
                            height={49}
                        />
                        <MasterCard
                            width={66}
                            height={49}
                        />
                        <Paypal
                            width={66}
                            height={49}
                        />
                        <ApplePay
                            width={66}
                            height={49}
                        />
                        <GooglePay
                            width={66}
                            height={49}
                        />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[rgba(240,240,240,1)] -z-10 h-5/6"></div>
            </div>
        </footer>
    );
}