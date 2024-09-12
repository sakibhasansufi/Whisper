import { useState } from "react";
import Posts from '../../components/common/Posts';
import CreatePost from './CreatePost';
import { Helmet } from "react-helmet-async";


const Home = () => {
    const [feedType, setFeedType] = useState("forYou");

    return (
        <>
        <Helmet>
            <title>Home</title>
        </Helmet>
            
            <div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
                {/* Header */}
                <div className='flex w-full border-b border-gray-700'>
                    <div
                        className={
                            "flex justify-center flex-1 p-3 hover:bg-secondary hover:text-black hover:font-bold transition duration-300 cursor-pointer relative"
                        }
                        onClick={() => setFeedType("forYou")}
                    >
                        For you
                        {feedType === "forYou" && (
                            <div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
                        )}
                    </div>
                    <div
                        className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative hover:text-black hover:font-bold'
                        onClick={() => setFeedType("following")}
                    >
                        Following
                        {feedType === "following" && (
                            <div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
                        )}
                    </div>
                </div>

                {/*  CREATE POST INPUT */}
                <CreatePost />

                {/* POSTS */}
                <Posts feedType={feedType} />

            </div>
        </>
    );
};
export default Home;