import React, { useEffect, useRef, useState } from 'react'
import appWriteService from '../appwrite/config'
import authService from '../appwrite/auth'
import { Container, PostCard } from '../Components'
import GenAiImage from '../assets/GenAi.png'
import { useNavigate } from 'react-router-dom'
import ErrorAlert from '../Components/Alerts/ErrorAlert'
import DefaultCard from '../Components/DefaultCard/DefaultCard'



// const Home = () => {
//     const [posts,setPosts] = useState([])

//     //fetching posts from appwrite
//     useEffect(() => {
//         appWriteService.getPosts().then((Posts) => {
//             if (Posts) {
//                 setPosts(Posts.documents)
//             }
//         }).catch((err) => console.error("पोस्ट लाने में समस्या:", err));
//     },[])

//     if(posts.length > 0){
//         return (
//             <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (


//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//         )
//     }
//     return (
//         <div className="w-full py-8 mt-4 text-center">
//             <Container>
//                 <div className="flex flex-wrap">
//                     <div className="p-2 w-full">
//                         <h1 className="text-2xl font-bold hover:text-gray-500">
//                             Login to read posts
//                         </h1>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Home




const Home = () => {
  const scrollContainerRef = useRef(null)
  const [loginStatus, setLoginStatus] = useState(false)
  const [showError,setShowError] = useState(false)
  const navigate = useNavigate()

  const posts = [
    {
      title: 'How to master GenAi?',
      description: 'Think AI is complex? Think again. This guide breaks it down — fast, fun, and easy.Level up your skills with GenAI today.',
      content: 'Mastering Generative AI (GenAI) starts with understanding the basics — it’s a type of artificial intelligence that can create content like text, images, code, or music by learning patterns from data. Tools like ChatGPT, DALL·E, and Midjourney are popular examples. To use GenAI effectively, learn the art of prompting — the more specific and clear your input, the better the output. For instance, asking ChatGPT to “Act as a fitness coach and create a 1200-calorie vegetarian meal plan” will get you much more relevant results. Experiment with various tools like Notion AI for productivity, Canva Magic for design, or use OpenAI and Hugging Face APIs to build fun projects like blog generators or AI assistants. The key to mastering GenAI is continuous learning — follow AI newsletters, engage with online communities, and keep experimenting. It’s not about knowing everything; it’s about staying curious and creative.',
      imageLink: GenAiImage

    },
    {
      title: 'Black hole: The Cosmic Phenomenon',
      description: 'Explore the mysteries of black holes, their formation, and their impact on the fabric of spacetime in our universe.',
      content: 'Black holes are one of the most fascinating and mysterious phenomena in the universe. Formed when massive stars collapse under their own gravity, they create a region in space where gravity is so strong that nothing—not even light—can escape. At the center lies the singularity, a point of infinite density, surrounded by the event horizon, the boundary beyond which nothing returns. Black holes come in various sizes, from stellar to supermassive, with the latter found at the centers of galaxies, including our Milky Way. They influence their surroundings by warping spacetime and swallowing nearby matter, often creating bright accretion disks and emitting powerful jets. While invisible directly, scientists study them through their effects on nearby stars and light. With the first real image of a black hole captured in 2019, we’re just beginning to unravel their secrets—reminding us how vast and strange our universe truly is.',
      imageLink: 'https://cdn.eso.org/images/screen/eso1907a.jpg'

    },
    {
      title: 'Interstellar: The Relativity Paradox',
      description: 'Dive into the science behind the movie Interstellar and how it portrays complex theories of relativity and time dilation.',
      content: 'Interstellar: The Relativity Paradox dives into the mind-bending concept of time dilation, where time doesn’t tick the same for everyone. In the movie Interstellar, astronauts traveling near a massive black hole experience time much slower than those on Earth—a concept rooted in Einstein’s theory of relativity. This isn’t just science fiction; it iss science fact. Gravity can warp both space and time, and the closer you are to an intense gravitational source, the slower your clock ticks compared to someone farther away. This paradox challenges our everyday understanding of time and highlights how the universe plays by strange rules at cosmic scales. Interstellar brilliantly brings this scientific mystery to life, making us wonder: what if time is not as fixed as we think?',
      imageLink: 'https://images7.alphacoders.com/546/thumb-1920-546680.jpg'

    },
    {
      title: 'How to make Dosa',
      description: 'Unveil the secret to making restaurant-style crispy dosas at home! With just a few ingredients and the right technique, you can master this South Indian classic. Get ready to flip your way to golden perfection!',
      content: 'Dosa, a golden, crispy, and delicious South Indian delicacy, is a favorite across the globe. Made from a fermented batter of rice and urad dal (black gram), this thin crepe is both light and satisfying. To make the perfect dosa at home, soak rice and dal for 4-6 hours, grind them to a smooth batter, and let it ferment overnight. Once ready, pour a ladleful of batter onto a hot pan, spread it thin, and cook until golden brown. Pair it with coconut chutney or spicy sambar for an authentic experience. With a little patience and the right technique, anyone can master this humble yet iconic dish!',
      imageLink: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'How to make Dal Bati',
      description: 'A royal Rajasthani delight! Dal Bati is a hearty combo of spicy lentils and golden, ghee-soaked wheat balls that melt in your mouth with every bite.',
      content: 'Dal Bati is a traditional Rajasthani delicacy that combines baked wheat balls (bati) with a spicy, protein-rich lentil curry (dal). To make bati, knead a firm dough using whole wheat flour, semolina, ghee, and salt, then shape into round balls and bake or roast them until golden and crisp. For the dal, pressure cook a mix of toor, chana, and moong dal with turmeric and salt, then temper it using ghee, cumin seeds, mustard seeds, onions, tomatoes, ginger-garlic paste, and green chilies. Simmer everything together to blend the flavors. Once the bati are ready, crack them open and drizzle with hot ghee for richness. Serve them hot with the dal and a side of chutney or garlic-tomato dip. This hearty dish is perfect for festive meals or weekend indulgence.',
      imageLink: 'https://media.istockphoto.com/id/521667919/photo/indian-rajasthani-food-dal-bati-laddu-salad.jpg?s=2048x2048&w=is&k=20&c=R24Gz-0Y0PD7jUMX6zqM-RK7Tu2qofn0TFVPwaXLSko='
    },
    {
      title: 'How to Control Air Pollution',
      description: 'Breathe easy and live healthier—learn simple yet powerful ways to fight air pollution. Small changes in daily life can lead to a cleaner, greener planet.',
      content: 'Controlling air pollution starts with mindful actions in our everyday lives. Opting for public transport, carpooling, or cycling helps reduce vehicular emissions significantly. Using clean energy sources like solar or wind power at home and supporting eco-friendly businesses also contribute to cleaner air. Planting trees, avoiding open burning of waste, and minimizing the use of air-polluting appliances can make a big difference. At an industrial level, enforcing strict emission norms and using pollution control equipment are essential. Governments and individuals must work hand in hand, spreading awareness and encouraging sustainable practices. Indoor air pollution should also be tackled by keeping homes well-ventilated and avoiding chemical-based products. Together, we can take small steps that lead to a huge impact on air quality and public health.',
      imageLink: 'https://i.natgeofe.com/n/84765010-db5a-4c1e-b783-7b2b440a32e4/177.jpg?w=2880&h=2162'
    },
  ]



  useEffect(() => {
    const fetchUser = async () => {
      const currUser = await authService.getCurrUser();
      setLoginStatus(!!currUser);
    };
    fetchUser();

  }, [])


  function handleClick(post) {
   
    if(loginStatus){
      setShowError(false)
      navigate('/defaultCard',{state:{post}})
    }
    else{
       setShowError(true)
    }
    

  }


  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -500, // Adjust this value based on your card width + gap
        behavior: 'smooth'
      });
    }
  }
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 500, // Adjust this value based on your card width + gap
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full md:p-8  bg-black">
      {showError && <ErrorAlert message="Login to read post!" />}

      {/* Navigation buttons */}

      <div className="hidden  lg:flex justify-between absolute top-1/2 left-0 right-0 z-10 px-4">
        <button onClick={scrollLeft} className="cursor-pointer bg-violet-950 rounded-full w-10 h-10 flex items-center justify-center shadow-lg  hover:bg-gray-100  transition-colors">
          <span className="text-3xl  text-sky-500 ">&lt;</span>
        </button>
        <button onClick={scrollRight} className="cursor-pointer bg-violet-950 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
          <span className="text-3xl text-blue-500">&gt;</span>
        </button>
      </div>

      {/* Cards container */}
      <div ref={scrollContainerRef} className="flex sm:flex-row flex-col overflow-x-auto scroll-smooth snap-x snap-mandatory gap-8 py-8 sm:px-12  sm:items-stretch items-center hide-scrollbar ">
        {
          posts.map((post) => (
            <div key={post.title} className=" flex-shrink-0 md:w-96 w-[320px] bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 snap-center ">
              <a href="#">
                <img className="rounded-t-lg w-full h-64 object-cover" src={post.imageLink} alt={post.title} />
              </a>
              <div className="p-6">
                <a href="#">
                  <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                </a>
                <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">{post.description}</p>
                <button onClick={() => handleClick(post)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        }
      </div>

      
      
    </div>
  )
}

export default Home